const { regisrtation, login, logout, getCurrentUser } = require("../services/authService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  await regisrtation(email, password);
  res.status(201).json({ status: "success", message: "Success" });
};
const loginController = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  res.status(200).json({ status: "success", token, message: "Success" });
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
      .json({ email: `${user.email}`, subscription:`${user.subscription}` });
}

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
};