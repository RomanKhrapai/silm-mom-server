const { Product } = require("../../models");
const { User } = require("../../models");
const { NotFound } = require("http-errors");

const privateUserDiet = async (req, res) => {
  const { height, age, currentWeight, desiredWeight, bloodType } = req.body;
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(
    _id,
    { height, age, currentWeight, desiredWeight, bloodType },
    {
      new: true,
    }
  );

  if (!user) {
    throw new NotFound("Not found");
  }

  const dailyCalorieIntake =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight);

  const results = await Product.find({ groupBloodNotAllowed: true });

  const notRecommendedProductsArray = results.filter(
    (result) => result.groupBloodNotAllowed[`${bloodType}`] === true
  );

  res.json({
    user: {
      dailyCalorieIntake,
      notRecommendedProductsArray,
    },
  });
};

module.exports = privateUserDiet;
