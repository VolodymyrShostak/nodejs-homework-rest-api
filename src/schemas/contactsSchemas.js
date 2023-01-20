const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.number().integer().required().required(),
  favorite: Joi.boolean(),
  owner: {
    // type: SchemaTypes.ObjectId,
    ref: "user",
  },
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().trim(),
  favorite: Joi.boolean(),
  owner: {
    // type: SchemaTypes.ObjectId,
    ref: "user",
  },
}).or("name", "email", "phone", "favorite", "owner");
  
module.exports = { addSchema, updateSchema };
