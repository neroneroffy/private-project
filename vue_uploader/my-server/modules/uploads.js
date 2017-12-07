/**
 * Created by web前端 on 2017/11/30.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let uploadScheam = new Schema({
    'id':String,
    'url':String,
    'size':Number,
    'name':String,
    'isSelected':false,
    'newName':String

});
module.exports = mongoose.model('Upload',uploadScheam);