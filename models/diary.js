const { Schema, model } = require("mongoose");
const Joi = require("joi");

const diarySchema = Schema({
  date: {
    type: String,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },
});

const Diary = model("diary", diarySchema);

const joiSchema = Joi.object({
  date: Joi.string().required(),
  productId: Joi.string().required(),
  amount: Joi.number().required(),
});

module.exports = {
  Diary,
  joiSchema,
};
