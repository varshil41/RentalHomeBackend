let mongoose = require('../dbconnection');

let sellpropertySchema = new mongoose.Schema({
    propertyDetailsId:Number,
    propertyId:Number,
    userId:Number
});

module.exports = mongoose.model('propertyselldetailstbls',sellpropertySchema);