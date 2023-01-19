const Contact = require("../models/contact");

const listContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findById(id);
  if (!contact) {
    return res.status(404).json({
      status: "failure",
      message: ` Contact with id '${id}' not found`,
    });
  }
  res.status(200).json({ contact, status: "success" });
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const newContact = await Contact.create({ name, email, phone });
  res
    .status(201)
    .json({ newContact, status: "success", message: "Contact added" });
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) {
    return res.status(404).json({
      status: "failure",
      message: `Contact with id '${id}' not found`,
    });
  }
  res.status(200).json({ status: "success", message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  
  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!contact) {
    return res.status(404).json({
      status: "failure",
      message: `Contact with id '${id}' not found`,
    });
  }
  contact.name = req.body.name;
  contact.email = req.body.email;
  contact.phone = req.body.phone;
  contact.favorite = req.body.favorite;

  res
    .status(200)
    .json({ contact, status: "success", message: "Contact updated" });
};
const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  
  const contact = await Contact.findByIdAndUpdate(id, req.body);
  if (!contact) {
    return res.status(404).json({
      status: "failure",
      message: `Contact with id '${id}' not found`,
    });
  }
  contact.favorite = req.body.favorite;
  res
    .status(200)
    .json({ contact, status: "success", message: "Contact updated" });
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
