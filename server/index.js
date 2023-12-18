require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5007;

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Hello, this is the root route!");
});

app.get("/auth/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  //res.send(email,password);
  res.send("Hello, this is the register route!");
});
app.get("/auth/login", (req, res) => {
  const { email, password } = req.body;
  //res.send(email,password);
  res.send("Hello, this is the login route!");
});
app.get("/auth/registerb", (req, res) => {
  const {
    businessName,
    businessEmail,
    businessPassword,
    businessLocation,
    businessActive,
  } = req.body;
  //res.send(email,password);
  res.send("Hello, this is the register business route!");
});
app.get("/auth/loginb", (req, res) => {
  //const { email, password } = req.body;
  //res.send(email,password);
  res.send("Hello, this is the Business login route!");
});

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/business", authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI, {});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port} 🚀`);
});
