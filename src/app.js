const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/api/contacts");
require("dotenv").config();


const app = express();
 
mongoose.set("strictQuery", true);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.vda0eke.mongodb.net/db-contacts?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connection successful")
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
    
  });



const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ status: "failure", code: 404, message: "Not found" });
});


app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
