/**
 * Created by web前端 on 2017/12/7.
 */
let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let UploadData = require('../modules/uploadDatas');
let fs = require('fs');
router.post('/',(req,res,next)=>{
    let group = req.body.group;
    UploadData.find({group:group},(err,queryResult)=>{
        if(err){
            res.json({
                result:false,
                msg:"查询失败"
            })
        }else{

            queryResult[0].picList.forEach((item)=>{
                fs.unlinkSync(`F:/Project/vue/vue_uploader/my-server/public/images/${item.newName}`);
            });
            UploadData.remove({group:group},(err,result)=>{
                if(err){
                    res.json({
                        result:false,
                        msg:"删除失败"
                    })
                }else{
                    UploadData.find({},(err,queryResult)=>{
                        if(err){
                            res.json({
                                result:false,
                                msg:"查询失败"
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

                }
            });
        }
    })
});
module.exports = router;
