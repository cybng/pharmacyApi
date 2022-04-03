const express = require("express");
const router = express.Router();
const path = "../controller";
const {login,reg,otpVerification,logout} = require(`${path}/Auth`);
const {general} = require(`${path}/Verification`);

 router.post("/login",login);
 router.post("/reg",reg);
 router.post("/otpVerification",otpVerification);

 router.post("/general",general);
 router.post("/logout",logout);

module.exports = router;