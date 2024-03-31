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
const corsMiddleware = require("./middleware/corsMiddleware");

const app = express();
const port = process.env.PORT || 5007;


// Middleware
app.use(corsMiddleware);
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(helmet());

//  root URL
app.get("/", (req, res) => {
  res.send("Hello, this is the root route!");
});

// Use route modules
app.use("/user", authRoutes);
app.use("/business", authRoutes);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);



// MongoDB
mongoose.connect(process.env.ATLAS_URI, {});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully 🚀");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port} 🚀`);
});
