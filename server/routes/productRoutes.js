// productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

// Route to get all products
router.get("/", productController.getProducts);

// Route to get a product by ID
router.get("/:productId", productController.getProductById);

module.exports = router;
