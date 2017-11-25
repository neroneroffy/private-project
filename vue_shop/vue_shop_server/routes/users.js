var express = require('express');
var router = express.Router();
let User = require('../models/user');
/* GET users listing. */
router.get('/', function(req,res,next) {
  res.send('respond with a resource');
});
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
module.exports = router;



