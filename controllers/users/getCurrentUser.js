const { Product } = require("../../models");

const getCurrentUser = async (req, res) => {
  const {
    name,
    email,
    height,
    age,
    currentWeight,
    desiredWeight,
    bloodType,
    dailyCalorieIntake,
    createdAt,
    language = "ua",
  } = req.user;

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
    name,
    email,
    height,
    age,
    currentWeight,
    desiredWeight,
    bloodType,
    dailyCalorieIntake,
    productsNotRecommended,
    createdAt,
  });
};

module.exports = getCurrentUser;
