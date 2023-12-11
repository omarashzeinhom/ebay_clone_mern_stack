const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await Product.find();

      if (!products || products.length === 0) {
        return res.status(404).json({ message: "Products not found" });
      }

      // Fetch categories for all products
      const categoryPromises = products.map(async (product) => {
        const category = await Category.findOne({ name: product.parent });
        return { ...product.toObject(), category };
      });

      const matchedProducts = await Promise.all(categoryPromises);

      res.json(matchedProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new ProductController();
