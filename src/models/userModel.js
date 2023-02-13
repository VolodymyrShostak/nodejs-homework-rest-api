const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const User = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  avatarURL: String,
  token: String,
  verificationToken: {
    type: String,
    require: [true, "Verify token is required"],
  },
  verify: {
    type: Boolean,
    default: false,
  },
});
User.pre('save', async function () {
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    

})

module.exports = mongoose.model("User", User);
