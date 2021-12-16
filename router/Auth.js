const express = require("express");
const router = express.Router();
const path = "../controller";
const {login,reg,otpVerification} = require(`${path}/Auth`);
const {general} = require(`${path}/Verification`);

 router.post("/login",login);
 router.post("/reg",reg);
 router.post("/otpVerification",otpVerification);

 router.post("/general",general)

module.exports = router;