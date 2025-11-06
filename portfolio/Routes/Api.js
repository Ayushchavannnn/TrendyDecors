const router=require('express').Router();
const model=require('../Db/Models/Uploads')
router.get('/',async(req,res,next)=>{
var all=await model.find()
res.json(all);
})
module.exports=router