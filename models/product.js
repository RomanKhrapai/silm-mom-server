const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = Schema(
  {
    weight: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Product = model("product", productSchema);

const joiSchema = Joi.object({
  weight: Joi.number(),
});

module.exports = {
  Product,
  joiSchema,
};
