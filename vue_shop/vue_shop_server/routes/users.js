var express = require('express');
var router = express.Router();
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
    console.log(productId);
    console.log(productNum);
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
})
module.exports = router;



