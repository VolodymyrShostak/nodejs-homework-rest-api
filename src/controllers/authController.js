const { regisrtation, login, logout } = require("../services/authService");

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

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
