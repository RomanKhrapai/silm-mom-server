const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = Schema(
  {
    _id: {
      $oid: {
        type: String,
      },
    },
    categories: {
      type: { String },
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
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Product = model("product", productSchema);

const joiSchema = Joi.object({
  _id: Joi.string(),
  categories: Joi.object(),
  weight: Joi.number(),
  title: Joi.object(),
  calories: Joi.number(),
  groupBloodNotAllowed: Joi.array(),
});

module.exports = {
  Product,
  joiSchema,
};
