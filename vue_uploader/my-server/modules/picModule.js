/**
 * Created by web前端 on 2017/12/6.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let uploadScheam = new Schema({
    'id':String,
    'url':String,
    'size':Number,
    'name':String,
    'isSelected':false

});
module.exports = mongoose.model('Upload',uploadScheam);