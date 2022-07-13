const { Product } = require("../../models");

const listProductsByQuery = async (req, res) => {
  const queryParameter = req.query.title;

  const result = await Product.find(
    {
      "title.ua": {
        $regex: queryParameter,
        $options: "i",
      },
      "title.en": {
        $regex: queryParameter,
        $options: "i",
      },
    },
    "_id title.ua title.en calories"
  ).exec();
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = listProductsByQuery;
