const { Schema, model } = require("mongoose");
const Joi = require("joi");

const regexpEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: 3,
            maxlength: 254,
        },
        password: {
            type: String,
            required: [true, "Set password for user"],
            minlength: 8,
            maxlength: 100,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            minlength: 3,
            maxlength: 254,
            match: regexpEmail,
            unique: true,
        },
        height: { type: Number, min: 100, max: 250, default: null },
        age: { type: Number, min: 18, max: 100, default: null },
        currentWeight: { type: Number, min: 20, max: 500, default: null },
        desiredWeight: { type: Number, min: 20, max: 500, default: null },
        bloodType: {
            type: Number,
            enum: [1, 2, 3, 4, null],
            default: null,
        },
        language: { type: String, enum: ["ua", "en"], default: "ua" },
        dailyCalorieIntake: { type: Number, min: 0, default: null },
        refreshToken: {
            type: String,
            default: null,
        },
    },
    { versionKey: false, timestamps: true }
);

const joiRegisterSchema = Joi.object({
    name: Joi.string()
        .required()
        .min(3)
        .max(254)
        .error(new Error("missing required name field")),
    email: Joi.string()
        .required()
        .error(new Error("missing required email field")),
    password: Joi.string()
        .required()
        .min(8)
        .max(100)
        .error(new Error("missing required password field")),
});

const joiLoginSchema = Joi.object({
    email: Joi.string()
        .required()
        .error(new Error("missing required email field")),
    password: Joi.string()
        .required()
        .min(8)
        .max(100)
        .error(new Error("missing required password field")),
});

const joiDietSchema = Joi.object({
    height: Joi.number()
        .required()
        .integer()
        .min(100)
        .max(250)
        .error(new Error("Height is required")),
    age: Joi.number()
        .required()
        .integer()
        .min(18)
        .max(100)
        .error(new Error("Age is required")),
    currentWeight: Joi.number()
        .required()
        .integer()
        .min(20)
        .max(500)
        .error(new Error("Current weight is required")),
    desiredWeight: Joi.number()
        .required()
        .integer()
        .min(20)
        .max(500)
        .error(new Error("Desired weight is required")),
    bloodType: Joi.number()
        .required()
        .integer()
        .min(1)
        .max(4)
        .error(new Error("Blood type is required")),
    language: Joi.string().valid("ua", "en"),
});

const User = model("user", userSchema);

module.exports = { User, joiRegisterSchema, joiLoginSchema, joiDietSchema };
