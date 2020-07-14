let express = require('express');
let user = require('../models/userModel');
let router = express.Router();
let multer  = require('multer');
let fs = require('fs');
let filepath = 'public/images/userImage/';
let path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'public/images/userImage/');
    },
    filename: (req, file, cb) => {
    x=file.fieldname + '-' + Date.now()+path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
    });
    var upload = multer({storage: storage});



router.get('/',(req,res)=>{
    user.find().then(doc=>{
        res.json(doc);
    }).catch(err=>{
        res.json(err);
    })
})

router.get('/:emailid',(req,res)=>{
    user.find({userEmail:req.params.emailid}).then(doc=>{
        res.json(doc);
    })
})

router.get('/:email/:password',(req,res)=>{
    user.find({userEmail:req.params.email,userPassword:req.params.password}).then(doc=>{
        res.json(doc);
    })
})

router.post('/',upload.single('profilePic'),(req,res)=>{
    let model = new user({userId:req.body.userId,userName:req.body.userName,userPassword:req.body.userPassword,userEmail:req.body.userEmail,contactNo:req.body.contactNo,gender:req.body.gender,addressLine1:req.body.addressLine1,addressLine2:req.body.addressLine2,city:req.body.city,pincode:req.body.pincode,profilePic:req.file.filename,userType:req.body.userType,userStatus:req.body.userStatus});
    model.save().then(doc=>{
        if(!doc || doc.length===0){
            return res.status(500).send(doc);
        }
        res.send(doc);
    
    }).catch(err=>{
        res.send(err);
    })
})
router.put('/',upload.single('profilePic'),(req,res)=>{
    if(req.body.flag == 1){
    user.update({userId:req.body.userId},{userName:req.body.userName,userPassword:req.body.userPassword,userEmail:req.body.userEmail,contactNo:req.body.contactNo,gender:req.body.gender,addressLine1:req.body.addressLine1,addressLine2:req.body.addressLine2,city:req.body.city,pincode:req.body.pincode,profilePic:req.file.filename,userType:req.body.userType,userStatus:req.body.userStatus})
    .then(doc=>{
        res.json(doc);
    })
    .catch(err=>{
        res.send(err);
    })
    }
    else{
        user.update({userId:req.body.userId},{userName:req.body.userName,userPassword:req.body.userPassword,userEmail:req.body.userEmail,contactNo:req.body.contactNo,gender:req.body.gender,addressLine1:req.body.addressLine1,addressLine2:req.body.addressLine2,city:req.body.city,pincode:req.body.pincode,userType:req.body.userType,userStatus:req.body.userStatus})
        .then(doc=>{
            res.json(doc);
        })
        .catch(err=>{
            res.send(err);
        })
  }
})

router.delete("/:name",(req,res)=>{
    console.log(req.params.name);
    filepath = 'public/images/userImage/';
    filepath = filepath + req.params.name;
    console.log(filepath);  
    fs.stat(filepath, function (err, stats) {
        console.log(stats);//here we got all information of file in stats variable
     
        if (err) {
            return console.error(err);
        }
     
        fs.unlink(filepath,function(err){
             if(err) return console.log(err);
             console.log('file deleted successfully');
        });  
     });}); 


module.exports = router;    