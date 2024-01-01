// imports
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken"); 

// POSTED Routes
// Update user route
router.post("/user/:id", verifyToken, authController.updateUser);
// User Routes 
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/user", verifyToken, authController.getUser); 

// Business Routes
router.post("/loginb", authController.loginBusiness);
router.post("/registerb", authController.registerBusiness);
router.get("/business", verifyToken, authController.getBusiness); 

module.exports = router;