/**
 * Created by web前端 on 2017/12/4.
 */
let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let UploadData = require('../modules/uploadDatas');
router.get('/',(req,res,next)=>{
    let group = req.query.mark;
/*    let pageNum = Number(req.query.pageNum);
    let pageSize =Number(req.query.pageSize);*/
    //如果传过来是all，那么查询所有分组
    console.log(group);
    if(group === "all"){
        UploadData.find({},(err,queryResult)=>{
            if(err){
                res.json({
                    result:false,
                    mgs:'发生错误了'
                })
            }else{
                let allPic = [];
                queryResult.forEach((item)=>{
                    if(item.group !=='default'){
                        allPic = allPic.concat(item.picList)
                    }
                });
                //allPic.concat(queryResult[1].picList)

                    res.json({
                        result:true,
                        data:allPic.concat(queryResult[1].picList)
                    })

            }
        })
/*
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
                if(allPic.length === 0){
                    res.json({
                        result:false,
                        msg:'暂无图片'
                    })
                }else{
                    console.log('333')
                    let start = (pageNum-1)*pageSize;
                    let end = pageNum*pageSize;
                    let paginationData = [];
                    if(allPic.length<end){
                        paginationData = allPic.slice(start);
                    }else{
                        paginationData = allPic.slice(start,end);
                    }

                    console.log(`起始位置${start}`)
                    console.log(`终止${end}`)
                    console.log(paginationData);
                    res.json({
                        result:true,
                        data:paginationData,
                        total:allPic.length
                    })

                }

            }
        })
*/
    }else if(group === "new"){
        return
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
                        data:queryResult.picList,
                    })
                }else{
                    res.json({
                        result:false,
                        msg:'暂无图片'
                    })
                }
            }
        })
/*        UploadData.findOne({group:group},(err,queryResult)=>{
            if(err){

                res.json({
                    result:false,
                    msg:err.message
                })
            }else{

                if(queryResult.picList.length !==0){
                    console.log('333')
                    let start = (pageNum-1)*pageSize;
                    let end = pageNum*pageSize;
                    let paginationData = [];
                    if(queryResult.picList.length<end){
                        paginationData = queryResult.picList.slice(start);
                    }else{
                        paginationData = queryResult.picList.slice(start,end);
                    }

                    console.log(`起始位置${start}`)
                    console.log(`终止${end}`)
                    console.log(paginationData);
                    res.json({
                        result:true,
                        data:paginationData,
                        total:queryResult.picList.length
                    })


                }else{
                    res.json({
                        result:false,
                        msg:'暂无图片'
                    })
                }
            }
        })*/

    }
});
module.exports = router;
