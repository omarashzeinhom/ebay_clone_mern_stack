const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({path: "./config.env"});
const port = process.env.PORT || 5007;
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');

app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());


// Get driver connection 

 require("./db/connection");

 // 
 app.use('/auth', authRoutes);


app.listen(port, ()=>{
    // Perform a DB connection when server starts
    
    console.log(`Server is running on port: http://localhost:${port} 🚀`);

})