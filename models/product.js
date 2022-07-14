const { Schema, model } = require("mongoose");

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
      en: {
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
  },
  { versionKey: false, timestamps: true }
);

const Product = model("product", productSchema);

module.exports = {
  Product,
};
