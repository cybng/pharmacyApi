const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const env = require("dotenv"); 
const userAuthRouter = require("./router/Auth");

env.config();
app.use(express.json()) ;
app.use(cors());
app.use("/api",userAuthRouter);



app.listen(process.env.PORT,()=>{
	console.log(`Server connected...${process.env.port}`);
})
mongoose.connect('mongodb://localhost:27017/phrmacy').then(c=>{
	console.log("Database connected ...")
});
