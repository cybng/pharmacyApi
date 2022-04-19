const express = require("express");
const router = express.Router();
const path = "../controller";
const multer  = require('multer')
const picPath = require("path");
const shortid = require("shortid");
const {sellerFile,addProduct} = require(`${path}/Seller`);
const {general} = require(`${path}/Verification`);

 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, picPath.join(picPath.dirname(__dirname), "sellerUploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

 router.post("/sellerFile",upload.single('csvFile'),sellerFile);
 router.post("/addProduct",addProduct);
module.exports = router;