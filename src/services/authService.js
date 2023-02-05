const User = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const regisrtation = async (email, password) => {
  const avatarURL = gravatar.url(email);
  const user = new User({
    email,
    password,
    avatarURL
  });
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError("Email is wrong");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Password is wrong");
  }
  const token = jsonwebtoken.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
  return token;
};
const logout = async (id) => {
  const user = await User.findByIdAndUpdate(id, { token: null });

  if (!user) throw new NotAuthorizedError("Not authorized");
};
const getCurrentUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotAuthorizedError("Not authorized");
  }
  return user;
};
const updateAvatar = async (id, path) => { 
  if (!path) {
    throw new NotAuthorizedError("Avatar is required");
  }
};



module.exports = {
  regisrtation,
  login,
  logout,
  getCurrentUser,
  updateAvatar,
}
