const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { BadRequest } = require("http-errors");
const { generateAccessToken, generateRefreshToken } = require("../../helpers")

const { REFRESH_SECRET_KEY } = process.env;

const refresh = async (req, res, next) => {
  const token  = req.body.refreshToken;

  try {
    const payload = jwt.verify(token, REFRESH_SECRET_KEY);
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== token || payload.type !== "refresh") {
      throw new BadRequest("Invalid token");
    }

    const accessToken = generateAccessToken(user._id);

    const refreshToken = generateRefreshToken(user._id);
    
    await User.findByIdAndUpdate(user._id, { refreshToken });
    res.json({
      refreshToken,
      accessToken,
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Expired refresh token" });
      return;
    }
    next(error);
  }
};

module.exports = refresh;
