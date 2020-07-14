let express = require('express');
let property = require('../models/propertiesModel');
let router = express.Router();
let multer  = require('multer');
let path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'public/images/propertyImage/');
    },
    filename: (req, file, cb) => {
    x=file.fieldname + '-' + Date.now()+path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
    });
    var upload = multer({storage: storage});


router.get("/",(req,res)=>{
    property.find().then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

router.post("/",upload.single('mainImage'),(req,res)=>{
    let model = new property({propertyId:req.body.propertyId,propertyType:req.body.propertyType,propertyName:req.body.propertyName,bhk:req.body.bhk,facility:req.body.facility,addressLine1:req.body.addressLine1,area:req.body.area,city:req.body.city,pincode:req.body.pincode,rent:req.body.rent,mainImage:req.file.filename,status:req.body.status,userId:req.body.userId});
    model.save().then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

router.get("/:status/:city/:type",(req,res)=>{
    property.find({status:req.params.status,city:req.params.city,propertyType:req.params.type}).then(doc=>{
        res.json(doc);

    }).catch(err=>{
        res.json(err);
    })
})

router.put("/",upload.single('mainImage'),(req,res)=>{
    if(req.body.flag == 1){
    property.update({propertyId:req.body.propertyId},{propertyType:req.body.propertyType,propertyName:req.body.propertyName,bhk:req.body.bhk,facility:req.body.facility,addressLine1:req.body.addressLine1,area:req.body.area,city:req.body.city,pincode:req.body.pincode,rent:req.body.rent,mainImage:req.file.filename,status:req.body.status,userId:req.body.userId}).then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
    }
    else{
        property.update({propertyId:req.body.propertyId},{propertyType:req.body.propertyType,propertyName:req.body.propertyName,bhk:req.body.bhk,facility:req.body.facility,addressLine1:req.body.addressLine1,area:req.body.area,city:req.body.city,pincode:req.body.pincode,rent:req.body.rent,status:req.body.status,userId:req.body.userId}).then(doc=>{
            res.json(doc);
        }).catch(err=>{
            res.json(err);
        })
        }
})

router.delete("/:id",(req,res)=>{
    property.deleteOne({propertyId:req.params.id}).then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

module.exports = router