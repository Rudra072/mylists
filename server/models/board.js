const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Task = require("./task");

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: [
      {
        _id: false,
        path: String,
        filename: String,
      },
    ],
    columns: [
      {
        title: {
          type: String,
          required: true,
        },

        tasks: [
          {
            type: Schema.Types.ObjectId,
            ref: "Task",
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

boardSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    for (const column of doc.columns) {
      await Task.deleteMany({
        _id: {
          $in: column.tasks,
        },
      });
    }
  }
});

module.exports = mongoose.model("Board", boardSchema);
