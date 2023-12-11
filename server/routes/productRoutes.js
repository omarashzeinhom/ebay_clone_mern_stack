const express = require('express');
const ProductController = require('../controllers/productController');

const router = express.Router();

router.get('/products', ProductController.getProducts);

module.exports = router;
