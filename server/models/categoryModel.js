// categoryModel.js
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: String,
  img: String,
  parent: String,
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;