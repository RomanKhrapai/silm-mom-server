const express = require("express");

const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { joiSchema } = require("../../models/diary");
const { diaries: ctrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/",
  auth,
  validation(joiSchema),
  ctrlWrapper(ctrl.diaryAddProduct)
);

router.get(
  "/",
  auth,
  validation(joiSchema),
  ctrlWrapper(ctrl.getDiaryProductsList)
);

module.exports = router;
