const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/authRouter");


const app = express();
 
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

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
    return res.status(400).json({ status: "failure", message: "Duplicate key error" });
  }
  if (err) {
    return res.status(500).json({ status: "failure", message: err.message });
  }
  res.status(404).json({ status: "failure", message: "Endpoint not found" });
});




module.exports = app;
