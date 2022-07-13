const { Product } = require("../../models");

const publicUserDiet = async (req, res) => {
  const { height, age, currentWeight, desiredWeight, bloodType} = req.body;


  const dailyCalorieIntake =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight);

  const language = "ua";
  const options = `categories.${language}`;

  const f = `groupBloodNotAllowed.${bloodType}`;
 
  const results = await Product.find({ [f]: true }, options);

 const json = JSON.parse(JSON.stringify(results));;

 const resultMap = json.map((item) => item.categories[language]);

 const productsNotRecommended = [...new Set(resultMap)];

  res.json({
    user: {
      dailyCalorieIntake,
      productsNotRecommended,
    },
  });
};

module.exports = publicUserDiet;
