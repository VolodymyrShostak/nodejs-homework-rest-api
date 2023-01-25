const express = require("express");
const router = express.Router();
const {
  listContactsControler,
  getByIdControler,
  removeContactControler,
  addContactControler,
  updateContactControler,
  updateStatusContactControler,
} = require("../../controllers/contControllers");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  updateContactValidation,
  addContactValidation,
} = require("../../middlewares/validationMiddleware");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {isValidId}= require("../../middlewares/isValidId");

router.use(authMiddleware);

router
  .get("/", asyncWrapper(listContactsControler))
  .get("/:id", isValidId, asyncWrapper(getByIdControler))
  .post("/", addContactValidation, asyncWrapper(addContactControler))
  .delete("/:id", isValidId, asyncWrapper(removeContactControler))
  .put(
    "/:id",
    isValidId,
    updateContactValidation,
    asyncWrapper(updateContactControler)
  )
  .patch(
    "/:id",
    isValidId,
    updateContactValidation,
    asyncWrapper(updateStatusContactControler)
  );

module.exports = router;
