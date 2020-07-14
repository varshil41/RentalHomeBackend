let express = require('express');
let user = require('../models/userModel');
let property = require('../models/propertiesModel');
let propertySold = require('../models/propertiesSellDetailsModel');
let propertyImg = require('../models/propertyimagesModel');
let router = express.Router();

router.get('/admin/properties/getBunglows', (req, res) => {
    property.aggregate([
        {
            $lookup: {
                from: "usertbls",
                localField: "userId",
                foreignField: "userId",
                as: "table1"
            }
        },
        {
            "$unwind": "$table1"
        },
        {
            $match:
            {
                propertyType: "Bunglow"
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


router.get('/admin/properties/getUnsold', (req, res) => {
    property.aggregate([
        {
            $lookup: {
                from: "usertbls",
                localField: "userId",
                foreignField: "userId",
                as: "table1"
            }
        },
        {
            "$unwind": "$table1"
        },
        {
            $match:
            {
                status: "Unsold"
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

router.get('/admin/properties/getFlats', (req, res) => {
    property.aggregate([
        {
            $lookup: {
                from: "usertbls",
                localField: "userId",
                foreignField: "userId",
                as: "table1"
            }
        },
        {
            "$unwind": "$table1"
        }, {
            $match:
            {
                propertyType:"Flat"
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

router.get('/admin/properties/getTenaments', (req, res) => {
    property.aggregate([
        {
            $lookup: {
                from: "usertbls",
                localField: "userId",
                foreignField: "userId",
                as: "table1"
            }
        },
        {
            "$unwind": "$table1"
        }, {
            $match:
            {
                propertyType: "Tenament"
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

router.post('/admin/properties/getPropertyDetails', (req, res) => {

    property.aggregate([
        {
            $lookup: {
                from: "usertbls",
                localField: "userId",
                foreignField: "userId",
                as: "table1"
            }
        },
        {
            "$unwind": "$table1"
        },
        {
            $match:
            {
                propertyId: req.body.id
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


router.post('/admin/properties/sold', (req, res) => {

    property.updateMany({ propertyId: req.body.id }, { status: "sold" }, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({
                result: 1
            });
        }
    });
})

router.post('/admin/properties/getImages', (req, res) => {

    propertyImg.find({ propertyId: req.body.id }, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(row);
        }
    });
})

module.exports = router;    