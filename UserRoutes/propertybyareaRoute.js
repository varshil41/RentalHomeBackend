let express = require('express');
let property = require('../models/propertiesModel');
let router = express.Router();

router.get("/:area",(req,res)=>{
    property.find({area:req.params.area}).then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

module.exports = router