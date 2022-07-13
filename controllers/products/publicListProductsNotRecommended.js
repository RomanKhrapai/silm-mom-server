const { Product } = require("../../models");

const publicListProductsNotRecommended = async (req, res) => {
  const results = await Product.find({ groupBloodNotAllowed: true });

  const items = results.map((result) => {
    if (result.groupBloodNotAllowed[1] === true) {
      return result.categories;
    }
    if (result.groupBloodNotAllowed[2] === true) {
      return result.categories;
    }
    if (result.groupBloodNotAllowed[3] === true) {
      return result.categories;
    }
    if (result.groupBloodNotAllowed[4] === true) {
      return result.categories;
    }
    return result.categories;
  });

  res.json({
    status: "success",
    code: 200,
    data: {
      items,
    },
  });
};

module.exports = publicListProductsNotRecommended;
