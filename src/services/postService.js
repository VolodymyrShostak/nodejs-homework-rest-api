const Contact = require("../models/contact");

const getContacts = async() => {
    const contacts = await Contact.find({});
    return contacts;
};
const getContactById = async(id) => {
    const contact = await Contact.findById(id);
    
    return contact;
};
const addContact = async ({ name, email, phone }) => {
  const newContact = await Contact.create({ name, email, phone });
  return newContact;
};
const removeContact = async(id) => {
    const contact = await Contact.findByIdAndDelete(id);
    return contact;
};
const updateContact = async(id, body,) => {
     const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
    return contact;
};
const updateStatusContact = async(id, body) => {
    const contact = await Contact.findByIdAndUpdate(id, body);
    return contact; 
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
