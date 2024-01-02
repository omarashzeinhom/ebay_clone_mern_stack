const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const uploadEndPoint = "";

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
  const cloudinaryResponse = await fetch(uploadEndPoint, {
    method: "POST",
    body: imageData,
  });
  
  const cloudinaryData = await cloudinaryResponse.json();
  const cloudinaryImageUrl = cloudinaryData.secure_url;
  try {
    const {
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
      id,
      quantity,
      name,
      img: cloudinaryImageUrl, // Use the Cloudinary URL here
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
async getProductsBySearch(req, res) {
  const searchQuery = req.query.query;

  try {
    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const products = await Product.find({
      $text: { $search: searchQuery },
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for the search query" });
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
}

module.exports = new ProductController();
