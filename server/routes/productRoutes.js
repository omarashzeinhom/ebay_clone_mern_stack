const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // Initialize multer

// Route to get all products
router.get("/", productController.getProducts);

// Route to get a product by ID
router.get("/:productId", productController.getProductById);

// Route to get products by search
router.get("/search/:name", productController.getProductsBySearch);

// Route to create a product
router.post('/product', upload.single('img'), productController.createProduct);

module.exports = router;
