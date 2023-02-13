const {
  regisrtation,
  login,
  logout,
  getCurrentUser,
  updateAvatar,
  verifyUser,
  resendEmail,
} = require("../services/authService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  const user = await regisrtation(email, password);

  res
    .status(201)
    .json({
      user: {
        email: `${user.email}`,
        subscription: `${user.subscription}`,
        verificationToken: `${user.verificationToken}`,
      },
    });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  res.status(200).json({
    token,
    user: { email: `${email}` },
  });
};

const logoutController = async (req, res) => {
  const { id } = req.user;
  await logout(id);

  res.status(204).json({ status: "success", message: "No content" });
};
const getCurrentUserController = async (req, res) => {
  const { id } = req.user;
  const user = await getCurrentUser(id);
  res.status(200).json({
    email: `${user.email}`,
    data: {
      message: "Verification successful",
    },
  });
};
const verifyUserController = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await verifyUser(verificationToken);
  console.log(user);
  if (!user) {
    return res.status(404).json({
      status: "failure",
      message: `User not found`,
    });
  }
  res
    .status(200)
    .json({ status: "success", message: "Verification successful" });
};
const resendEmailController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      status: "failure",
      message: `missing required field email`,
    });
  }
  const user = await resendEmail(email);
  if (user.verify) {
    return res.status(400).json({
      status: "failure",
      message: `Verification has already been passed`,
    });
  }

  res.status(200).json({
    message: "Verification email sent",
  });
};

const updateAvatarController = async (req, res) => {
  const { id } = req.user;

  const file = req.file;

  const avatarURL = await updateAvatar(id, file);
  res.status(200).json({ code: 200, avatarURL });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  verifyUserController,
  resendEmailController,
  updateAvatarController,
};
