const User = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const { v4: uuidv4 } = require("uuid");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const regisrtation = async (email, password) => {
  const user = new User({
    email,
    password,
    verificationToken: uuidv4(),

  });

  const msg = {
    to: email,
    from: "shostakvolodymyr24@gmail.com",
    subject: "Email verification",
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Please verify your email</a>`,
  };
  await sgMail.send(msg);
  
  // if (user.verify) {
  //   throw new NotAuthorizedError("Sorry, but your email not verify");
  // }
  // const verificationToken = uuidv4();
 
  await user.save();

  return { user};
};

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true });
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
  const user = await User.findOne({ verificationToken });
 
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
  return user;
};

module.exports = {
  regisrtation,
  login,
  logout,
  getCurrentUser,
  verifyUser,
};
