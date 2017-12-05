/**
 * Created by web前端 on 2017/12/5.
 */
/**
 * Created by web前端 on 2017/12/5.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let uploadScheam = new Schema({
    "name":String,
    "group":String,
    "picList":Array
});
module.exports = mongoose.model('UploadData',uploadScheam);
