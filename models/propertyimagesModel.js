let mongoose = require('../dbconnection');

let propertyimagesSchema = new mongoose.Schema({
    propertyImageId:Number,
    propertyId:Number,
    propertyImage:String
})
module.exports = mongoose.model('propertyimagestbls',propertyimagesSchema); 
