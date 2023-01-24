const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const { generateAccessToken, generateRefreshToken } = require("../../helpers");

const queryString = require("query-string");
const axios = require("axios");

const googleRedirect = async (req, res) => {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const urlObj = new URL(fullUrl);
    const urlParams = queryString.parse(urlObj.search);
    const code = urlParams.code;
    console.log(code);
    const tokenData = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: "post",
        data: {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
            grant_type: "authorization_code",
            code,
        },
    });
    console.log(tokenData);
    const userData = await axios({
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
        method: "get",
        headers: {
            Authorization: `Bearer ${tokenData.data.access_token}`,
        },
    });
    const { email, name, given_name, picture, locale } = userData.data;
    let user = await User.findOne({ email });
    //  User.findOneAndDelete({ _id: user._id }, (err, doc) => {});
    if (!user) {
        user = await User.create({
            name: given_name,
            email,
            password: "hashPassword",
            language: locale === "ua" ? "ua" : "en",
        });
    }

    const accessToken = generateAccessToken(user._id);

    const refreshToken = generateRefreshToken(user._id);

    await User.findByIdAndUpdate(user._id, { refreshToken });

    return res.redirect(
        `${process.env.FRONTEND_URL}?refreshToken=${refreshToken}&accessToken=${accessToken}`
    );
};

module.exports = googleRedirect;
