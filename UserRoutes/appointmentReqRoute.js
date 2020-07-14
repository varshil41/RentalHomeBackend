let express = require('express');
let appointmentReq = require('../models/appointmentReqModel');
let router = express.Router();
let usertbl = require('../models/userModel');
let propertytbl = require('../models/propertiesModel');

router.post('/',(req,res)=>{
    let model = new appointmentReq(req.body);
    model.save()
    .then(doc=>{
        res.json(doc);
    })
    .catch(err=>{
        res.json(err);
    })
})

router.get('/',(req,res)=>{
    appointmentReq.find().then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

router.delete("/:id",(req,res)=>{
    appointmentReq.deleteOne({appointmentReqId:req.params.id}).then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

router.put('/:id/:status',(req,res)=>{
    appointmentReq.update({appointmentReqId:req.params.id},{status:req.params.status}).then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

router.get('/:status',(req,res)=>{
    appointmentReq.aggregate([
        {
            $match:{
                status:req.params.status
            }
        },
        {
            $lookup:{
                from:"usertbls",
                localField:"userId",
                foreignField:"userId",
                as:"table1"
            }
        },
        {
            $lookup:{
                from:"propertytbls",
                localField:"propertyId",
                foreignField:"propertyId",
                as:"table2"
            }
        },
    ]).then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})


module.exports = router;