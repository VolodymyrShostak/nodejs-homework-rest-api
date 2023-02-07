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
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { avatarMiddleware } = require("../../middlewares/avatarsMiddleware");

router

  .post(
    "/register",
    autorisationsValidation,
    asyncWrapper(registrationController)
  )
  .get("/login", autorisationsValidation, asyncWrapper(loginController))
  .post("/logout", authMiddleware, asyncWrapper(logoutController))
  .get("/current", authMiddleware, asyncWrapper(getCurrentUserController))
  .patch(
    "/avatars",
    authMiddleware,
    avatarMiddleware.single("avatar"),
    asyncWrapper(updateAvatarController)
  );
  

module.exports = router;
