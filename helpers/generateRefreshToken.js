const jwt = require("jsonwebtoken");
const { REFRESH_SECRET_KEY } = process.env;

const generateRefreshToken = (id) => {
  const payloadRefresh = {
    id,
    type: "refresh",
  };

  return jwt.sign(payloadRefresh, REFRESH_SECRET_KEY, {
    expiresIn: "1d",
  });
};

module.exports = generateRefreshToken;
