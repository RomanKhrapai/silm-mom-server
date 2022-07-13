const express = require("express");

const router = express.Router();

const { joiDietSchema } = require("../../models/user");
const { validation, auth, ctrlWrapper } = require("../../middlewares");
const { publicUserDiet, privateUserDiet } = require("../../controllers/users");

router.get(
  "/public/daily-calorie-intake",
  validation(joiDietSchema),
  ctrlWrapper(publicUserDiet)
);

router.post(
  "/private/daily-calorie-intake",
  auth,
  validation(joiDietSchema),
  ctrlWrapper(privateUserDiet)
);

module.exports = router;