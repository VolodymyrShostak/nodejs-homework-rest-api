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

router
  .get("/", asyncWrapper(listContactsControler))
  .get("/:id", asyncWrapper(getByIdControler))
  .post("/", addContactValidation, asyncWrapper(addContactControler))
  .delete("/:id", asyncWrapper(removeContactControler))
  .put("/:id", updateContactValidation, asyncWrapper(updateContactControler))
  .patch(
    "/:id",
    updateContactValidation,
    asyncWrapper(updateStatusContactControler)
  );

module.exports = router;
