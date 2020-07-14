let express = require('express');
let feedback = require('../models/feedbackModel');
let router = express.Router();

router.get('/',(req,res)=>{
    feedback.find()
    .then(doc=>{
        res.json(doc);
    })
    .catch(err=>{
        res.json(err);
    })
})

router.post('/',(req,res)=>{
    let model = new feedback(req.body);
    model.save()
    .then(doc=>{
        res.json(doc);
    })
    .catch(err=>{
        res.json(err);
    })
})


module.exports = router;