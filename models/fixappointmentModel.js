let mongoose = require('../dbconnection');

let fixappSchema = new mongoose.Schema({
    fixAppointmentId:Number,
    appointmentReqId:Number,
    date:Date,
    place:String
})

module.exports = mongoose.model('fixappointmenttbl',fixappSchema);