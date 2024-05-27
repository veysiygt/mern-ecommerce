const mongoose = require("mongoose");

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

module.exports = { db };
