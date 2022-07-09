const { Product } = require("../../models");

const listProductsByQuery = async (req, res) => {
  const queryParameter = req.query;
  const result = await Product.find({ queryParameter });
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = listProductsByQuery;
