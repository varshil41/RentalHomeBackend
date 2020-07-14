let mongoose = require('../dbconnection');

let userSchema = new mongoose.Schema({
    userId:Number,
    userName:String,
    userPassword:String,
    userEmail:String,
    contactNo:String,
    gender:String,
    addressLine1:String,
    addressLine2:String,
    city:String,
    pincode:Number,
    profilePic:String,
    userType:Number,
    userStatus:Number   
});

module.exports = mongoose.model('usertbls',userSchema);