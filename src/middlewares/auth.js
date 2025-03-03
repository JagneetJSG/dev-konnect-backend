const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    //read the cookies from request
    const { token } = req.cookies;
    if (!token) throw new Error("Token isnt valid");
    const decodedData = await jwt.verify(token, "Dev@123Tinder");

    const { _id } = decodedData;
    const user = await User.findById(_id);
    if (!user) throw new Error("User not found");
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error" + err.message);
  }
};
module.exports = {
  userAuth,
};
