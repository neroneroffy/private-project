/**
 * Created by web前端 on 2017/12/7.
 */
let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let UploadData = require('../modules/uploadDatas');
let Uuid = require('node-uuid');

router.post('/',(req,res,next)=>{
/*
    let newGroup = new UploadData;
    newGroup.name = req.body.groupName;
    newGroup.group = Uuid.v1();
*/
    console.log(req.body);
    UploadData.create({
        name:req.body.name,
        group:Uuid.v1(),
        picList:[]
    },(err,doc)=>{
        if(err){
            res.json({
                result:false,
                msg:"保存失败"
            })
        }else{
            UploadData.find({},(err,queryResult)=>{
                if(err) {
                    res.json({
                        result: false,
                        msg: "保存失败"
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
    })

/*    UploadData.find({},(err,queryResult)=>{

        if(err){
            res.json({
                result:false,
                msg:err.message
            })
        }else{
            let menuData = [];
            queryResult.forEach((item)=>{
                menuData.push({
                    name:item.name,
                    mark:item.group
                })
            });
            res.json({
                result:true,
                data:menuData
            })
        }
    })*/
});
module.exports = router;