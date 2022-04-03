var mongoose = require('mongoose');  
const csv = require("csvtojson");
const shortid = require("shortid");
const SellerProductModel = require("../modal/sellerProductModel");
const Verification = require("../modal/verificationModal");
const {responseError,responseSuccess} = require("../helper/Status");

exports.sellerFile=(req,res)=>{
 
//convert csvfile to jsonArray     
const requestId = shortid.generate();
csv()  
.fromFile(req.file.path)  
.then((jsonObj)=>{   


 var uploadBy = {uploadBy:req.body.userId,status:"pending",requestId};
 var csvValue = jsonObj.map(o => Object.assign({}, uploadBy, o));
 console.log(csvValue);
SellerProductModel.insertMany(csvValue,(err,data)=>{  
if(err){  
console.log(err);  
}
return res.status(200).json(data)
}); 

});  
 
}
