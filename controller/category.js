const Category = require("../modal/categoryModal");
const slugify = require("slugify");
const shortid = require("shortid");
const {responseError,responseSuccess} = require("../helper/Status");


function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}


exports.addcategory=(req,res)=>{ 
     const categoryObject={
     	name:req.body.categoryName,
        slug: `${slugify(req.body.categoryName)}-${shortid.generate()}`,
        createdBy: "tst"
     }
     if(req.body.parentId){
        categoryObject.parentId = req.body.parentId;
     }
     const categoryData = new Category(categoryObject);
     // console.log(categoryData);
     categoryData.save((err,data)=>{
     	console.log(err);
     	if(err){
     		return responseError(res,201,4);
     	}
     	if(data){	
     		return responseSuccess(res,200,data);
     	}
     })
}

exports.getcategory = (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err){
       return responseError(res,201,4);
   }
    if (categories) {
      const categoryList = createCategories(categories);
      return responseSuccess(res,200,{categoryList});
    }
  });
};
