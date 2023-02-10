const User = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const regisrtation = async (email, password) => {
  const user = new User({
    email,
    password,
  });
  await user.save();
  
const msg = {
  to: email,
  from: "shostak2002@meta.ua",
  subject: "Thanks for registration",
  text: "and easy to do anywhere, even with Node.js",
  html: "<h1>and easy to do anywhere, even with Node.js</h1>",
};
await sgMail.send(msg);
return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true});
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
const verifyUser = async (verificationToken) => {
  const user = await User.findOne(verificationToken);
  if (!user) {
    return false;
  }
  await User.findByIdAndUpdate(user._id, { verify: true });
}

module.exports = {
  regisrtation,
  login,
  logout,
  getCurrentUser,
  verifyUser,
};
