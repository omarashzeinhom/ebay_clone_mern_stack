const jwt = require("jsonwebtoken");
const businessSecretKey = process.env.BUSINESS_JWT_SECRET;

module.exports = (req, res, next) => {
  const businessToken = req.header("Authorization")?.replace("Bearer ", "");

  if (!businessToken) return res.status(401).json({ message: "Access Denied" });

  try {
    const businessVerified = jwt.verify(businessToken, businessSecretKey);

    req.business = businessVerified;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token not a Verified Token" });
  }
};