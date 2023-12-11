const { Request, Response } = require("express");
const ProductModel = require("./ProductModel");
const CategoryModel = require("./CategoryModel");
const mongoose = require("mongoose");

class ProductController {
  async getProducts(req, res) {
    try {
      const [product1, product2] = await Promise.all([
        ProductModel.findOne({
          _id: mongoose.Types.ObjectId("65772173cd3f707257e94728"),
        }),
        ProductModel.findOne({
          _id: mongoose.Types.ObjectId("6577206ecd3f707257e946c8"),
        }),
      ]);

      if (!product1 || !product2) {
        return res.status(404).json({ message: "Products not found" });
      }

      const category1 = await CategoryModel.findOne({ name: product1.parent });
      const category2 = await CategoryModel.findOne({ name: product2.parent });

      if (!category1 || !category2) {
        return res.status(404).json({ message: "Categories not found" });
      }

      const matchedProducts = [product1, product2].map((product) => ({
        ...product.toObject(),
        category: category1.name === product.parent ? category1 : category2,
      }));

      res.json(matchedProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new ProductController();
