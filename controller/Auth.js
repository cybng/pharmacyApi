const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modal/userModal");
const {responseError,responseSuccess} = require("../helper/Status");



exports.login = (req,res) =>{
     const {email,password} = req.body;
     User.findOne({email:email})
         .exec(async(err,data)=>{
         	if(err){
         		return responseError(res,201,4);
         	}
         	if(data){
         		const checkPassword = await data.authenticate(password);
         		if(checkPassword && (data.role==="user" || data.role==="admin")){
         			const token = jwt.sign({_id:data._id,role:data.role},process.env.port,{expiresIn:"1d"})
    			    res.cookie("token",token,{expiresIn:"1d"})
                    const {_id,fname,lname,email,username,role,fullname} = data;
    			    const userDetail = {token,user:{_id,fname,lname,email,username,role}};
    			    return responseSuccess(res,200,userDetail);
         		}
         	}else{
               return responseError(res,201,10);
         	}
         })
}

exports.reg=(req,res)=>{

    const {fname,lname,email,username,password} = req.body;
    User.findOne({email:email}).exec(async(err,data)=>{
    	if(err){
    		return responseError(res,201,4);
    	}
    	if(data){
    		return responseError(res,201,14);
    	}
    	const hashPassword =  await bcrypt.hash(password,10);
    	const userData =new User({
    		fname,lname,email,username,hashPassword
    	});

    	userData.save((err,data)=>{
    		if(err){
    			return responseError(res,201,4);
    		}
    		if(data){
    			const token = jwt.sign({_id:data._id,role:data.role},process.env.port,{expiresIn:"1d"})
    			res.cookie("token",token,{expiresIn:"1d"})
                const {_id,fname,lname,email,username,role,fullname} = data;
    			const userDetail = {token,user:{_id,fname,lname,email,username,role}};
    			return responseSuccess(res,200,userDetail);
    		}
    	})

    })
}
