const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PreferenceSchema = new Schema(
  {
    workspaceTitle: {
      type: String,
    },
    workspaceUsername: {
      type: String,
    },
    colorScheme: {
      type: String,
    },
    theme: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Preference", PreferenceSchema);
