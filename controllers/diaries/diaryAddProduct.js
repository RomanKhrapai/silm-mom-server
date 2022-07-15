const { Diary } = require("../../models");

const diaryAddProduct = async (req, res) => {
    const user = req.user._id;

    const doc = new Diary({
        ...req.body,
        user,
    });
    const product = await doc.save();

    if (!doc) {
        return res.status(400).json({ message: "missing required field" });
    }

    const result = await Diary.find({
        date: req.body.date,
        user,
    }).populate("productId", "title calories");

    if (!result) {
        return res.status(404).json({
            message: "Date not found",
        });
    }

    res.status(201).json({
        status: "success",
        code: 201,
        data: result,
    });
};

module.exports = diaryAddProduct;
