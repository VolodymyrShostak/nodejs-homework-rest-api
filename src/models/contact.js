
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Contact = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Contact", Contact);