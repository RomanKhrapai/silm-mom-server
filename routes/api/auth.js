const express = require("express");

const router = express.Router();

const {
    register,
    login,
    logout,
    refresh,
    googleAuth,
    googleRedirect,
} = require("../../controllers/auth");
const { joiLoginSchema, joiRegisterSchema } = require("../../models/user");
const { validation, auth, ctrlWrapper } = require("../../middlewares");

router.post("/register", validation(joiRegisterSchema), ctrlWrapper(register));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(login));
router.post("/refresh-token", refresh);
router.get("/logout", auth, ctrlWrapper(logout));

router.get("/google", ctrlWrapper(googleAuth));
router.get("/google-redirect", ctrlWrapper(googleRedirect));

module.exports = router;
