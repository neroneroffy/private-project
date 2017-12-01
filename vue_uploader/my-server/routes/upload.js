/**
 * Created by web前端 on 2017/11/30.
 */
let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let Upload = require('../modules/uploads');
let fs = require('fs');
//引入表单处理模块
let Formidable = require("formidable");
//链接数据库
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/files');
mongoose.connection.on('connected',()=>{
   console.log('已经链接数据库')
});
mongoose.connection.on('error',()=>{
   console.log('链接失败')
});
mongoose.connection.on('disconnected',()=>{
   console.log('链接已断开')
});

router.post('/',(req,res,next)=>{
    let form = new Formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = '/project/vue/vue_uploader/my-server/public/images';//定义文件存放地址
    form.keepExtensions = true;
    form.multiples = true;//支持多文件上传
    //form.maxFieldsSize = 2*1024*1024
    //解析图片，重命名图片名称，返回给前端。
    let fileData = "";
    let fileDir = "images";//定义文件的存放路径
    let route = 'upload_';//定义路由
    let serverIp = 'http://localhost:3002/';//定义服务器IP
    let latestFileData = [];
    function handleFile (file){
        let filename = file.name;
        let nameArray = filename.split('.');
        let type = nameArray[nameArray.length-1];
        let name = '';
        for (let i = 0;i<nameArray.length - 1;i++){
            name = name + nameArray[i];
        }
        let date = new Date();
        let time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes() +"_"+ date.getSeconds()+"_"+date.getMilliseconds();
        let picName = name + time + '.' + type;
        let newPath = form.uploadDir + "/" + picName;
        let oldPath = form.uploadDir + "/"+ file.path.substring(file.path.indexOf(route));
        console.log(file.path);
        fs.renameSync(oldPath, newPath); //重命名
        fileData = {
            id:`${new Date().getTime()}`,
            url:serverIp + newPath.substring(newPath.indexOf(fileDir)),
            name:file.name,
            size:file.size
        };

        let fileContent = new Upload(fileData)
        fileContent.save((err,fileSaved)=>{
            if(err){
                res.json({
                    result:false,
                    msg:err.message
                })
            }else{
                //最新上传的图片
                latestFileData.push(fileData);
                //console.log(latestFileData)
            }
        })
    }


    form.parse(req,(err,fields,files)=>{
        //传多个文件
        if(files.file instanceof Array){
            files.file.forEach((item)=>{
                handleFile(item)
            })
        }else{
         //传单个文件
            handleFile(files.file)
        }

    });
    form.on('end',()=>{
/*        Upload.find({},(err,doc)=>{
            if(err){
                res.json({
                    result:false,
                    msg:err.message
                })
            }else{
                res.json({
                    result:true,
                    data:doc
                })
            }
        })*/
        setTimeout(()=>{
            res.json({
                result:true,
                data:latestFileData
            })
        },200)
    })

});
module.exports = router;
