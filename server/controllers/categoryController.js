// categoryController
const Category = require("../models/categoryModel");

class CategoryController {
  async getCategories(req, res) {
    try {
      const categories = await Category.find();
      res.json(categories);
      // Debug
      //console.log(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new CategoryController();
