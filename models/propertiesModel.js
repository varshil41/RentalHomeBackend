let mongoose = require('../dbconnection');

let propertyScema = new mongoose.Schema({
    propertyId:Number,
    propertyType:String,
    propertyName:String,
    bhk:String,
    facility:String,
    addressLine1:String,
    area:String,
    city:String,
    pincode:String,
    rent:Number,
    mainImage:String,
    status:String,
    userId:Number   
});

module.exports = mongoose.model('propertytbls',propertyScema);