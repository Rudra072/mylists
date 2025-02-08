const express = require("express");
const router = express.Router({ mergeParams: true });
const Board = require("../models/board");
const Task = require("../models/task");
const { arrayMove } = require("@dnd-kit/sortable/");

router.get("/", async (req, res) => {
  try {
    const { id, columnId } = req.params;
    const board = await Board.findById(id).populate("columns.tasks");
    const column = board.columns.find((c) => c._id.toString() === columnId);
    const tasks = column?.tasks;
    return res.send(tasks);
  } catch (error) {
    return res.status(400).json({ error: "could not get tasks" });
  }
});

router.patch("/reorder", async (req, res) => {
  try {
    const { id, columnId } = req.params;
    const { tasks, startIndex, endIndex } = req.body;
    const board = await Board.findById(id);
    const column = board.columns.find((c) => c._id.toString() === columnId);
    const reorderedTasks = arrayMove(tasks, startIndex, endIndex);
    column.tasks = reorderedTasks.slice();
    await board.save();
    return res.send({ message: "Tasks reordered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "could not reorder task" });
  }
});

router.patch("/overcolumn", async (req, res) => {
  try {
    const { id, columnId } = req.params;
    const { destColumnIndex, sourceTaskIndex, destTaskIndex } = req.body;
    const board = await Board.findById(id).populate("columns.tasks");
    const column = board.columns.find((c) => c._id.toString() === columnId);
    const [removedTask] = column.tasks.splice(sourceTaskIndex, 1);
    board.columns[destColumnIndex].tasks.splice(destTaskIndex, 0, removedTask);
    await board.save();
    return res.send({ message: "Tasks moved successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "could not reorder task" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { id, columnId } = req.params;
    const { user: userId } = req;
    const board = await Board.findById(id);
    const column = board.columns.find((c) => c._id.equals(columnId));
    const task = new Task(req.body);
    column?.tasks.push(task);
    task.user = userId;
    await task.save();
    await board.save();
    return res.send({ message: "Tasks added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "could not add task" });
  }
});

router.patch("/:taskId/edit", async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    const { checklist, estimate, priority, tag, pinned } = req.body;

    if (!req.body.description) {
      task.pinned = pinned && pinned;
      task.description = "";
      task.checklist = checklist;
      task.estimate = estimate;
      task.priority = priority;
      task.tag = tag;
      await task.save();
    } else {
      const updatedTask = await Task.findByIdAndUpdate(
        { _id: taskId },
        req.body,
        {
          new: true,
        }
      );
      await updatedTask.save();
    }

    return res.send({ message: "Tasks updated successfully" });
  } catch (error) {
    return res.status(400).json({ error: "could not update task" });
  }
});

router.delete("/:taskId", async (req, res) => {
  try {
    const { id, taskId, columnId } = req.params;
    // await Board.findByIdAndUpdate(
    //   { _id: id },
    //   { $pull: { "columns.$[].tasks": [taskId] } }
    // );
    const board = await Board.findById(id).exec();
    const column = board.columns.find((c) => c._id.equals(columnId));
    const tasks = column.tasks.filter((t) => !t._id.equals(taskId));
    column.tasks = tasks;
    await Task.findByIdAndDelete(taskId);
    await board.save();
    return res.send({ message: "Tasks deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "could not delete task" });
  }
});

module.exports = router;
