const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const Preference = require("../models/preference");
const multer = require("multer");
const upload = multer({ dest: "../uploads" });

router.post("/", upload.single("background"), async (req, res) => {
  try {
    const { user: userId, body } = req;
    const user = await User.findById(userId);
    const preference = new Preference(body);
    await preference.save();
    user.preference = preference;
    await user.save();
    return res.send({ message: "Workspace created successfully" });
  } catch (error) {
    return res.status(400).json({ error: "could not create workspace" });
  }
  // res.send(req.file || req.files);
});

router.get("/", async (req, res) => {
  try {
    const { user: userId } = req;
    const user = await User.findById(userId).populate("preference");
    res.send(user.preference);
  } catch (error) {
    return res.status(400).json({ error: "could not get preference" });
  }
});

router.patch("/preference", async (req, res) => {
  try {
    const { user: userId } = req;
    const { colorScheme, workspaceUsername, workspaceTitle, theme } = req.body;
    const { preference } = await User.findById(userId).populate("preference");
    if (workspaceTitle && workspaceUsername) {
      preference.workspaceTitle = workspaceTitle;
      preference.workspaceUsername = workspaceUsername;
    }
    if (colorScheme) {
      preference.colorScheme = colorScheme;
    }
    if (theme) {
      preference.theme = theme;
    }
    await preference.save();
    return res.send({ message: "preference updated successfully" });
  } catch (error) {
    return res.status(400).json({ error: "could not update preference" });
  }
});

module.exports = router;
