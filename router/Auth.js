const express = require("express");
const router = express.Router();
const path = "../controller";
const {login,reg} = require(`${path}/Auth`);

 router.post("/login",login);
 router.post("/reg",reg);

module.exports = router;