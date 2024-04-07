require("dotenv").config({ path: "./config.env" });
const rateLimit = require("express-rate-limit");



// Apply the rate limiting middleware to all requests.

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

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})
// Middleware
app.use(corsMiddleware);
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(helmet());
app.use(limiter);

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
