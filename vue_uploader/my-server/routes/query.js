/**
 * Created by web前端 on 2017/12/4.
 */
let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let UploadData = require('../modules/uploadDatas');
router.get('/',(req,res,next)=>{
    let group = req.query.mark;
    //如果传过来是all，那么查询所有分组
    if(group === "all"){
        UploadData.find({},(err,queryResult)=>{
            if(err){
                res.json({
                    result:false,
                    mgs:err.message
                })
            }else{

                let allPic = [];
                queryResult.forEach((item)=>{
                    allPic = allPic.concat(item.picList)
                });

                res.json({
                    result:true,
                    data:allPic
                })

            }
        })
    }else{

        UploadData.findOne({group:group},(err,queryResult)=>{
            if(err){

                res.json({
                    result:false,
                    msg:err.message
                })
            }else{

                if(queryResult.picList.length !==0){
                    res.json({
                        result:true,
                        data:queryResult.picList
                    })

                }else{
                    res.json({
                        result:false,
                        msg:'暂无图片'
                    })
                }
            }
        })

    }
});
module.exports = router;
