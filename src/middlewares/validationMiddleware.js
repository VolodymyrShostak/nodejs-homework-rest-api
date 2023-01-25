const { addSchema, updateSchema } = require("../schemas/contactsSchemas");
const { authSchema } = require("../schemas/usersSchemas");

module.exports = {
  addContactValidation: (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .json({
          message: "Contact fields are not filled. All fields are required",
        });
    }
    if (req.body.favorite === undefined) {
      req.body.favorite = false;
    };
    const { error } = addSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: "error", code: 400, message: error.message });
    }
    next();
  },
  updateContactValidation: (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        message: "Missing fields for update",
      });
    }
    if (req.body.favorite === undefined) {
      req.body.favorite = false;
    };
    const { error } = updateSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: "error", code: 400, message: error.message });
    }
    next();
  },
  autorisationsValidation: (req, res, next) => { 
     if (!Object.keys(req.body).length) {
       return res.status(400).json({
         message: "User fields are not filled. All fields are required",
       });
    }
     const { error } = authSchema.validate(req.body);
    if (error) {
       console.log(error);
       return res
         .status(400)
         .json({ status: "error", code: 400, message: error.message });
     }
     next();
  }

};
