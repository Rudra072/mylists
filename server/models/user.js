const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  preference: {
    type: mongoose.Types.ObjectId,
    ref: "Preference",
  },
  refreshToken: [String],
  boards: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Board",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
