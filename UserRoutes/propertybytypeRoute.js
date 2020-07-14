let express = require('express');
let property = require('../models/propertiesModel');
let router = express.Router();

router.get("/:type",(req,res)=>{
    property.find({propertyType:req.params.type}).then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

module.exports = router