/**
 * Created by haita on 2017/12/23 0023.
 */
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Area = require('../models/area');

router.get('/',(req,res,next)=>{
    let pid = req.param('pid');

        Area.find({pid},(err,doc)=>{
            if(err){
                return res.json({
                    result:false
                })
            }

            return res.json({
                result:true,
                data:doc
            })

        })


})
module.exports = router