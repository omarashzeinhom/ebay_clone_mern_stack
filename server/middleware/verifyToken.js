module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, secretKey);

    // If it's a regular user
    if (verified.userId) {
      req.user = verified;
    }
    // If it's a business
    else if (verified.businessId) {
      req.business = verified;
    }

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
