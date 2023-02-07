const multer = require("multer");
const path = require("path");

const directory = path.resolve("./tmp");

const storage = multer.diskStorage({
  destination: ( req, file, cb) => {
    cb(null, directory);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },

  limits: {
    fileSize: 5000,
  },
});

const avatarMiddleware = multer({
  storage: storage,
});

module.exports = { avatarMiddleware };
