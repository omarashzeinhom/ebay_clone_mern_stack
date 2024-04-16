require("dotenv").config({ path: "./config.env" });
const rateLimit = require("express-rate-limit");
// Apply the rate limiting middleware to all requests.

const express = require("express");
const compression = require("compression"); 
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { MongoClient } = require("mongodb");
// Import route modules
const userAuthRoutes = require("./routes/userAuthRoutes");
const businessAuthRoutes = require("./routes/businessAuthRoutes");

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const corsMiddleware = require("./middleware/corsMiddleware");
const app = express();
const port = process.env.PORT || 5007;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 5000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: true, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// Enable gzip compression middleware
app.use(compression());


// Middleware
app.use(corsMiddleware);
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(helmet());
app.use(limiter);

//  root URL
app.get("/", (req, res) => {
  //res.send("Hello, this is the root route!");
});

// Use route modules
app.use("/user", userAuthRoutes);
app.use("/business", businessAuthRoutes);
app.use("/auth", userAuthRoutes,businessAuthRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);



// MongoDB


const uri = process.env.ATLAS_URI;
const mongoDBClient = new MongoClient(uri);

//Mongoose
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




async function run() {
    try {
        await mongoDBClient.connect();
        
    } finally {
        await mongoDBClient.close();
    }

}

run().catch(console.dir);