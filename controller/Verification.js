var mongoose = require('mongoose');
const User = require("../modal/userModal");
const Verification = require("../modal/verificationModal");
const jwt = require("jsonwebtoken");
const {responseError,responseSuccess} = require("../helper/Status");
exports.general=(req,res)=>{
    const cryptId = mongoose.Types.ObjectId(req.body.userId);
    // console.log(req.body)
    const {companyName,mobileNumber,gstNumber,paymentTerm,address,city,country,state,zip} = req.body;
    const updateContent = { 
        companyName : companyName,
        mobileNumber : mobileNumber,
        gstNumber : gstNumber,
        paymentTerm : paymentTerm,
        address : [address,city,country,state,zip],
        status :"1"
    }
Verification.findOneAndUpdate({userId:cryptId},{$set:updateContent}).exec(async(err,data)=>{
    	
    	if(err){
    		return responseError(res,201,14);
    	} 
         if(data){
             User.findOneAndUpdate({_id:cryptId},{$set:{generalVerification:"1"}}).exec((upErr,upData)=>{
                if(upErr){
                    return responseError(res,201,4);
                }

             if(upData){
             var agentJoin=User.aggregate([
                   {
                     $lookup: {
                       from: "verifications",
                       localField: "_id",
                       foreignField: "userId",
                       as: "other",
                      },
                    },
                    { $project: { hashPassword: false,otp:false} },
                    {$unwind: "$other"},
                    ]); 
         
        agentJoin.exec((joinErr,joinData)=>{
        if(joinErr){
            return responseError(res,201,4);
        }
        if(joinData){
            // after joining two table geting single user Data...
            const values = Object.values(joinData);
            let foundUser = null;
            for (let i = 0; i < values.length; i++) {
            if (values[i]._id.equals(cryptId)) {
            foundUser = values[i];
            break;
            }
          }
          console.log({"_id":foundUser._id,"role":foundUser.role});
                const token = jwt.sign({_id:foundUser._id,role:foundUser.role},process.env.port,{expiresIn:"1d"})
                res.cookie("token",token,{expiresIn:"1d"})
                const {_id,fname,lname,email,username,role,fullname,generalVerification,otpVerification} = foundUser;
                const userDetail = {token,user:{_id,fname,lname,email,username,role,generalVerification,otpVerification}}; 
                return responseSuccess(res,200,userDetail);

            return responseSuccess(res,200,foundUser);
        }

     })     
 }
             });
             
    }
    	 

    });




}