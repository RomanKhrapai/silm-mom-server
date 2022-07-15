const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../../helpers");

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const passCompare = bcrypt.compareSync(password, user.password);

    if (!user || !passCompare) {
        throw new Unauthorized("Email or password is wrong");
    }

    const accessToken = generateAccessToken(user._id);

    const refreshToken = generateRefreshToken(user._id);

    await User.findByIdAndUpdate(user._id, { refreshToken });

    const {
        name,
        height,
        age,
        currentWeight,
        desiredWeight,
        bloodType,
        dailyCalorieIntake,
        language,
    } = user;
    res.json({
        refreshToken,
        accessToken,
        user: {
            name,
            email,
            params: {
                height,
                age,
                currentWeight,
                desiredWeight,
                bloodType,
                dailyCalorieIntake,
                language,
            },
        },
    });
};

module.exports = login;
