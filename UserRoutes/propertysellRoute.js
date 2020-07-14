let express = require('express');
let sellproperty = require('../models/propertiesSellDetailsModel');
let router = express.Router();

router.get("/:userid",(req,res)=>{
    sellproperty.find({userId:req.params.userid
    }).then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

module.exports = router;