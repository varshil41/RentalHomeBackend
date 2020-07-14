let mongoose = require('../dbconnection');

let feedbackSchema = new mongoose.Schema({
    feedbackId:Number,
    userId:Number,
    experience:String,
    comment:String
})

module.exports = mongoose.model('feedbacktbls',feedbackSchema);