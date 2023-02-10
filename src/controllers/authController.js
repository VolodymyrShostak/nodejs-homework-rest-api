const { regisrtation, login, logout, getCurrentUser, verifyUser } = require("../services/authService");


const registrationController = async (req, res) => {
    const { email, password } = req.body;
  const { user } = await regisrtation(email, password);
    console.log(user);
     
    res
        .status(201)
        .json({  user: { email: `${user.email}`, subscription: `${user.subscription}`, verificationToken: `${user.verificationToken}`}  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  res
    .status(200)
    .json({
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
    res
      .status(200)
      .json({
        email: `${user.email}`, data: {
        message: "Verification successful"
      } });
}
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
  res.status(200).json({ status: "success", message: "Verification successful" });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  verifyUserController,
};
