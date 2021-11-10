const express = require("express");
const router = express.Router();
const {addcategory,getcategory} = require("../controller/category");
router.post("/addcategory",addcategory)
router.get("/getcategory",getcategory)

module.exports = router;