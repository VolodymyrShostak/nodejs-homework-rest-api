const express = require("express");
const router = express.Router();
const {
  listContactsControler,
  getByIdControler,
  removeContactControler,
  addContactControler,
  updateContactControler,
  updateStatusContactControler,
} = require("../../controllers/cont.controllers");
const {
  updateContactValidation,
  addContactValidation,
} = require("../../middlewares/validationMiddleware");



router
  .get("/", listContactsControler)
  .get("/:id", getByIdControler)
  .post("/", addContactValidation, addContactControler)
  .delete("/:id", removeContactControler)
  .put("/:id", updateContactValidation, updateContactControler)
  .patch("/:id", updateContactValidation, updateStatusContactControler);

module.exports = router;
