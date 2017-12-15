/**
 * Created by haita on 2017/12/15 0015.
 */
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/recruiment-datas';
mongoose.connect(DB_URL);
const models = {
    users:{
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        //头像
        'avatar':String,
        //个人简介或者职位简介
        'desc':String,
        //职位名称
        'title':String,
        'company':String,
        'money':String,
    },
    chat:{}
};
for(let m in models){
    let everyModel = mongoose.model(m, new mongoose.Schema(models[m]));

};
module.exports = {
    getModel(name){
        return mongoose.model(name)
    }
}