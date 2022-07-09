const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({
    name,
    email,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      name,
      email,
    },
  });
};

module.exports = register;
