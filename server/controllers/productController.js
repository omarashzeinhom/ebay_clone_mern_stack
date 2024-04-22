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
      let image = req.body.img; // Assuming the image URL or file data is in req.body.img

      // Check if image is provided (optional)
      if (image) {
        try {
          const result = await cloudinary.uploader.upload(image);
          image = result.secure_url; // Update image variable with the Cloudinary URL
        } catch (uploadError) {
          console.error("Error uploading image to Cloudinary:", uploadError);
          return res.status(500).json({ message: "Error uploading image" });
        }
      }

      const {
        id,
        description,
        quantity,
        name,
        price,
        category,
        parent,
        businessId,
      } = req.body;

      const newProduct = new Product({
        id,
        quantity,
        name,
        description,
        img: image, // Use the updated image URL if available
        price,
        category,
        parent,
        businessId,
      });

      const savedProduct = await newProduct.save();
      res.json(savedProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Internal Server Error" }); // Consistent message
    }
  }

  async updateProduct(req, res) {}

  async deleteProduct(req, res) {
    // Delete Cloudinary Image

    // Delete MongoDB object
    const productId = req.params.productId;

    try {
      const result = await Product.deleteOne({
        id: {productId},
      
      });
      res.status(200);
      res.json(result?.data);
    } catch (error) {
      console.error("error in deleteProduct" + error);
    }

    //
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
  async getProductsByName(req, res) {
    const query = req.params.query;
    console.log("Search query: " + query);
    try {
      const regexQuery = new RegExp(query, "i");
      console.log("Regex query: ", regexQuery);
      const products = await Product.find({ name: regexQuery });
      console.log("Products: ", products);
      if (!products || products.length === 0) {
        return res
          .status(404)
          .json({ message: "No products found for the search query" });
      }
      res.json(products);
    } catch (error) {
      console.error("Error fetching products by name:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getProductsByBusinessId(req, res) {
    try {
      const products = await Product.find({
        businessId: req.params.businessId,
      });
      if (!products || products.length === 0) {
        return res
          .status(404)
          .json({ message: "Products not found for the given business ID" });
      }
      res.json(products);
    } catch (error) {
      console.error("Error fetching products by business ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new ProductController();
