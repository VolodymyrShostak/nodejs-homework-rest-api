const { regisrtation, login } = require("../services/authService");


const registrationController = async(req, res) => {
    const { email, password } = req.body;
    await regisrtation(email, password);
    res.status(201).json({ status: "success",  message: "Success" });
 }
const loginController = async(req, res) => { 
     const { email, password } = req.body;
    const token =  await login(email, password);
    res.status(200).json({ status: "success", token, message: "Success" });
}

module.exports = {
    registrationController,
    loginController,
}