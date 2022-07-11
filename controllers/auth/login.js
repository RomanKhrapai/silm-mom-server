const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
   const passCompare = bcrypt.compareSync(password, user.password);

  if (!user || !passCompare) {
    throw new Unauthorized("Email or password is wrong");
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
    user: {
      email,
    },
  });
};

module.exports = login;
