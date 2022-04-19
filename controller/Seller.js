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

exports.addProduct=(req,res)=>{
    const status = "pending";
    const {uploadBy,SKU_CODE,
                   CHEMICAL_NAME,
                   STRUCTURE,
                   PURITY,
                   CATEGORY,
                   DATE_OF_MANUFACTURE,
                   DATE_OF_EXPIRY,
                   STATE_TYPE_COLOR,
                   DOCUMENTS,
                   DESCRIPTION,
                   QUANTITY,
                   UNITS,
                   STOCK,
                   RATE,
                   GST, 
                   requestId} = req.body;
    const uploadId=mongoose.Types.ObjectId(uploadBy);
    const bodyData = SellerProductModel({
        uploadBy:uploadId,SKU_CODE,
                   CHEMICAL_NAME,
                   STRUCTURE,
                   PURITY,
                   CATEGORY,
                   DATE_OF_MANUFACTURE,
                   DATE_OF_EXPIRY,
                   STATE_TYPE_COLOR,
                   DOCUMENTS,
                   DESCRIPTION,
                   QUANTITY,
                   UNITS,
                   STOCK,
                   RATE,
                   GST,
                   status,
                   requestId
    })
    bodyData.save((err,data)=>{
        console.log(err);
        console.log(data);
        if(err){
            return res.status(201).json({"msg":"Something went wrong"})
        }
        if(data){
            return res.status(200).json(data);
        }
    })
}
