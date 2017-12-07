/**
 * Created by web前端 on 2017/12/7.
 */
let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let UploadData = require('../modules/uploadDatas');
let fs = require('fs');
router.get('/',(req,res,next)=>{
    let group = req.param('mark');
    let id = req.param('id');
    console.log(group);
    console.log(id);
    if(group === "all") {
        UploadData.find({}, (err, queryResult) => {
            if (err) {
                res.json({
                    result: false,
                    mgs: '发生错误了'
                })
            } else {
                let allPic = [];
                queryResult.forEach((item) => {
                    allPic = allPic.concat(item.picList)
                });
                allPic.forEach((item,index)=>{
                    if(item.id === id){
                        fs.unlinkSync(`F:/Project/vue/vue_uploader/my-server/public/images/${item.newName}`);
                        allPic.splice(index,1)
                    }
                });

                res.json({
                    result: true,
                    data: allPic
                });
                queryResult.save((err,saveResult)=>{
                    if(err){
                        res.json({
                            result:false,
                            msg:'删除错误'
                        })
                    }else{
                        res.json({
                            result: true,
                            data: queryResult.picList
                        })

                    }
                });


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
                queryResult.picList.forEach((item,index)=>{
                    if(item.id === id){
                        fs.unlinkSync(`F:/Project/vue/vue_uploader/my-server/public/images/${item.newName}`);
                        queryResult.picList.splice(index,1)

                    }
                });
                queryResult.save((err,saveResult)=>{
                    if(err){
                        res.json({
                            result:false,
                            msg:'删除错误'
                        })
                    }else{
                        res.json({
                            result: true,
                            data: queryResult.picList
                        })

                    }
                });

            }
        })

    }
});
module.exports = router;
