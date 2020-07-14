let express = require('express');
let propertyimage = require('../models/propertyimagesModel');
let router = express.Router();
let multer  = require('multer');
let path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'public/images/propertySubImage/');
    },
    filename: (req, file, cb) => {
    x=file.fieldname + '-' + Date.now()+path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
    });
    var upload = multer({storage: storage});


router.post("/",upload.single('propertyImage'),(req,res)=>{
    let model = new propertyimage({propertyImageId:req.body.propertyImageId,propertyId:req.body.propertyId,propertyImage:req.file.filename});
    model.save().then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

router.get("/",(req,res)=>{
    propertyimage.find().then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

router.get("/:propertyId",(req,res)=>{
    propertyimage.find({propertyId:req.params.propertyId}).then(doc=>{
        res.json(doc);
    }).then(err=>{
        res.json(err);
    })
})

router.put("/",(req,res)=>{
    propertyimage.update({propertyImageId:req.body.propertyImageId},req.body).then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

router.delete("/:id",(req,res)=>{
    propertyimage.remove({propertyImageId:req.params.id}).then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

module.exports = router