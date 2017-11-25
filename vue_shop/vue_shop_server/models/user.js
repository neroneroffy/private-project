/**
 * Created by web前端 on 2017/11/24.
 */
let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    'userId':String,
    'userName':String,
    'userPwd':String,
    'orderList':Array,
    'cartList':[
        {
            'productId':String,
            'productName':String,
            'salePrice':String,
            'productImage':String,
            'checked':String,
            'productNum':String
        }
    ],
    'addressList':Array
});

module.exports = mongoose.model('User',userSchema)



