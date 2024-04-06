//authRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken"); 

// User Routes 
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/user", verifyToken, authController.getUser); 

// Business Routes
router.post("/loginb", authController.loginBusiness);
router.post("/registerb", authController.registerBusiness);
router.get("/business", verifyToken, authController.getBusiness); 

// Update user route
router.put("/user/:id", verifyToken, authController.updateUser);

router.put("/business/:id", verifyToken, authController.updateBusiness);


// Additional routes
router.get("/auth/register", (req, res) => {
  res.send("Hello, this is the register route!");
});

router.get("/auth/login", (req, res) => {
  // const { email, password } = req.body;
  res.send("Hello, this is the login route!");
});

router.get("/auth/registerb", (req, res) => {
  res.send("Hello, this is the Business register route!");
});

router.get("/auth/loginb", (req, res) => {
  res.send("Hello, this is the Business login route!");
});

module.exports = router;
