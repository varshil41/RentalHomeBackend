let express = require('express');
let userType = require('../models/usertypeModel');
let user = require('../models/userModel');
let router = express.Router();

router.get('/',(req,res)=>{
    userType.find().then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
});

router.post('/',(req,res)=>{
    let model = new userType(req.body);
    model.save().then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

router.delete("/:id/:type",(req,res)=>{
    userType.deleteOne({userId:req.params.id,userType:req.params.type}).then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

router.get('/:type',(req,res)=>{
    userType.aggregate([
        {
            $match:{
                userType:req.params.type
            }
        },
        {
            $lookup:{
                from:"usertbls",
                localField:"userId",
                foreignField:"userId",
                as:"GetUserByType"
            }
        }
    ]).then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

module.exports = router;