const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../services/contService");

const listContactsControler = async (req, res) => {
  const { id } = req.user;
  const contacts = await getContacts(id);
  res.status(200).json(contacts);
};

const getByIdControler = async (req, res) => {
 
  const { id } = req.params;
 
  const contact = await getContactById(id);
  if (!contact) {
    return res.status(404).json({
      status: "failure",
      message: ` Contact with id '${id}' not found`,
    });
  }
  res.status(200).json({ contact, status: "success" });
};

const addContactControler = async (req, res) => {
  const { name, email, phone } = req.body;
  const { id } = req.user;
  const newContact = await addContact({ name, email, phone }, id);

  res
    .status(201)
    .json({ newContact, status: "success", message: "Contact added" });
};

const removeContactControler = async (req, res) => {
  const { id } = req.params;
  
  const contact = await removeContact(id);
  if (!contact) {
    return res.status(404).json({
      status: "failure",
      message: `Contact with id '${id}' not found`,
    });
  }
  res.status(200).json({ status: "success", message: "Contact deleted" });
};

const updateContactControler = async (req, res) => {

  const { id } = req.params;
  const body = req.body;
  const contact = await updateContact(id, body);
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
const updateStatusContactControler = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const contact = await updateStatusContact(id, body);
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
  listContactsControler,
  getByIdControler,
  removeContactControler,
  addContactControler,
  updateContactControler,
  updateStatusContactControler,
};
