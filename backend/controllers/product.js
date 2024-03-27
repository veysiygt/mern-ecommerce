const Product = require("../models/product");
const ProductFilter = require("../utils/productFilter");

const allProducts = async (req, res) => {
  try {
    const resultPerPage = 10;

    const productFilter = new ProductFilter(Product.find(), req.query)
      .search()
      .filters()
      .pagination(resultPerPage);
    const products = await productFilter.query;
    if (products.length > 0) {
      res.status(200).json({ products });
    } else {
      res.status(404).json({ message: "No products found." });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching products.",
      error: error.message,
    });
  }
};

const detailProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json({ product });
    } else {
      res.status(404).json({ message: "Product not found." });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the product detail.",
      error: error.message,
    });
  }
};

const createProducts = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the product.",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.status(200).json({ message: "Product deleted successfully." });
    } else {
      res.status(404).json({ message: "Product not found." });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the product.",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (product) {
      res.status(200).json({ product });
    } else {
      res.status(404).json({ message: "Product not found." });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the product.",
      error: error.message,
    });
  }
};

module.exports = {
  allProducts,
  detailProducts,
  createProducts,
  deleteProduct,
  updateProduct,
};
