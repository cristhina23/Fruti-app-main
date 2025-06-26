const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();

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
})

module.exports = router;