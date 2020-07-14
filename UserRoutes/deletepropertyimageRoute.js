let express = require('express');
let property = require('../models/propertiesModel');
let fs = require('fs');
let filepath = 'public/images/propertyImage/';
let router = express.Router();

router.delete("/:name",(req,res)=>{
    console.log(req.params.name);
    filepath = 'public/images/propertyImage/';
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