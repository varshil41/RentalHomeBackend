let express = require('express');
let user = require('../models/userModel');
let property = require('../models/propertiesModel');
let appReq = require('../models/appointmentReqModel');
let propertySold = require('../models/propertiesSellDetailsModel');
let router = express.Router();

router.get('/admin/home/totalOwners', (req, res) => {
    user.find({ userType: 1 }, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            let num = row.length;
            res.json({
                result: num
            })
        }
    });

})

router.get('/admin/home/totalProperties', (req, res) => {
    property.find({}, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            let num = row.length;
            res.json({
                result: num
            })
        }
    });

})

router.get('/admin/home/totalSoldProperties', (req, res) => {
    propertySold.find({}, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            let num = row.length;
            res.json({
                result: num
            })
        }
    });

})

router.get('/admin/home/totalTenants', (req, res) => {
    user.find({ userType: 2 }, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            let num = row.length;
            res.json({
                result: num
            })
        }
    });

})

router.get('/admin/home/getReqs', (req, res) => {
    appReq.aggregate([
        {
            $lookup: {
                from: "usertbls",
                localField: "userId",
                foreignField: "userId",
                as: "table1"
            }
        },
        {
            $lookup: {
                from: "propertytbls",
                localField: "propertyId",
                foreignField: "propertyId",
                as: "table2"
            }
        },
        {
            "$unwind": "$table1"
        },
        {
            "$unwind": "$table2"
        },
        {
            "$match": {
                status: "pending"
            }
        }
    ], (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(row);
        }
    });
})


module.exports = router;    