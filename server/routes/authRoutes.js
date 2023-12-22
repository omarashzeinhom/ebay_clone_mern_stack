// imports
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken"); 

// POSTED Routes
router.post("/login", authController.login);
router.post("/loginb", authController.loginBusiness);
router.post("/register", authController.register);
router.post("/registerb", authController.registerBusiness);
router.get("/business", verifyToken, authController.getBusiness); 
router.get("/user", verifyToken, authController.getUser); 

module.exports = router;