// businessModel
const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  businessName: { type: String, unique: true, required: true },
  businessEmail: { type: String, unique: true, required: true },
  businessPassword: { type: String, required: true },
  businessLocation: { type: String, required: false },
  businessActive: { type: String, required: false },
  businessAvatar: { type: String, required: false },
});

const Business = mongoose.model("Business", BusinessSchema);

module.exports = Business;
