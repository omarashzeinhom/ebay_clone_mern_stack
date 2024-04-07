const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const multer = require("multer");
const upload = require("../config/multer");
const rateLimit = require("express-rate-limit");
const Product = require("../models/productModel");
const { json } = require("body-parser");

// Define rate-limiting options
const searchRateLimitOptions = {
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Max 10 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
};

router.post("/search", productController.getProductsBySearch);
router.get("/search", (req, res) => {
  res.send("Hello, this is the Search route!");
});

// Route to get products by search
// Apply rate-limiting middleware to the route for searching products
router.get(
  "/search/:name",
  (req, res) => {
    res.send(`Search results for query: ${req}`);
  },
  rateLimit(searchRateLimitOptions),
  productController.getProductsBySearch
);

router.post(
  "/search/:name",
  rateLimit(searchRateLimitOptions),
  async (req, res) => {
    try {
      const searchResults = await productController.productController.getProductsBySearch(req.params.name);
      res.send(`Search results for query: ${req.params.name}\nResults: ${searchResults}`);
    } catch (error) {
      console.error("Error retrieving search results:", error);
      res.status(500).send("Error retrieving search results");
    }
  }
);

// Route to get all products
router.get("/", productController.getProducts);

// Route to get a product by ID
router.get("/:productId", productController.getProductById);

// Route to get products by search
router.get("/search-results", (req, res) => {
  res.send("Hello, this is the Search Results route!");
});

// Apply rate-limiting middleware to the route for searching products
router.get(
  "/search-results?query=:name",
  (req, res) => {
    res.send(`Search results for query: ${req}`);
  },
  rateLimit(searchRateLimitOptions),
  productController.getProductByName
);

router.post(
  "/search-results?query=:name",
  (req, res) => {
    res.send(`Search results for query: ${req}`);
  },
  rateLimit(searchRateLimitOptions),
  productController.getProductByName
);


// Route to create a product
router.post("/product", upload.single("img"), productController.createProduct);

router.post(
  "/create",
  upload.array("file", 10),
  Product,
  productController.createProduct
);

module.exports = router;
