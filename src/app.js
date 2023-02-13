const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const contactsRouter = require("./routes/api/contactsRouter");
const usersRouter = require("./routes/api/authRouter");


const app = express();
 
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const pathFile = path.resolve("./src/public");

app.use(express.static(pathFile));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);


app.use((err, req, res, next) => {
  if (err?.error?.isJoi) {
    return res.status(400).json({
      status: "failure",
      message: err.error.toString
    });
  }
  if (err?.code === 11000) {
    return res.status(409).json({ status: "failure", message: "Duplicate key error" });
  }
  if (err) {
    return res.status(500).json({ status: "failure", message: err.message });
  }
  res.status(404).json({ status: "failure", message: "Endpoint not found" });
});




module.exports = app;

// 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