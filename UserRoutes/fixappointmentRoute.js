let express = require('express');
let fixappointment = require('../models/fixappointmentModel');
let appointmentres = require('../models/appointmentReqModel');
let user = require('../models/userModel');
let property = require('../models/propertiesModel');
let router = express.Router();

router.get("/",(req,res)=>{
    fixappointment.find().then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

router.post("/",(req,res)=>{
    let model = new fixappointment(req.body);
    model.save().then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

router.delete("/:id",(req,res)=>{
    fixappointment.deleteOne({fixAppointmentId:req.params.id}).
    then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})



module.exports = router;