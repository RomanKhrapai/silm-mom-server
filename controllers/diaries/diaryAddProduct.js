const { Diary } = require("../../models");

const diaryAddProduct = async (req, res) => {
  const userId = req.user._id;
  
  const doc = new Diary({
    ...req.body,
    user: userId,
  });
 
  const product = await doc.save();
  res.json(product);

  if (!doc) {
    return res.status(400).json({ message: "missing required field" });
  }

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      doc,
    },
  });
};

module.exports = diaryAddProduct;
