const express = require("express");

const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { joiSchema } = require("../../models/product");
const { products: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addProduct));

router.get("/", validation(joiSchema), ctrlWrapper(ctrl.listProductsByQuery));

router.get(
  "/categories",
  validation(joiSchema),
  ctrlWrapper(ctrl.publicListProductsNotRecommended)
);

module.exports = router;
