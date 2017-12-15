var express = require('express');
var router = express.Router();
var model = require('../modules/module');
var User = model.getModel('users');
/* GET users listing. */
router.get('/list', function(req, res, next) {
    console.log(User);
    User.find({},(err,doc)=>{
        console.log(doc)
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
        User.create({user,pwd,type},(err,doc)=>{
            if(err){
                return res.json({
                        code:1,
                        msg:'后台出错了'
                    })
            }
            return res.json({
                code:0
            })
        })
    })
});
router.get('/info', function(req, res, next) {
    res.json({"code":1});
});

module.exports = router;
