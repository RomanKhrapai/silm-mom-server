const { Diary } = require("../../models");

const diaryDeleteProduct = async (req, res) => {
  const productId = req.params.id;

  Diary.findOneAndDelete(
    {
      _id: productId,
    },
    (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Failed to remove product",
        });
      }

      if (!doc) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.json({
        status: "success",
        code: 200,
        data: {
          doc,
        },
      });
    }
  );
};

module.exports = diaryDeleteProduct;
