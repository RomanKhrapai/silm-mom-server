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
   });
}

module.exports = getCurrentUser;