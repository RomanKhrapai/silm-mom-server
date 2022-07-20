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

router.get("/:date", auth, ctrlWrapper(ctrl.getDiaryProductsList));

router.delete("/:id", auth, ctrlWrapper(ctrl.diaryDeleteProduct));

module.exports = router;
