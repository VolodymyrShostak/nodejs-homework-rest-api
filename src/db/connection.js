const mongoose = require("mongoose");
require("dotenv").config();



const connectMongoDB = async () => {
  mongoose.set("strictQuery", true);
  return mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.vda0eke.mongodb.net/db-contacts?retryWrites=true&w=majority`
  );
};

module.exports = { connectMongoDB };
