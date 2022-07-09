const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = Schema(
  {
    _id: {
      type: { String },
    },
    categories: {
      type: [String],
    },
    weight: {
      type: Number,
    },
    title: {
      ru: {
        type: String,
      },
      ua: {
        type: String,
      },
    },
    calories: {
      type: Number,
    },
    groupBloodNotAllowed: {
      type: [Boolean],
    },
    __v: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

const Product = model("product", productSchema);

const joiSchema = Joi.object({
  _id: Joi.string(),
  categories: Joi.array(),
  weight: Joi.number(),
  title: Joi.object(),
  calories: Joi.number(),
  groupBloodNotAllowed: Joi.array(),
  __v: Joi.any(),
});

module.exports = {
  Product,
  joiSchema,
};
