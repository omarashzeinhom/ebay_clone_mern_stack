require("dotenv").config({ path: "./config.env" });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");

// Import route modules
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
const port = process.env.PORT || 5007;

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend domain in production
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// Middleware
app.use(cors(corsOptions));  // Apply CORS middleware with specific options
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies
app.use(bodyParser.json());

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Hello, this is the root route!");
});

// Use route modules
app.use("/user", authRoutes);
app.use("/business", authRoutes);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);


// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI, {});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully 🚀");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port} 🚀`);
});
