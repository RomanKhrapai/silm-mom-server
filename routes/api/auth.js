const express = require("express");

const router = express.Router();

const {
  register,
  login,
  logout,
  refresh
} = require("../../controllers/auth");
const {
  joiLoginSchema,
  joiRegisterSchema,
} = require("../../models/user");
const { validation, auth, ctrlWrapper } = require("../../middlewares");

router.post("/register", validation(joiRegisterSchema), ctrlWrapper(register));
router.get("/login", validation(joiLoginSchema), ctrlWrapper(login));
router.post("/refresh-token", refresh);
router.post("/logout", auth, ctrlWrapper(logout));

module.exports = router;
