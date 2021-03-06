var mongoose  =  require('mongoose');  
   
var sellerCsvProduct = new mongoose.Schema({ 
uploadBy:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    default:null,
    trim:true
},
    SKU_CODE:{
    type:String,
    required:true,
},
CHEMICAL_NAME:{
    type:String,
    required:true,
},
STRUCTURE:{
    type:String,
    required:true,
},
PURITY:{
    type:String,
    required:true,
},
CATEGORY:{
    type:String,
    required:true,
},
DATE_OF_MANUFACTURE:{
    type:String,
    required:true,
},
DATE_OF_EXPIRY:{
    type:String,
    required:true,
},
STATE_TYPE_COLOR:{
    type:String,
    required:true,
}    ,
DOCUMENTS:{
    type:String,
    required:true,
},
DESCRIPTION:{
    type:String,
    required:true,
},
QUANTITY:{
    type:String,
    required:true,
},
UNITS:{
    type:String,
    required:true,
},
STOCK:{
    type:String,
    required:true,
},
RATE:{
    type:String,
    required:true,
},
GST:{
    type:String,
    required:true,
},
status:{
    type:String,
    required:true,
    trim:true
},
requestId:{
    type:String,
    required:true,
    trim:true
}
});  
module.exports = mongoose.model('sellerCsv',sellerCsvProduct); 