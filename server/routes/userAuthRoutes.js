//authRoutes.js

const express = require("express");
const router = express.Router();
const userAuthController = require("../controllers/userAuthController");
const verifyToken = require("../middleware/verifyToken");

// User Routes
router.post("/login", userAuthController.login);
router.post("/register", userAuthController.register);
router.get("/user", verifyToken, userAuthController.getUser);


// Update user route
router.put("/user/:id", verifyToken, userAuthController.updateUser);
router.get("/user/:id", verifyToken, userAuthController.updateUser);

// Additional routes
router.get("/register", (req, res) => {
  //res.send("Hello, this is the register route!");
});

router.get("/login", (req, res) => {
  // const { email, password } = req.body;
  //res.send("Hello, this is the login route!");
});




module.exports = router;
