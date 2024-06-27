const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: [String], default: [] },
  yearsOfExperience: { type: Number, default: 0 },
  location: String,
  videoInterviewResults: String,
  codingInterviewResults: String,
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
