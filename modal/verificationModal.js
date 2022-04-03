const mongoose = require("mongoose");
const verificationSchema = new mongoose.Schema({
	userId:{
		type:mongoose.Schema.Types.ObjectId,
		required:true,
		default:null,
		trim:true
	},
	companyName:{
		type:String,
		trim:true, 
		default:null
	},
	mobileNumber:{
		type:String,
		trim:true, 
		default:null
	},
	gstNumber:{
		type:String,
		trim:true, 
		default:null
	}, 
	paymentTerm:{
		type:String,
		trim:true, 
		default:null
	},
	address:Array,
	status:{
		type:String,
		trim:true, 
		default:"0"
	}
},{timestamps:true});

module.exports = mongoose.model("verification",verificationSchema);