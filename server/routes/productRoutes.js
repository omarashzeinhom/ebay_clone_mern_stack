const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const rateLimit = require("express-rate-limit");

// Define rate-limiting options
const searchRateLimitOptions = {
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Max 10 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
};

// Route to get all products
router.get("/", productController.getProducts);

// Route to get a product by ID
router.get("/:productId", productController.getProductById);


// Route to get delete by ID
router.delete("/delete/:productId", productController.deleteProduct);

// Apply rate-limiting middleware to the route for searching products
// Route to get products by search
// Route definition
router.get(
  "/search-results/:query",
  rateLimit(searchRateLimitOptions),
  productController.getProductsByName
);

router.post(
  "/search-results/:query",
  rateLimit(searchRateLimitOptions),
  productController.getProductsByName
);

// Needs Adjustments
// Route to create a product
//router.post("/product", upload.single("img"), productController.createProduct);

// POST Create Product Works Without Image
router.post(
  "/create",
  productController.createProduct
);

// GET products by business ID
router.get(
  "/by-business/:businessId",
  productController.getProductsByBusinessId
);

// POST products by business ID
router.post(
  "/by-business/:businessId",
  productController.getProductsByBusinessId
);

module.exports = router;
