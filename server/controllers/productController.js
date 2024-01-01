const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await Product.find();
      if (!products || products.length === 0) {
        return res.status(404).json({ message: "Products not found" });
      }
      // console.log(products);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async getProductById(req, res) {
    const productId = req.params.productId;

    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

async createProduct (req, res) {
  try {
    const {
      _id,
      id,
      quantity,
      name,
      img,
      price,
      category,
      parent,
      businessId,
    } = req.body;

    const newProduct = new Product({
      _id,
      id,
      quantity,
      name,
      img,
      price,
      category,
      parent,
      businessId,
    });

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
}

module.exports = new ProductController();
