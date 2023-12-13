const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {type: String, unique: true, required: true, },
  lastName:{type: String, unique: true, required: true,  },
  avatar :{ type: String, unique: false, required: false},
  email: { type: String, unique: true, required: true, },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
