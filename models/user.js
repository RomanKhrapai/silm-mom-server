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
    height: { type: Number, min: 100, max: 250 },
    age: { type: Number, min: 18, max: 100 },
    currentWeight: { type: Number, min: 20, max: 500 },
    desiredWeight: { type: Number, min: 20, max: 500 },
    bloodType: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: 1,
    },
    token: {
      type: String,
      default: null,
    },
    products: {
      type: Schema.Types.ObjectId,
      ref: "product",
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

const User = model("user", userSchema);

module.exports = { User, joiRegisterSchema, joiLoginSchema };
