//authRoutes.js

const express = require("express");
const router = express.Router();
const businessAuthController = require("../controllers/businessAuthController");
const verifyToken = require("../middleware/verifyToken");

// Business Routes
router.post("/loginb", businessAuthController.loginBusiness);
router.post("/registerb", businessAuthController.registerBusiness);
router.get("/business", verifyToken, businessAuthController.getBusiness);


router.get("/business/:id", verifyToken, businessAuthController.updateBusiness);
router.put("/business/:id", verifyToken, businessAuthController.updateBusiness);


router.get("/auth/registerb", (req, res) => {
  res.send("Hello, this is the Business register route!");
});

router.get("/auth/loginb", (req, res) => {
  res.send("Hello, this is the Business login route!");
});

module.exports = router;
