const express = require("express");
const router = express.Router();
const path = "../controller"; 
const shortid = require("shortid");
const {getCsvProduct,approval,multiApproved,getApprovedCsvProduct,bit,getProductDetail} = require(`${path}/AdminController`);

router.post("/getCsvProduct",getCsvProduct);
router.post("/approval",approval);
router.post("/getApprovedCsvProduct",getApprovedCsvProduct);
router.post("/multiApproved",multiApproved);
router.post("/bit",bit);
router.post("/getProductDetail",getProductDetail);

module.exports = router;