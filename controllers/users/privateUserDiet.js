const { Product } = require("../../models");
const { User } = require("../../models");
const { NotFound } = require("http-errors");

const privateUserDiet = async (req, res) => {
  const {
    height,
    age,
    currentWeight,
    desiredWeight,
    bloodType,
    language = "ua",
  } = req.body;
  const { _id } = req.user;

  const calculationDailyCalorieIntake =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight);

  const dailyCalorieIntake = Math.round(calculationDailyCalorieIntake);  

  const user = await User.findByIdAndUpdate(
    _id,
    {
      height,
      age,
      currentWeight,
      desiredWeight,
      bloodType,
      dailyCalorieIntake,
    },
    {
      new: true,
    }
  );

  if (!user) {
    throw new NotFound("Not found");
  }

  const options = `categories.${language}`;

  const resultFind = await Product.find(
    { [`groupBloodNotAllowed.${bloodType}`]: true },
    options
  );

  const transformationResult = JSON.parse(JSON.stringify(resultFind));

  const resultMap = transformationResult.map(
    (item) => item.categories[language]
  );

  const productsNotRecommended = [...new Set(resultMap)];

  res.json({
    data: {
      userId: _id,
      dailyCalorieIntake,
      productsNotRecommended,
    },
  });
};

module.exports = privateUserDiet;
