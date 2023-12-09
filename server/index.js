const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({path: "./config.env"});
const port = process.env.PORT || 5007;

app.use(cors());
app.use(express.json());

app.use(require("./routes/record"));

// Get driver connection 

const dbo = require("./db/connection");


app.listen(port, ()=>{
    // Perform a DB connection when server starts
    dbo.connectToServer(function(error){
        if(error) console.error(`Error ⚠️ was found in db connection : ${error} ❌`);
    })
    console.log(`Server is running on port: http://localhost:${port} 🚀`);
})