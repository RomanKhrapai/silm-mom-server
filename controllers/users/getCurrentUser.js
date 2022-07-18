const getCurrentUser = async (req, res) => {
    const {
        name,
        email,
        height,
        age,
        currentWeight,
        desiredWeight,
        bloodType,
        dailyCalorieIntake,
        createdAt,
    } = req.user;

    res.json({
        name,
        email,
        height,
        age,
        currentWeight,
        desiredWeight,
        bloodType,
        dailyCalorieIntake,
        createdAt,
    });
};

module.exports = getCurrentUser;
