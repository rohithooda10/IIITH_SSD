const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  rollno: String,
  password: String,
  role: String,
});

const UserModel = new mongoose.model("users", UserSchema);

module.exports = UserModel;
