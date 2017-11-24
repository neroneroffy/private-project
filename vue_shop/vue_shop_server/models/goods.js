/**
 * Created by web前端 on 2017/11/23.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    "productId":String,
    "productName":String,
    "salePrice":Number,
    "productImage":String
});

module.exports = mongoose.model('Good',productSchema);