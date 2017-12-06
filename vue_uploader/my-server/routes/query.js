/**
 * Created by web前端 on 2017/12/4.
 */
let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let UploadData = require('../modules/uploadDatas');
router.get('/',(req,res,next)=>{
    let group = req.query.mark;
    let pageNum = Number(req.query.pageNum);
    let pageSize =Number(req.query.pageSize);

    console.log(`当前页${pageNum}`)
    console.log(`每页多少条${pageSize}`)
    //如果传过来是all，那么查询所有分组
    if(group === "all"){
        let dataResult=null;
        let total = null
/*        Promise.all([
            dataResult = UploadData.find({}).skip(pageNum).limit(pageSize),
            UploadData.find({},(err,doc)=>{
                total = doc.length
            })
        ]).then(()=>{
            dataResult.exec((err,queryResult)=>{
                if(err){
                    res.json({
                        result:false,
                        msg:err.message
                    })
                }else{
                    res.json({
                        result:true,
                        data:queryResult,
                        total:total
                    })


                    //console.log(queryResult)
                }
            })

        })*/

        UploadData.find({},(err,queryResult)=>{
            console.log('123')
            if(err){
                console.log('456')
                res.json({
                    result:false,
                    mgs:err.message
                })
            }else{
                console.log('789')
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
    }else{
/*        let dataResult = UploadData.find({group:group}).skip(pageNum).limit(pageSize);
        dataResult.exec((err,queryResult)=>{
            if(err){
                res.json({
                    result:false,
                    msg:"查询失败"
                })
            }else{
                res.json({
                    result:true,
                    data:queryResult
                })
            }
        })*/
        UploadData.findOne({group:group},(err,queryResult)=>{
            console.log(88888);
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
        })

    }
});
module.exports = router;
