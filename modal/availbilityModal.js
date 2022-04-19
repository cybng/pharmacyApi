const mongoose = require("mongoose");
const availbilitySchema = new mongoose.Schema({
      product:{type:Array},
      status:{
      	type:String
      }, 
      // createdBy:{
      // 	type:mongoose.Schema.Types.ObjectId,
      // 	ref:"User",
      // 	required:true
      // }

},{timestamps:true});

module.exports = mongoose.model("availbility",availbilitySchema);
