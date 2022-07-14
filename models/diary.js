const { Schema, model } = require("mongoose");
const Joi = require("joi");

const diarySchema = Schema({
  date: {
    type: String,
    default: Date.now(),
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
  date: Joi.string(),
  user: Joi.string(),
  amount: Joi.number().required,
});

module.exports = {
  Diary,
  joiSchema,
};
