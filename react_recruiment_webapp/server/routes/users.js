var express = require('express');
var router = express.Router();
var model = require('../modules/module');
var User = model.getModel('users');
var utility = require('utility');
/* GET users listing. */
//加密密码
const _filter = {'pwd':0,'__v':0}
function md5Pwd(pwd) {
    let salt = 'this_is+a?$#@salt__&*%'
    return utility.md5(utility.md5(salt+pwd))
}
router.get('/list', function(req, res, next) {

    User.find({},(err,doc)=>{

        res.json(doc)
    })
});
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
router.get('/info', function(req, res, next) {
    const userid = req.cookies.userid;

    User.findOne({_id:userid},_filter,(err,doc)=>{
        if(err){
            return res.json({
                code:1,
                mgs:'后端出错了'
            })
        };
        console.log(doc)
        return res.json({
            code:0,
            data:doc
        })
    })
});

module.exports = router;
