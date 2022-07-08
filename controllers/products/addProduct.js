const { Product } = require("../../models");

const addProduct = async (req, res) => {
  const result = await Product.create(req.body);

  if (!req.body) {
    return res.status(400).json({ message: "missing required name field" });
  }

  res.status(201).json({
    result,
  });
};

module.exports = addProduct;
