const User = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const { v4: uuidv4 } = require("uuid");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const gravatar = require("gravatar");
const Jimp = require("jimp");
const path = require("path");

const regisrtation = async (email, password) => {
  const avatarURL = gravatar.url(email);
  const user = new User({
    email,
    password,
    verificationToken: uuidv4(),
    avatarURL,
  });

  const msg = {
    to: email,
    from: "shostakvolodymyr24@gmail.com",
    subject: "Email verification",
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Please verify your email</a>`,
  };
  await sgMail.send(msg);

  await user.save();

  return  user ;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError("Email is wrong");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Password is wrong");
  }
  if (!user.verify) {
    throw new NotAuthorizedError("Sorry, but your email not verify");
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

const updateAvatar = async (id, file) => {
  if (!file) {
    return Promise.reject(new Error("File not found"));
  }

  const { path: temporaryPath, originalname } = file;

  const newName = `${id}_${originalname}`;

  const avatarsDir = path.resolve("./src/public/avatars");

  const newPath = path.join(avatarsDir, newName);

  await Jimp.read(temporaryPath)
    .then((avatar) => {
      return avatar.resize(250, 250).write(newPath);
    })
    .catch((err) => {
      throw err;
    });

  const avatarURL = path.join("avatars", newName);

  const updatedUser = await User.findOneAndUpdate(
    { avatarURL },
    {
      new: true,
    }
  );
  return updatedUser.avatarURL;
};
const verifyUser = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  return user;
};

const resendEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError("Email is wrong");
  }
  if (user.verificationToken) {
    const msg = {
      to: email,
      from: "shostakvolodymyr24@gmail.com",
      subject: "Email verification",
      html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Please verify your email</a>`,
    };
    await sgMail.send(msg);
  }
  return user;
};
module.exports = {
  regisrtation,
  login,
  logout,
  getCurrentUser,
  verifyUser,
  resendEmail,
  updateAvatar,
};
