/**
 * Created by web前端 on 2017/12/5.
 */
let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let UploadData = require('../modules/uploadDatas');
router.get('/',(req,res,next)=>{
    UploadData.find({},(err,queryResult)=>{

        if(err){
            res.json({
                result:false,
                msg:err.message
            })
        }else{
            let menuData = [];
            queryResult.forEach((item)=>{
                menuData.push(item)
            });
            res.json({
                result:true,
                data:menuData
            })
        }
    })
});
module.exports = router;
