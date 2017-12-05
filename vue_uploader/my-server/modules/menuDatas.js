/**
 * Created by web前端 on 2017/12/5.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let menuScheam = new Schema({
    'mark':String,
    'key':String
});
module.exports = mongoose.model('menuData',menuScheam);
