const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;

    req.business = verified;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
