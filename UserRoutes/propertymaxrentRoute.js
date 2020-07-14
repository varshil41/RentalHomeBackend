let express = require('express');
let property = require('../models/propertiesModel');
let router = express.Router();

router.get('/',(req,res)=>{
    property.find().sort({rent:-1}).limit(4).then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    });
});

module.exports = router;