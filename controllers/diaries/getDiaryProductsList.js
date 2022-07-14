const { Diary } = require("../../models");

const getDiaryProductsList = async (req, res) => {

  const { date } = req.params;

  const result = await Diary.findOne({ date }).populate(
    "user",
    "_id products"
  );

  if (!result) {
    return res.status(404).json({
      message: "Date not found",
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = getDiaryProductsList;

