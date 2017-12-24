/**
 * Created by haita on 2017/12/23 0023.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let areaSchema = new Schema({
    "name":String,
    "id":String,
    "pid":String,
    "areaType":String
});
module.exports = mongoose.model('Area',areaSchema);
