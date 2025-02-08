const jwt = require("jsonwebtoken");
const User = require("../models/user");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken }).exec();
  // console.log(user);
  // Detected refresh token reuse!
  // if (!user) {
  //   jwt.verify(
  //     refreshToken,
  //     process.env.REFRESH_TOKEN_SECRET,
  //     async (err, decoded) => {
  //       if (err) return res.sendStatus(403); //Forbidden
  //       // Delete refresh tokens of hacked user
  //       const hackedUser = await User.findOne({
  //         _id: decoded.userId,
  //       }).exec();
  //       hackedUser.refreshToken = [];
  //       const result = await .save();
  //     }
  //   );
  //   return res.sendStatus(403); /hackedUser/Forbidden
  // }

  const newRefreshTokenArray = user?.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        // expired refresh token
        user.refreshToken = [...newRefreshTokenArray];
        const result = await user.save();
      }
      if (err || !user?._id.equals(decoded.userId)) return res.sendStatus(403);

      // Refresh token was still valid
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
      // Saving refreshToken with current user
      user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await user.save();

      // Creates Secure Cookie with refresh token
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });

      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken });
    }
  );
};

module.exports = { handleRefreshToken };
