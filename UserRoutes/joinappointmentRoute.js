let express = require('express');
let fixappointment = require('../models/fixappointmentModel');
let appointmentres = require('../models/appointmentReqModel');
let user = require('../models/userModel');
let property = require('../models/propertiesModel');
let router = express.Router();

router.get('/',(req,res)=>{
    fixappointment.aggregate([
        {
            $lookup:{
                from:"appointmentreqtbls",
                localField:"appointmentReqId",
                foreignField:"appointmentReqId",
                as:"appointmentreq"
            }
        },
        
        {
            $lookup:{
                from:"usertbls",
                localField:"appointmentreq.userId",
                foreignField:"userId",
                as:"usertbl"
            }
        },
        {
            $lookup:{
                from:"propertytbls",
                localField:"appointmentreq.propertyId",
                foreignField:"propertyId",
                as:"propertytbl"
            }
        },
        
     ]).then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})


module.exports = router;