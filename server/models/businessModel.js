const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  businessName: { type: String, unique: true, required: true },
  businessEmail: { type: String, unique: true, required: true },
  businessPassword: { type: String, unique: true, required: true },
  businessLocation: { type: String, unique: true, required: false },
  businessActive: { type: String, unique: true, required: false },
});

const Business = mongoose.model("Business", BusinessSchema);

module.exports = Business;
