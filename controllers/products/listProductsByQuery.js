const { Product } = require("../../models");

const listProductsByQuery = async (req, res) => {
    const queryParameter = req.query.title.trim();

    const titleLanguage =
        queryParameter.charCodeAt(0) > 1000 ? "title.ua" : "title.en";

    const result = await Product.find(
        {
            [`${titleLanguage}`]: {
                $regex: queryParameter,
                $options: "i",
            },
        },
        "_id title calories groupBloodNotAllowed"
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
