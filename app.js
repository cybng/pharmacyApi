const express = require("express");
const http = require('http');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const env = require("dotenv"); 
const userAuthRouter = require("./router/Auth");
const categoryRouter = require("./router/categoryRouter");

env.config();
app.use(express.json()) ;
app.use(cors());
app.use("/api",userAuthRouter);
app.use("/api",categoryRouter);


const requestListener = function (req, res) {};

const server = http.createServer(app);
server.listen(process.env.port, process.env.host, () => {
    console.log(`Server is running on http://${process.env.host}:${process.env.port}`);
});



mongoose.connect('mongodb://localhost:27017/phrmacy').then(c=>{
	console.log("Database connected ...")
});
