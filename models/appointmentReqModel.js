let mongoose = require('../dbconnection');

let appReqSchema = new mongoose.Schema({
    appointmentReqId:Number,
    userId:Number,
    propertyId:Number,
    status:String
})

module.exports = mongoose.model('appointmentreqtbls',appReqSchema);