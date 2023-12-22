const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: Number,
  quantity: Number,
  name: String,
  img: String,
  price: Number,
  category: String,
  description:String,
  parent: String,
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
