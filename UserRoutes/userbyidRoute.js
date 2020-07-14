let express = require('express');
let user = require('../models/userModel');
let router = express.Router();

router.get('/:id',(req,res)=>{
    user.find({userId:req.params.id}).then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
});

module.exports = router;