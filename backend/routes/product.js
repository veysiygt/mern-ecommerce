const express = require('express');
const {
  allProducts,
  detailProducts,
  createProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/product");

const router = express.Router();

router.get('/products', allProducts);
router.get('/products/:id', detailProducts);
router.post('/product/new', createProducts);
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);

module.exports = router;
