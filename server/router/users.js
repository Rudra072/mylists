const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const refreshTokenController = require("../controller/refreshTokenController");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPwd = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email, password: hashedPwd });
    res.status(201).json({ success: "User created successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "A user with given username is already registered" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const cookies = req.cookies;
    const user = await User.findOne({ username });
    const matchPassword = await bcrypt.compare(password, user.password);
    if (matchPassword) {
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );

      const newRefreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );

      let newRefreshTokenArray = !cookies?.jwt
        ? user.refreshToken
        : user.refreshToken.filter((rt) => rt !== cookies.jwt);

      if (cookies?.jwt) {
        const refreshToken = cookies.jwt;
        const foundToken = await User.findOne({ refreshToken }).exec();
        if (!foundToken) {
          // clear out ALL previous refresh tokens
          newRefreshTokenArray = [];
        }
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });
      }

      user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await user.save();

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
      // Send authorization roles and access token to user
      res.json({ accessToken, user });
      res.status(401);
    } else {
      return res
        .status(400)
        .json({ error: "Password or username is incorrect" });
    }
  } catch (error) {
    res.status(400).json({ error: "Password or username is incorrect" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    //On client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    //Is refreshToken in db?
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.sendStatus(204);
    }

    //Delete refreshToken in db
    user.refreshToken = [];
    await user.save();
    res.clearCookie("jwt", {
      sameSite: "None",
      httpOnly: true,
      secure: true,
    }); //secure: ture in production
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
});

router.get("/refresh", refreshTokenController.handleRefreshToken);

module.exports = router;
