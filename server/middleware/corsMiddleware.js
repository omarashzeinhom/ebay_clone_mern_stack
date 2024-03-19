// corsMiddleware.js
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:3000", "https://ebay-clone-mern-stack.vercel.app", "https://server-ebay-clone.onrender.com", "http://localhost:5000/"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

module.exports = cors(corsOptions);
