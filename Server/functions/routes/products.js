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
    return res.status(500).send({success: false, msg: `Error in creating the product: ${err}`});
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
    return res.send({ success: false, msg: `Error in getting the products: ${err}` });
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
    return res.send({ success: false, msg:` Error in deleting the product: ${err}` });
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
    return res.send({ success: false, msg: `Error in adding to the cart: ${err}` });
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
    return res.send({ success: false, msg: `Error in getting the cart items: ${err}` });
  }
});

router.post('/create-checkout-session', async (req, res) => {

  
  try {
    const { cartItems } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'No items in cart' });
    }

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product_name,
          images: [item.product_image], // opcional
        },
        unit_amount: Math.round(item.product_price * 100), // en centavos
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  shipping_address_collection: {
    allowed_countries: ['US'],
  },
  shipping_options: [
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: 0,
          currency: 'usd',
        },
        display_name: 'Free shipping',
        delivery_estimate: {
          minimum: { unit: 'business_day', value: 5 },
          maximum: { unit: 'business_day', value: 7 },
        },
      },
    },
  ],
  phone_number_collection: {
    enabled: true,
  },
  line_items, // asegúrate que tus items tienen price_data o un id de precio
  mode: 'payment',
  success_url: `${process.env.CLIENT_URL}/checkout-success`,
  cancel_url: `${process.env.CLIENT_URL}/`,
});

    res.status(200).json({ url: session.url });

  } catch (err) {
    console.error('Stripe session error:', err);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
});

module.exports = router;