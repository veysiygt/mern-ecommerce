const express = require("express");
const {
  allProducts,
  detailProducts,
  createProducts,
  deleteProduct,
  updateProduct,
  createReview,
  adminProducts,
} = require("../controllers/product");
const { authenticationMid, roleChecked } = require("../middleware/auth");

const router = express.Router();

router.get("/products", allProducts);
router.get(
  "/admin/products",
  authenticationMid,
  roleChecked("admin"),
  adminProducts
);
router.get("/products/:id", detailProducts);
router.post(
  "/product/new",
  authenticationMid,
  roleChecked("admin"),
  createProducts
);
router.post("/product/mewReview", authenticationMid, createReview);
router.delete(
  "/products/:id",
  authenticationMid,
  roleChecked("admin"),
  deleteProduct
);
router.put(
  "/products/:id",
  authenticationMid,
  roleChecked("admin"),
  updateProduct
);

module.exports = router;
