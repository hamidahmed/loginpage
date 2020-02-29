const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  email: String,
  //isVerified: {type: Boolean, default:false},
  username: String,
  password: String,
  //passwordResetToken: String,
  //passwordResetExpires: Date,
  createdAt: String
});

module.exports = model("User", userSchema);
