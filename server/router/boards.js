const express = require("express");
const router = express.Router({ mergeParams: true });
const Board = require("../models/board");
const User = require("../models/user");
const Task = require("../models/task");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
require("dotenv").config();

router.post("/", upload.single("background"), async (req, res) => {
  try {
    const { path, filename } = req.file;
    const board = new Board(req.body);
    board.image = [{ path, filename }];
    const { user: userId } = req;
    const user = await User.findById(userId);
    user?.boards?.push(board);
    await user.save();
    await board.save();
    res.status(201).json({ success: "Board created successfully" });
  } catch (error) {
    return res.status(400).json({ error: "could not add board" });
  }
});

router.get("/", async (req, res) => {
  try {
    const boards = await Board.find({});
    const { user: userId } = req;
    const user = await User.findById(userId).populate("boards");
    return res.json(user.boards);
  } catch (error) {
    return res.status(400).json({ error: "could not get boards" });
  }
});

router.get("/tasks", async (req, res) => {
  const { user: userId } = req;
  const tasks = await Task.find({});
  const totalTasks = tasks.filter((t) => t.user.equals(userId));
  res.send(totalTasks);
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const board = await Board.findById(id);
    return res.json(board);
  } catch (error) {
    return res.status(400).json({ error: "could not get boards" });
  }
});

router.patch("/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const board = await Board.findById(id);
    board.title = title;
    await board.save();
    return res.send({ message: "Board renamed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "could not rename board" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const board = await Board.findOneAndDelete({ _id: id });
    res.send({ message: "Board deleted successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
