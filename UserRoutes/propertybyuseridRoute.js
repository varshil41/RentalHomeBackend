let express = require('express');
let property = require('../models/propertiesModel');
let router = express.Router();

router.get("/:userid",(req,res)=>{
    property.find({userId:req.params.userid}).then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

module.exports = router