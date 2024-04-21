// businessModel
const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  businessEmail: { type: String, unique: true, required: true },
  businessPassword: { type: String, required: true },
  businessName: { type: String, unique: true, required: true },
  businessAvatar: { type: String, required: false },
  businessActive: { type: String, required: false },
  businessLocation: { type: String, required: false },
  buisnessCountry: {
    type: String,
    required: false,
  },
  businessProducts: {
    type: Array,
    required: false,
  },
});

const Business = mongoose.model("Business", BusinessSchema);

module.exports = Business;
