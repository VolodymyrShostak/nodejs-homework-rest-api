const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload=multer({dest:'public/avatars/'});

// const path = require("path");

// const FILE_DIR = path.join(__dirname, "../../", "public/avatars");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, FILE_DIR);
//   },
//   filename: function (req, file, cb) {
//     const [filename, extension] = file.originalname.split(".");
//     cb(null, `${filename}.${extension}`);
//   },
// });
// const { asyncWrapper } = require("../../helpers/apiHelpers");
// const { avatarController } = require("../../controllers/avatarsController");
// const uploadMiddleware = multer({ storage });

router
  .post(
    "/", upload.single('avatar'), (req, res) => {
      res.json({ file: req.file });
    }
   
  )
  // .use("/download", express.static(FILE_DIR));

module.exports = router;
