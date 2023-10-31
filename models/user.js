const mongoose = require("mongoose");
const gravatar = require("gravatar");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  avatarURL: String,
  token: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
