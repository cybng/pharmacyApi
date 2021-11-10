const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({

  fname:{
  	type:String,
  	trim:true,
  	min:4,
  	max:20,
  	required:true
  },
  lname:{
  	type:String,
  	trim:true,
  	min:4,
  	max:20,
  	required:true
  },
  username:{
  	type:String,
  	trim:true,
  	min:4,
  	max:20,
    default:null
  },
  email:{
  	type:String,
  	trim:true,
  	min:4,
  	max:20,
  	required:true
  },
  hashPassword:{
  	type:String,
  	trim:true,
  	min:4,
  	max:20,
  	required:true
  },
  role:{
  	type:String,
  	trim:true,
  	min:4,
  	max:20,
  	enum:["user","seller","admin"],
  	default:null,
  	required:true
  },

},{timestamps:true})

userSchema.virtual("fullname").get(()=>{
return(`${this.fname} ${this.lname}`);
});

userSchema.methods = {
	authenticate : async function(password){
		 return await bcrypt.compare(password,this.hashPassword);
	}
}

module.exports = mongoose.model("user",userSchema);