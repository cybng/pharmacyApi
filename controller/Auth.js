var mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modal/userModal");
const Verification = require("../modal/verificationModal");
const {responseError,responseSuccess} = require("../helper/Status");


exports.login = (req,res) =>{
     const {email,password} = req.body;
     console.log(req.body);
     User.findOne({email:email})
         .exec(async(err,data)=>{

         	if(err){
         		return responseError(res,201,4);
         	}
         	if(data){
         		const checkPassword = await data.authenticate(password);
         		if(checkPassword && (data.role==="Buyer" || data.role==="Admin" || data.role==="Seller")){
         			const token = jwt.sign({_id:data._id,role:data.role},process.env.port,{expiresIn:"1d"})
    			    res.cookie("token",token,{expiresIn:"1d"})
                    const {_id,fname,lname,email,username,role,fullname,generalVerification,otpVerification} = data;
    			    const userDetail = {token,user:{_id,fname,lname,email,username,role,generalVerification,otpVerification}};
    			    return responseSuccess(res,200,userDetail);
         		}
         	}else{
               return responseError(res,201,10);
         	}
         })
}

exports.reg=(req,res)=>{  
    const {fname,lname,email,username,typeOfTrade,cpassword} = req.body;
 
    User.findOne({email:email}).exec(async(err,data)=>{
    	
    	if(data){
    		return responseError(res,201,14);
    	}
    	const hashPassword =  await bcrypt.hash(cpassword,10);
        const role = typeOfTrade;
        const otp = Math.floor(100000+Math.random()*900000);
    	const userData =new User({
    		fname,lname,email,hashPassword,role,otp
    	});
        
    	userData.save((err,dt)=>{
            
    		if(err){
                console.log(err);
    			return responseError(res,201,4);
    		}
    		if(dt){    
                const verificationStatus = new Verification({
                    userId:dt._id,
                    companyName:null,
                    mobileNumber:null,
                    gstNumber:null,
                    paymentTerm:null,
                    address:null,
                }).save(); 			
                const token = jwt.sign({_id:dt._id,role:dt.role},process.env.port,{expiresIn:"1d"})
    			res.cookie("token",token,{expiresIn:"1d"})
                const {_id,fname,lname,email,username,role,fullname,generalVerification,otpVerification} = dt;
    			const userDetail = {token,user:{_id,fname,lname,email,username,role,generalVerification,otpVerification}}; 
    			return responseSuccess(res,200,userDetail);
    		}
    	})

    })
}

exports.otpVerification=(req,res)=>{ 
    var {userId,otpValue} = req.body;
    User.findOne({_id:userId})
    .exec((err,data)=>{
          if(err){
                console.log(err);
                return responseError(res,201,4);
            } 
           if(data.otp===otpValue){
            User.findOneAndUpdate({_id:data._id},{$set:{otpVerification:"1"}}).exec();
                 

                var cryptId = mongoose.Types.ObjectId(userId);
                console.log(cryptId);
                User.findOne({$and:[{_id:cryptId,otpVerification:"1"}]}).exec((errOtp,getOtp)=>{
                 console.log({"all OTP Data":getOtp})   

                 const token = jwt.sign({_id:getOtp._id,role:getOtp.role},process.env.port,{expiresIn:"1d"})
                res.cookie("token",token,{expiresIn:"1d"})
                const {_id,fname,lname,email,username,role,fullname,generalVerification,otpVerification} = getOtp;
                const userDetail = {token,user:{_id,fname,lname,email,username,role,generalVerification,otpVerification}}; 
                return responseSuccess(res,200,userDetail);
                });
           
            }else{
                return responseError(res,201,12);
            }
    });
}

exports.logout=(req,res)=>{
    res.clearCookie("token");
    return res.status(200).json({msg:"Logout Successfully..."});
}


