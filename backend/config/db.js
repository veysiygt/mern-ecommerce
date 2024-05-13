const mongoose = require("mongoose");
const Product = require("../models/product");
const faker = require("@faker-js/faker").faker;

const db = () => {
  mongoose
    .connect("mongodb://localhost:27017/ecommerce", {})
    .then(() => {
      console.log("Mongodb connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

const createFakeData = async () => {
  try {
    await Product.deleteMany();

    const products = Array.from({ length: 10 }, () => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      stock: faker.number.int({ min: 1, max: 20 }),
      category: faker.commerce.department(),
      rating: faker.number.float({ multipleOf: 0.1, min: 0, max: 5 }),
      images: [
        {
          public_id: faker.string.uuid(),
          url: faker.image.url(),
        },
      ],
    }));

    await Product.insertMany(products);
    console.log("Fake products created successfully!");
  } catch (err) {
    console.error("Error creating fake products:", err);
  } finally {
    mongoose.disconnect();
  }
};

module.exports = { db, createFakeData };
