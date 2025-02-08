const express = require("express");
const router = express.Router({ mergeParams: true });
const Board = require("../models/board");
const { arrayMove } = require("@dnd-kit/sortable/");

router.get("/:filters", async (req, res) => {
  try {
    const { id, filters } = req.params;
    const pairs = filters.split("&");
    const filter = pairs.map((d) => d.split("=")[1]);
    const priorityFilter = filter;

    const board = await Board.findById(id).populate("columns.tasks");
    const columns = board.columns;

    if (!priorityFilter.includes("None")) {
      columns.forEach((column) => {
        column.tasks = column.tasks.filter((task) =>
          priorityFilter.includes(task.priority)
        );
      });
    }
    res.send(columns);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/reorder", async (req, res) => {
  try {
    const { id } = req.params;
    const { columns, startIndex, endIndex } = req.body;
    const board = await Board.findById(id).populate("columns.tasks");
    const reorderedColumns = arrayMove(columns, startIndex, endIndex);
    board.columns = reorderedColumns.slice();
    await board.save();
    res.send({ message: "Columns reordered successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { id } = req.params;
    const board = await Board.findById(id);
    board?.columns.push(req.body);
    await board.save();
    res.send({ message: "Column created successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.patch("/:columnId/edit", async (req, res) => {
  try {
    const { id, columnId } = req.params;
    const { title } = req.body;
    const board = await Board.findById(id);
    const column = board.columns.find((c) => c._id.equals(columnId));
    column.title = title;
    await board.save();
    return res.send({ message: "Column renamed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "could not rename column" });
  }
});

router.delete("/:columnId", async (req, res) => {
  try {
    const { id, columnId } = req.params;
    const board = await Board.findById(id);
    const filteredColumns = board.columns.filter(
      (c) => !c._id.equals(columnId)
    );
    board.columns = filteredColumns;
    await board.save();
    res.send({ message: "Column deleted successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
