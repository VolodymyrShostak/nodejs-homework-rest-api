const express = require("express");
const router = express.Router();
const {registrationController, loginController} = require("../../controllers/authController");
const { asyncWrapper } = require("../../helpers/apiHelpers");

router

  .post("/register", asyncWrapper(registrationController))
  .post("/login", asyncWrapper(loginController));

module.exports = router;
