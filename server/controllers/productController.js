const Product = require("../models/productModel");


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

  async createProduct(req, res) {
    try {
      // Assuming you have already processed and stored the image file in `req.file`
      const imageData = req.file;

      if (!imageData) {
        return res.status(400).json({ error: 'Image file is required' });
      }

      // Upload the image to Cloudinary
      const cloudinaryResponse = await cloudinary.v2.uploader.signed_upload(imageData.path, "slyqk3p0", {
        resource_type: "image",
        folder: "/ebay-clone-mern-images/businesses/products",
        public_id: "/ebay-clone-mern-images/businesses/products/product_",
        overwrite: true,
        notification_url: "http://localhost:3000",
        headers: { 'Access-Control-Allow-Origin': 'no-cors' }, // Add this line
      });

      // Get the secure URL of the uploaded image from Cloudinary
      const cloudinaryImageUrl = cloudinaryResponse.secure_url;

      const {
        id,
        quantity,
        img,
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
        img: cloudinaryImageUrl,
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
  }










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
