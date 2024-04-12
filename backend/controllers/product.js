const Product = require("../models/product");
const ProductFilter = require("../utils/productFilter");
const cloudinary = require("cloudinary").v2;

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

const adminProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    products,
  });
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

const createProducts = async (req, res, next) => {
  try {
    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    let allImage = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
        overwrite: true,
      });
      allImage.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = allImage;

    const product = await Product.create(req.body);
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the product.",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_id, {
        folder: "products",
      });
    }

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

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images !== undefined) {
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.uploader.destroy(product.images[i].public_id, {
          folder: "products",
        });
      }
    }

    let allImage = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
        overwrite: true,
      });
      allImage.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = allImage;

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
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

const createReview = async (req, res, next) => {
  const { productId, comment, rating } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    comment,
    rating: Number(rating),
  };
  const product = await Product.findById(productId);

  product.reviews.push(review);

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.rating = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    message: "Review created successfully.",
    review,
    product,
  });
};

module.exports = {
  allProducts,
  detailProducts,
  createProducts,
  deleteProduct,
  updateProduct,
  createReview,
  adminProducts,
};
