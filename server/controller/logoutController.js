const User = require("../models/user");

const handleLogout = async (req, res) => {
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
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); //secure: ture in production
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleLogout };
