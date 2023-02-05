const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs/promises");



const upload = multer();

router
  .post(
    "/", upload.single('avatar'), async (req, res) => {
      const fileName ='avatar - '+ Date.now() ;
      const fileType= req.file.mimetype.split('/')[1];
      await fs.writeFile(`./public/avatars/${fileName}.${fileType}`, req.file.buffer);
      res.send('ok');
    }
   
  )
  

module.exports = router;
