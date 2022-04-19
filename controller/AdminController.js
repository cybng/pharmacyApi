var mongoose = require('mongoose');
const User = require("../modal/userModal");
const axios = require("axios")

const SellerProductModel = require("../modal/sellerProductModel");
const {responseError,responseSuccess} = require("../helper/Status");

exports.getCsvProduct=(req,res)=>{
	SellerProductModel.find({status:"pending"},(err,data)=>{
		if(err){
         	return responseError(res,201,4);
        }
        if(data){
         	return responseSuccess(res,200,data);
        } 
	}).limit(10)
}
exports.getApprovedCsvProduct=(req,res)=>{
	SellerProductModel.find({status:"approved"},(err,data)=>{
		if(err){
         	return responseError(res,201,4);
        }
        if(data){
         	return responseSuccess(res,200,data);
        } 
	}).limit(10)
}

exports.approval=(req,res)=>{
	console.log(req.body);
	SellerProductModel.findOneAndUpdate({_id:req.body.approvalId},{$set:{status:"approved"}})
	.exec((err,data)=>{
		if(err){
			return responseError(res,201,4);
		}
		if(data){
			return responseSuccess(res,200,data);
		}
	})
}

exports.multiApproved=(req,res)=>{
  // const totalKey = Object.assign({},req.body);
  // console.log(totalKey);
    for(var i=0; i<req.body.length;i++){

    	SellerProductModel.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.body[i])},{$set:{status:"approved"}}).exec();

    }
    return res.status(200).json({msg:"success"});
}

exports.bit=async(req,res)=>{
	const address = req.body.address;
	const key = req.body.key;



const headers = {
  'Accept':'application/json',
  'X-API-KEY':'qX4k76i4zw9KnKJBiNn77b7xxHsAeT'
};

const fullData=await axios.get('https://onchain.io/api/address/balance/BITCOIN/0110a2019d6a3a3dd75f96c4ff58c78c5a5a51ba27a238273afed1bd4bcabc6e',
{
  method: 'GET',

  headers: headers
}) 

return res.status(200).json(fullData);
}

exports.getProductDetail=(req,res)=>{
	 
	SellerProductModel.findOne({SKU_CODE:req.body.id},(err,data)=>{
		if(err){
         	return responseError(res,201,4);
        }
        if(data){
         	return responseSuccess(res,200,data);
        } 
	 })
}

exports.getAllProduct=(req,res)=>{
	SellerProductModel.find({},(err,data)=>{
		if(err){
			return responseError(res,201,4);
		}
		if(data){
			return responseSuccess(res,200,data);
		}
	})
}