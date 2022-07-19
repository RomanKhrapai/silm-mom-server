const jwt = require("jsonwebtoken");
const { ACCESS_SECRET_KEY } = process.env;

const generateAccessToken = (id) => {
  const payloadAccess = {
    id,
    type: "access",
  };

  return jwt.sign(payloadAccess, ACCESS_SECRET_KEY, {
    expiresIn: "15m",
  });
};

module.exports = generateAccessToken;
