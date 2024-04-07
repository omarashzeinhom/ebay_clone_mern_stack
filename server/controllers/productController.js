// productController.js
const Product = require("../models/productModel");
const cloudinary = require("cloudinary");

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await Product.find();
      if (!products || products.length === 0) {
        return res.status(404).json({ message: "Products not found" });
      }
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

  async createProduct(req, res) {
    try {
      const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
      let image = ""; // Define avatarUrl variable to store Cloudinary URL
      if (image) {
        const result = await cloudinary.uploader.upload(image);
        avatarUrl = result.secure_url;
      }

      const { id, quantity, img, name, price, category, parent, businessId } =
        req.body;

      const newProduct = new Product({
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
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getProductByName(req, res) {
    const productName = req.params.productName;

    try {
      const products = await Product.findOne({ name: productName });

      if (!products || products.length === 0) {
        return res
          .status(404)
          .json({ message: "No products found for the search query" });
      }

      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getProductsBySearch(req, res) {
    const searchQuery = req.query.query;

    try {
      if (!searchQuery) {
        return res.status(400).json({ message: "Search query is required" });
      }

      const products = await Product.find({
        // needed to search using name not $search
        name: { $regex: new RegExp(searchQuery, "i") },
      });

      if (!products || products.length === 0) {
        return res
          .status(404)
          .json({ message: "No products found for the search query" });
      }

      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new ProductController();
