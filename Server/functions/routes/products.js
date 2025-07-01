const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
const stripe = require('stripe')(process.env.STRIPE_KEY);

db.settings({ ignoreUndefinedProperties: true });

router.post('/create', async (req, res) => {
  try {
    const id = Date.now();
    const data = {
      productId: id,
      product_name: req.body.product_name,
      product_category: req.body.product_category,
      product_price: req.body.product_price,
      product_image: req.body.product_image
    };
    const response = await db.collection('products').doc(`${id}`).set(data);
    return res.status(200).json({success: true, data: response});
  } catch (err) {
    return res.send({ success: false, msg: `Error in creating the product: ${err}` });
  }

});

//get all products
 router.get('/all', async (req, res) => {
  try {
    const querySnapshot = await db.collection('products').get();
    const products = [];

    querySnapshot.forEach((doc) => {
      products.push(doc.data());
    });

    return res.status(200).json({ success: true, data: products });
  } catch (err) {
    return res.status(500).json({ success: false, msg: `Error getting products: ${err}` });
  }
});

//delete a product 
router.delete('/delete/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    await db.collection('products').doc(`${productId}`).delete().then(result => {
      return res.status(200).json({ success: true, data: result });
    });
  } catch (err) {
    return res.send({ success: false, msg: `Error in deleting the product: ${err}` });
  }
});

router.post('/addToCart/:userId', async (req, res) => {
  const userId = req.params.userId;
  const productId = req.body.productId;
  try {
    const doc = await db
    .collection('cartItems')
    .doc(`/${userId}/`)
    .collection('items')
    .doc(`/${productId}/`)
    .get();

    if (doc.exists) {
      const quantity = doc.data().quantity + 1;
      const updatedItem = await db
        .collection('cartItems')
        .doc(`/${userId}/`)
        .collection('items')
        .doc(`/${productId}/`)
        .update({ quantity });
      return res.status(200).send({ success: true, data: updatedItem });  
    } else {
      const data = {
        productId: productId,
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        product_price: req.body.product_price,
        product_image: req.body.product_image,
        quantity: 1,
      };
      const addItem = await db
        .collection('cartItems')
        .doc(`/${userId}/`)
        .collection('items')
        .doc(`/${productId}/`)
        .set(data);
      return res.status(200).send({ success: true, data: addItem });  
    }
   
  } catch (err) {
    return res.send({ success: false, msg: `Error in adding to cart: ${err}` });
  }
});

// update cart to increase or decrease the quantity
router.put('/updateCart/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  const productId = req.body.productId;
  const type = req.body.type;

  try {
    const doc = await db
      .collection('cartItems')
      .doc(`/${userId}/`)
      .collection('items')
      .doc(`/${productId}/`)
      .get();

    if (doc.exists) {
      if (type === 'increase') {
        const quantity = doc.data().quantity + 1;
        const updatedItem = await db
          .collection('cartItems')
          .doc(`/${userId}/`)
          .collection('items')
          .doc(`/${productId}/`)
          .update({ quantity });
        return res.status(200).send({ success: true, data: updatedItem });
      } else {
        if (doc.data().quantity === 1) {
          const deleteItem = await db
            .collection('cartItems')
            .doc(`/${userId}/`)
            .collection('items')
            .doc(`/${productId}/`)
            .delete();
          return res.status(200).send({ success: true, data: deleteItem });
        } else {
          const quantity = doc.data().quantity - 1;
          const updatedItem = await db
            .collection('cartItems')
            .doc(`/${userId}/`)
            .collection('items')
            .doc(`/${productId}/`)
            .update({ quantity });
          return res.status(200).send({ success: true, data: updatedItem });
        }
      }
    }
  } catch (err) {
    return res.send({ success: false, msg: `Error in updating the cart: ${err}` });
  }
})

// get all the cart items for that user

router.get('/getCartItems/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  try {
    const query = db
      .collection('cartItems')
      .doc(`/${userId}/`)
      .collection('items');

    const querysnap = await query.get();
    const response = querysnap.docs.map(doc => doc.data());

    return res.status(200).send({ success: true, data: response });
  } catch (err) {
    return res.send({ success: false, msg: `Error in getting cart items: ${err}` });
  }
});

router.post('/create-checkout-session', async (req, res) => {
  const sesion = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });
  res.send({ url: sesion.url });
});


module.exports = router;