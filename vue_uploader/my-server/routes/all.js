/**
 * Created by web前端 on 2017/12/4.
 */
let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let Upload = require('../modules/uploads');
router.get('/',(req,res,next)=>{
    Upload.find({},(err,doc)=>{
        if(err){
            res.json({
                result:false,
                msg:err.message
            })
        }else{
            res.json({
                result:true,
                data:doc
            })
        }
    })
});
module.exports = router;