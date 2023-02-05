const express = require("express");
const router = express.Router();
const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateAvatarController,
} = require("../../controllers/authController");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { autorisationsValidation } = require("../../middlewares/validationMiddleware");
const {authMiddleware} = require("../../middlewares/authMiddleware");

router

  .post(
    "/register",
    autorisationsValidation,
    asyncWrapper(registrationController)
  )
  .get("/login", autorisationsValidation, asyncWrapper(loginController))
  .post("/logout", authMiddleware, asyncWrapper(logoutController))
  .get("/current", authMiddleware, asyncWrapper(getCurrentUserController))
  .putch("/avatars", authMiddleware, asyncWrapper(updateAvatarController));
  

module.exports = router;
