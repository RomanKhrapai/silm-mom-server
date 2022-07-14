const { Product } = require("../../models");

const publicUserDiet = async (req, res) => {
  const {
    height,
    age,
    currentWeight,
    desiredWeight,
    bloodType,
    language = "ua",
  } = req.body;

  const calculationDailyCalorieIntake =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight);

  const dailyCalorieIntake = Math.round(calculationDailyCalorieIntake);  

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
    user: {
      dailyCalorieIntake,
      productsNotRecommended,
    },
  });
};

module.exports = publicUserDiet;
