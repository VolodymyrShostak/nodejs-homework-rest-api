const User = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");
const { NotAuthorizedError }  = require("../helpers/errors");
const bcrypt = require("bcrypt");

const regisrtation = async (email, password) => {
    
    const user = new User({
        email,
        password: await bcrypt.hash(password, 10),
    });
  await user.save();
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new NotAuthorizedError("Email is wrong");
    }
    if (!await bcrypt.compare(password, user.password)) {
        throw new NotAuthorizedError("Password is wrong");
    }
    const token = jsonwebtoken.sign({
        id: user._id,
        createdAt: user.createdAt
    }, process.env.JWT_SECRET)
    return token;

};

module.exports = {
  regisrtation,
  login,
};
