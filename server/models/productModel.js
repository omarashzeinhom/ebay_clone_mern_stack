const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: Numberr,
  quantity: Number,
  name: String,
  img: String,
  price: Number,
  description:String,
  parent: String,
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
