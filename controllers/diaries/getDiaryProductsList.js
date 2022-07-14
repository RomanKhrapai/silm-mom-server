const { Diary } = require("../../models");

const getDiaryProductsList = async (req, res) => {
  const { date } = req.params;
  const user = req.user._id;

  const result = await Diary.find({
    date,
    user,
  }).populate("productId", "title calories");
  
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
