const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken"); // Add this line

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user", verifyToken, authController.getUser); // Add this line

module.exports = router;
