const jwt = require("jsonwebtoken");
const userSecretKey = process.env.USER_JWT_SECRET;

module.exports = (req, res, next) => {
  const userToken = req.header("Authorization")?.replace("Bearer", "");

  if (!userToken) return res.status(401).json({ message: "Access Denied" });

  try {
    const userVerified = jwt.verify(userToken, userSecretKey);

    req.user = userVerified;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token not a Verified Token" });
  }
};