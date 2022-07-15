const { Diary } = require("../../models");

const diaryDeleteProduct = async (req, res) => {
    const productId = req.params.id;
    const user = req.user._id;

    const data = await Diary.findByIdAndRemove(productId);
    if (!data) {
        return res.status(404).json({
            message: "Date not found",
        });
    }

    const result = await Diary.find({
        date: data.date,
        user,
    }).populate("productId", "title calories");

    if (!result) {
        return res.status(404).json({
            message: "Date not found",
        });
    }

    res.json({
        status: "success",
        code: 200,
        data: result,
    });
};

module.exports = diaryDeleteProduct;
