const express = require("express");

// recordRoutes is an example of the express router

const recordRoutes = express.Router();

const dbo = require("../db/connection");

// Converts id from string to ObjectId for the _id
const ObjectId = require("mongodb").ObjectId;

// Get All Records
recordRoutes.route("/products").get(function (req, res) {
  let db_connection = dbo.getDb("ebay_cloneDB");
  db_connection
    .collection("products")
    .find({})
    .toArray(function (error, result) {
      if (error) throw error;
      res.json(result);
    });
});

// Add a single record by :id
recordRoutes.route("/product/:id").get(function (req, res) {
  let db_connection = dbo.getDb("ebay_cloneDB");

  let query = { _id: ObjectId(req.params.id) };

  db_connection.collection("products").findOne(query, function (error, result) {
    if (error) throw error;
    res.json(result);
  });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connection = dbo.getDb();
  let myobj = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  db_connection.collection("products").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connection = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };
  db_connection
    .collection("products")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connection = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connection.collection("products").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;
