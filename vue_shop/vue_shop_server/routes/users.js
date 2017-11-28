var express = require('express');
var router = express.Router();
require('./../util/dateFormat');
let User = require('../models/user');
/* GET users listing. */
router.get('/', function(req,res,next) {
  res.send('respond with a resource');
});
//登录接口
router.post('/login',function(req,res,next){
  let param = {
      userName:req.body.userName,
      userPwd:req.body.userPwd
  };

  User.findOne(param,(err,doc)=>{
      console.log(err)
    if(err){
      res.json({
          status:"1",
          msg:err.message
      })
    }else{
      if(doc){
        res.cookie("userId",doc.userId,{
          path:"/",
          maxAge:1000*60*60
        });
        res.cookie("userName",doc.userName,{
          path:"/",
          maxAge:1000*60*60
        });
        //req.session.user = doc;
        res.json({
            status:"0",
            msg:"",
            result:{
              userName:doc.userName
            }
        })
      }else{
          res.json({
              status:"2"
          })

      }
    }
  })
});
//退出接口
router.post('/logout',(req,res,next)=>{
  res.cookie("userId","",{
          path:"/",
          maxAge:-1
      })
  res.json({
      status:"0",
      msg:"",
      result:""
  })
});
//校验登录
router.get('/checkLogin',(req,res,next)=>{
  if(req.cookies.userId){
    res.json({
        status:"0",
        msg:"",
        result:req.cookies.userName || ""
    })
  }else{
    res.json({
        status:"1",
        msg:"未登录",
        result:""
    })
  }
});
//查询当前用户的购物车数据
router.get('/cartList',(req,res,next)=>{
    let userId = req.cookies.userId;
    User.findOne({
        userId:userId
    },(err,doc)=>{
        if(err){
            res.json({
                status:"1",
                msg:err.message,
                result:""
            })
        }else{
            if(doc){
                doc.cartList;
                res.json({
                    status:"0",
                    msg:"",
                    result:doc.cartList
                })
            }
        }
    })
});
//删除用户购物车
router.post('/cartdel',(req,res,next)=>{
    let userId = req.cookies.userId, productId = req.body.productId;
    User.update({
        userId:userId
    },
    {
        $pull:{
            'cartList':{'productId':productId}
        }
    },(err,doc)=>{

        if(err){
            res.json({
                status:"1",
                msg:err.message,
                result:""
            });
        }else{

            res.json({
                status:"0",
                msg:"",
                result:"suc"
            })
        }
    })
});
//编辑用户购物车商品数量
router.post('/cartEdit',(req,res,next)=>{
    let userId = req.cookies.userId,
        productId = req.body.productId,
        productNum = req.body.productNum,
        checked = req.body.checked;
    User.update({userId:userId,"cartList.productId":productId},{
        "cartList.$.productNum":productNum,
        "cartList.$.checked":checked
    },(err,doc)=>{
        if(err){
            res.json({
                status:"1",
                msg:err.message,
                result:""
            });
        }else{
            res.json({
                status:"0",
                msg:"",
                result:"suc"
            })
        }
    })
});
//全选接口
router.post('/editCheckAll',(req,res,next)=>{
    let userId = req.cookies.userId,
        checkAll = req.body.checkAll?"1":"0";
    User.findOne({userId:userId},(err,user)=>{
        if(err){
            res.json({
                status:"1",
                msg:err.message,
                result:""
            });
        }else{
            if(user){
                user.cartList.forEach((item)=>{
                    item.checked = checkAll;
                });
                user.save((err1,doc)=>{
                    if(err1){
                        res.json({
                            status:"1",
                            msg:err.message,
                            result:""
                        })
                    }else{
                        res.json({
                            status:"0",
                            msg:"",
                            result:"suc"
                        })
                    }
                })
            }
        }

    })
});
//获取用户地址列表
router.get('/addressList',(req,res,next)=>{
    let userId = req.cookies.userId;
    User.findOne({userId:userId},(err,doc)=>{
        if(err){
            res.json({
                status:"1",
                msg:err.message,
                result:""
            })
        }else{
            res.json({
                status:"0",
                msg:"",
                result:doc.addressList
            })
        }
    })
});
//设置默认地址
router.post('/setDefault',(req,res,next)=>{
    let userId = req.cookies.userId,addressId = req.body.addressId;
    if(!addressId){
        res.json({
            status:"1003",
            msg:"addressId is null",
            result:""
        })
    }else{
        User.findOne({userId:userId},(err,doc)=>{
            if(err){
                res.json({
                    status:"1",
                    msg:err.message,
                    result:""
                })
            }else{
                let addressList = doc.addressList;
                addressList.forEach((item)=>{
                    item.isDefault = item.addressId === addressId? true:false
                });
                doc.save((err1,doc1)=>{
                    if(err1){
                        res.json({
                            status:"1",
                            msg:err1.message,
                            result:""
                        })
                    }else{
                        res.json({
                            status:"0",
                            msg:"",
                            result:''
                        })
                    }
                })
            }
        })
    }
});
router.post('/delAddress',(req,res,next)=>{
    let userId = req.cookies.userId,addressId = req.body.addressId;
    User.update({
        userId:userId
    },{
        $pull:{
            'addressList':{
                'addressId':addressId
            }
        }
    },(err,doc)=>{
        if(err){
            res.json({
                status:"1",
                msg:err.message,
                result:""
            })
        }else{
            res.json({
                status:"0",
                msg:"",
                result:""
            })

        }
    })
});
router.post('/payMent',(req,res,next)=>{
    let userId = req.cookies.userId,
        orderTotal = req.body.orderTotal,
        addressId = req.body.addressId;

    User.findOne({userId:userId},(err,doc)=>{
        if(err){
            res.json({
                status:"1",
                msg:err.message,
                result:""
            })
        }else{

            let address = "",
                goodsList = [];
            //获取当前用户的地址信息
            doc.addressList.forEach((item)=>{
                if(addressId === item.addressId){
                    address = item
                }
            });
            //获取用户购物车购买的商品
            doc.cartList.filter((item)=>{
                if(item.checked === '1'){
                    goodsList.push(item);
                }
            });
            let platform = "622";//生成平台的标识码
            let r1 = Math.floor(Math.random()*10);
            let r2 = Math.floor(Math.random()*10);
            let sysDate = new Date().Format('yyyyMMddhhmmss');
            let caeateDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
            let orderId = platform+r1+sysDate+r2;
            //创建订单
            let order = {
                orderId:orderId,
                orderTotal:orderTotal,
                addressInfo:address,
                goodsList:goodsList,
                orderStatus:"1",
                createDate:caeateDate
            };
            doc.orderList.push(order);
            doc.save((err1,doc1)=>{
                if(err1){
                    res.json({
                        status:"1",
                        msg:err.message,
                        result:""
                    })
                }else{
                    res.json({
                        status:"0",
                        msg:"",
                        result:{
                            orderId:order.orderId,
                            orderTotal:order.orderTotal,
                        }
                    })

                }
            });
        }
    })
})
module.exports = router;



