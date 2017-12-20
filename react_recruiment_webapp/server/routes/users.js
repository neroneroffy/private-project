var express = require('express');
var router = express.Router();
var model = require('../modules/module');
var User = model.getModel('users');
var Chat = model.getModel('chat');
var utility = require('utility');
/* GET users listing. */
//加密密码
const _filter = {'pwd':0,'__v':0}
function md5Pwd(pwd) {
    let salt = 'this_is+a?$#@salt__&*%'
    return utility.md5(utility.md5(salt+pwd))
}
router.get('/list', function(req, res, next) {
    const { type } = req.query;
    User.find({type},(err,doc)=>{
        res.json({
            code:0,
            data:doc
        })
    })
});
//查询聊天信息接口
router.get('/getmsglist',(req,res,next)=>{
    const userid = req.cookies.userid;
    //
    User.find({},(err,userdoc)=>{
        let users = {};
        userdoc.forEach(v=>{
            users[v._id]={
                name:v.user,
                avatar:v.avatar
            }
        })
        Chat.find({"$or":[{from:userid},{to:userid}]},(err,doc)=>{
            if(!err){
                return res.json({
                    code:0,
                    data:doc,
                    users:users
                })
            }
        })
    })

})
router.post('/update',(req,res,next)=>{
    let userid = req.cookies.userid;
   if(!userid){
       return res.json({
           code:1,
           msg:'请重新登录'
       })
   };
   let body = req.body.data;
   User.findByIdAndUpdate(userid,body,(err,doc)=>{

       const data = Object.assign({},{
           user:doc.user,
           type:doc.type,
       },body);
       return res.json({
           code:0,
           data
       })
   })

});

//注册
router.post('/register', function(req, res, next) {
    const {user,pwd,type} = req.body;

    User.findOne({user:user},(err,doc)=>{
        if(doc){
           return res.json({
                code:1,
                msg:'用户名已存在'
            })
        }
        const userModal = new User({user,pwd:md5Pwd(pwd),type});
        userModal.save((err,doc)=>{
            if (err){
                return res.json({
                    code:1,
                    msg:'后台出错了'
                })
            };
            const {user,type,_id} = doc
            res.cookie('userid',doc._id);
            res.json({
                code:0,
                data:{user,type,_id}
            })
        });
    })
});

//登录
router.post('/login',(req,res,next)=>{
   const {user,pwd} = req.body;
   User.findOne({user,pwd:md5Pwd(pwd)},_filter,(err,doc)=>{
       if(!doc){
          return res.json({
               code:1,
               msg:'用户名或密码错误'
           })
       }else{

           res.cookie('userid',doc._id)
           res.json({
               code:0,
               data:doc
           });
       }
   })
});

//校验用户是否登录
router.get('/info', function(req, res, next) {
    const userid = req.cookies.userid;
    if(!userid){
        return res.json({
            code:1,
            msg:'请重新登录'
        })
    }
    User.findOne({_id:userid},_filter,(err,doc)=>{
        if(err){
            return res.json({
                code:1,
                msg:'后端出错了'
            })
        };
        return res.json({
            code:0,
            data:doc
        })
    })
});

module.exports = router;
