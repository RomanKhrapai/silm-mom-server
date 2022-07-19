const express = require("express");

const { ctrlWrapper, auth } = require("../../middlewares");
const { products: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listProductsByQuery));

module.exports = router;
