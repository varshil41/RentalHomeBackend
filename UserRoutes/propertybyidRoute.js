let express = require('express');
let property = require('../models/propertiesModel');
let router = express.Router();

router.get("/:id",(req,res)=>{
    property.find({propertyId:req.params.id}).then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

module.exports = router