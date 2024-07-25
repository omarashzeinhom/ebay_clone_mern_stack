//authRoutes.js

const express = require("express");
const router = express.Router();
const userAuthController = require("../controllers/userAuthController");
const { verifyUserToken } = require("../middleware/verifyUserToken");

// User Routes
router.post("/login", userAuthController.login);
router.post("/register", userAuthController.register);

// GET USER WITH VERIFICATION OF TOKEN  ONLY
router.get("/user", verifyUserToken, userAuthController.getUser);

// UPDATE USER WITH ID AND VERIFICATION OF TOKEN
router.put("/user/:id", verifyUserToken, userAuthController.updateUser);

// GET USER WITH ID AND VERIFICATION OF TOKEN
router.get("/user/:id", verifyUserToken, userAuthController.updateUser);

// Additional routes
//router.get("/register", (req, res) => {});
//router.get("/login", (req, res) => {});

//  Facebook login route
router.post("/auth/facebook", userAuthController.facebookLogin);

module.exports = router;
