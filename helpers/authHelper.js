const jwt = require("jsonwebtoken");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const generateAccessToken = (userId) => {
    const payloadAccess = {
      userId,
      type: 'access'
    };

    return jwt.sign(payloadAccess, ACCESS_SECRET_KEY, { expiresIn: "1m" });
};

const generateRefreshToken = (userId) => {
  const payload = {
    userId,
    type: "refresh",
  };

  return jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "1d" });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
