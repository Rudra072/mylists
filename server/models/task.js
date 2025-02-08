const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    duedate: String,
    estimate: String,
    priority: { type: String, enum: ["High", "Medium", "Low"] },
    description: String,
    tag: String,
    completed: {
      type: Boolean,
      default: false,
    },
    checklist: [
      {
        title: String,
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
