const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const multer = require("multer");
const upload = require("../config/multer");
const rateLimit = require("express-rate-limit");
const Product = require("../models/productModel");

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
  productController.getProductByName
);

router.post(
  "/search/:name",
  rateLimit(searchRateLimitOptions),
  productController.getProductByName
);

// Route to get all products
router.get("/", productController.getProducts);

// Route to get a product by ID
router.get("/:productId", productController.getProductById);

// Route to get a product by Name
router.get("/:name", productController.getProductByName);

// Route to handle search results
router.get("/search-results/:name", (req, res) => {
  const query = req.query.query; // Retrieve the value of the "query" parameter
  // Process the query parameter as needed (e.g., perform a search)
  // For example, you can pass the query parameter to a search function and return the results
  res.send(`Search results for query: ${query}`);
});

router.post("/search-results/:name", (req, res) => {
  const query = req.query.query;
  res.send(`Search results for query: ${query}`);
});

// Route to create a product
router.post("/product", upload.single("img"), productController.createProduct);

router.post(
  "/create",
  upload.array("file", 10),
  Product,
  productController.createProduct
);

module.exports = router;
