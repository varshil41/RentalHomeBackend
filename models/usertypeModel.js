let mongoose = require('../dbconnection');
let userTypeSchema = new mongoose.Schema({
    userTypeId:Number,
    userId:Number,
    userType:String
});

module.exports = mongoose.model('usertypetbl',userTypeSchema);