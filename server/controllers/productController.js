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
  async getProductById(req, res) {
    const productId = req.params.productId;
    try {
      if(productId){
        //const product = await Product.findById(productId);      
        res.json(productId);

      }
      if (!productId) {
        return res.status(404).json({ message: "Product not found" });
      }
      return productId;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async getProductByName(req, res) {
    const productName = req.params.productName;
    console.log("productName" + productName);
    try {
      const products = await Product.find({name:productName});
      console.log("Products" + products);
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
  async getProductsBySearch(req, res) {
    const searchQuery = req.query;
    console.log("searchQuery in getProducts By Search" + searchQuery);

    try {
      if (!searchQuery) {
        return res.status(400).json({ message: "Search query is required" });
      }

      const products = await Product.find({
        name: searchQuery
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

  async getProductsByBusinessId (req, res) {
    try {
      const products = await Product.find({ businessId: req.params.businessId });
      if (!products || products.length === 0) {
        return res.status(404).json({ message: "Products not found for the given business ID" });
      }
      res.json(products);
    } catch (error) {
      console.error("Error fetching products by business ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }


}

module.exports = new ProductController();
