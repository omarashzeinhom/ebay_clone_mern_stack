const jwt = require("jsonwebtoken");
const businessSecretKey = process.env.BUSINESS_JWT_SECRET;

// Middleware to verify business JWT token
// Middleware to verify business JWT token
exports.verifyBusinessToken = (req, res, next) => {
  const businessToken = req.header("Authorization")?.replace("Bearer", "").trim(); // Trim the token

  if (!businessToken) return res.status(401).json({ message: "Access Denied" });

  try {
    const businessVerified = jwt.verify(businessToken, businessSecretKey);

    req.business = businessVerified;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Business Token" });
  }
};
