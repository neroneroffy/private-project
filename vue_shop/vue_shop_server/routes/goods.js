/**
 * Created by web前端 on 2017/11/23.
 */

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Goods = require('../models/goods');
//链接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/vueshop');
mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected success")
});
mongoose.connection.on("error",()=>{
    console.log("MongoDB connected fail")
});
mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB connected disconnected")
});
//查询商品列表数据
router.get('/',(req,res,next)=>{
    let page = parseInt(req.param('page'));
    let pageSize = parseInt(req.param('pageSize'));
    let sort = req.param('sort');
    let skip = (page-1)*pageSize;
    //筛选价格区间
    let priceLevel = req.param('priceLevel');
    let priceGt = "",priceLte = "";
    let params = {};
    if(priceLevel !== "all"){
        switch (priceLevel){
            case '0':priceGt = 0;priceLte = 100;break;
            case '1':priceGt = 100;priceLte = 500;break;
            case '2':priceGt = 500;priceLte = 1000;break;
            case '3':priceGt = 1000;priceLte = 5000;break;
        }
        //db.col.find({likes : {$lt :200, $gt : 100}})
        params = {
            salePrice:{
                $gt:priceGt,
                $lte:priceLte
            }
        };

    }
    console.log(params)
    let goodsModal = Goods.find(params).skip(skip).limit(pageSize);//分页查询，跳过多少条

    goodsModal.sort({'salePrice':sort});
    goodsModal.exec((err,doc)=>{
        if(err){
            res.json({
                status:"1",
                msg:err.message
            })
        }else{

            res.json({
                status:"0",
                msg:"",
                result:{
                    count:doc.length,
                    list:doc
                }
            })
        }
    })

    //加入购物车
    router.post('/goods/addCart',(req,res,next)=>{
        let userId = '100000077';
        let User = require('../../modules/')
    })
})
module.exports = router;
