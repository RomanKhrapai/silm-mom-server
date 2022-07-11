const { Schema, model } = require("mongoose");
const Joi = require("joi");

const diarySchema = Schema(
  {
    date: {
      type: Date,
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
  },
  { versionKey: false, timestamps: true }
);

const Diary = model("diary", diarySchema);

const joiSchema = Joi.object({
  date: Joi.date(),

  amount: Joi.number(),
});

module.exports = {
  Diary,
  joiSchema,
};
