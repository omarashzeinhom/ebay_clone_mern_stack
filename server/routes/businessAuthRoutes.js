const express = require("express");
const router = express.Router();
const businessAuthController = require("../controllers/businessAuthController");
const { verifyBusinessToken } = require("../middleware/verifyBusinessToken");

// Business Routes
router.post("/loginb", businessAuthController.loginBusiness);
router.post("/registerb", businessAuthController.registerBusiness);

// GET BUSINESS WITH VERIFICATION OF TOKEN ONLY
router.get("/business", verifyBusinessToken, businessAuthController.getBusiness);

// GET BUSINESS WITH ID AND VERIFICATION OF TOKEN 
router.get("/business/:id", verifyBusinessToken, businessAuthController.getBusiness);

// UPDATE BUSINESS WITH ID AND VERIFICATION OF TOKEN 
router.put("/business/:id", verifyBusinessToken, businessAuthController.updateBusiness);

module.exports = router;
