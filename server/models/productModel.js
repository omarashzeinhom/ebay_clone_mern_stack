//productModel.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

  id: { type: Number, required: false },
  quantity: { type: Number, required: false },
  name: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    required: false,
  },
  price: { type: Number, required: false, },
  category: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  parent: {
    type: String,
    required: false,
  },
  files: {
    type: Array
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
