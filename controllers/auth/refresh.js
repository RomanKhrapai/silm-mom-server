const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { BadRequest } = require("http-errors");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const refresh = async (req, res, next) => {
  const token  = req.body.refreshToken;

  try {
    const payload = jwt.verify(token, REFRESH_SECRET_KEY);
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== token || payload.type !== "refresh") {
      throw new BadRequest("Invalid token");
    }

    const payloadAccess = {
      id: user._id,
      type: "access",
    };

    const payloadRefresh = {
      id: user._id,
      type: "refresh",
    };

    const accessToken = jwt.sign(payloadAccess, ACCESS_SECRET_KEY, {
      expiresIn: "10h",
    });

    const refreshToken = jwt.sign(payloadRefresh, REFRESH_SECRET_KEY, {
      expiresIn: "1d",
    });
    await User.findByIdAndUpdate(user._id, { refreshToken });
    res.json({
      refreshToken,
      accessToken,
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: "Expired token" });
      return;
    }
    next(error);
  }
};

module.exports = refresh;
