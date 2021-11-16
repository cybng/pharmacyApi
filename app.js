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



// app.listen(process.env.PORT,()=>{
// 	console.log(`Server connected...${process.env.port}`);
// })



const hostname = '217.21.78.65';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('APi Working...\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


mongoose.connect('mongodb://localhost:27017/phrmacy').then(c=>{
	console.log("Database connected ...")
});
