const { Diary } = require("../../models");

const getDiaryProductsList = async (req, res) => {
  const { _id } = req.user;

  const result = await Diary.find({ user: _id }).populate(
    "user",
    "_id products"
  );

  console.log(result);
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getDiaryProductsList;
