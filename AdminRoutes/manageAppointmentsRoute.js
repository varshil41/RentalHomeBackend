let express = require('express');
let user = require('../models/userModel');
let property = require('../models/propertiesModel');
let appReq = require('../models/appointmentReqModel');
let fixApp = require('../models/fixappointmentModel');
let propertySold = require('../models/propertiesSellDetailsModel');
const nodemailer = require('nodemailer');
let router = express.Router();

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shivamelectronics7757@gmail.com',
        pass: 'shivam@123'
    }
});

router.get('/admin/appointment/getAcceptedReqs', (req, res) => {
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
                status: "accepted"
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

router.get('/admin/appointment/getRejectedReqs', (req, res) => {
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
                status: "rejected"
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

router.get('/admin/appointment/getPendingReqs', (req, res) => {
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

router.post('/admin/appointment/rejectReq', (req, res) => {
    appReq.updateMany({ appointmentReqId: req.body.id }, { status: "rejected" }, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {

            transport.sendMail(
                {
                    to: req.body.email,
                    from: 'RentalHomes',
                    subject: 'About Your Appointment Request',
                    html: '<p>Your Appointment Request has been Rejected Because of some reasons. </p>'
                }
            ).then(result1 => {
                res.send({
                    result: 1
                });
            }
            )
                .catch(err => {
                    res.send(err);
                });
        }
    });
})

router.post('/admin/appointment/acceptReq', (req, res) => {
    appReq.updateMany({ appointmentReqId: req.body.id }, { status: "accepted" }, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            fixApp.find({}, (err, row) => {
                if (err) {
                    res.send(err);
                }
                else {
                    let num1 = row[row.length - 1].fixAppointmentId;
                    num1 = num1 + 1;
                    fixApp.insertMany({ fixAppointmentId: num1, appointmentReqId: req.body.id, date: req.body.date, place: req.body.place }, (err, row) => {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            transport.sendMail(
                                {
                                    to: req.body.email,
                                    from: 'RentalHomes',
                                    subject: 'About Your Appointment Request',
                                    html: '<p>Your Appointment Request has been Accepted. Please Check your account for more Details.</p>'
                                }
                            ).then(result1 => {
                                res.send({
                                    result: 1
                                });
                            }
                            )
                                .catch(err => {
                                    res.send(err);
                                });
                        }
                    });
                }

            });
        }
    });
})

router.post('/admin/appointment/completedApp', (req, res) => {
    appReq.updateMany({ appointmentReqId: req.body.id }, { status: "done" }, (err, row) => {
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

router.get('/admin/appointment/getCompletedReqs', (req, res) => {
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
                status: "done"
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

router.get('/admin/appointment/getProperties', (req, res) => {
    property.find({}, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(row);
        }
    });
})

router.post('/admin/appointment/makeAppEntry', (req, res) => {

    appReq.find({}, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            let num = row[row.length - 1].appointmentReqId;
            num = num + 1;
            appReq.insertMany({ appointmentReqId: num, userId: req.body.userId, propertyId: req.body.propId, status: "accepted" }, (err, row) => {
                if (err) {
                    res.send(err);
                }
                else {

                    fixApp.find({}, (err, row) => {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            let num1 = row[row.length - 1].fixAppointmentId;
                            num1 = num1 + 1;

                            fixApp.insertMany({ fixAppointmentId: num1, appointmentReqId: num, date: req.body.date, place: req.body.place }, (err, row) => {
                                if (err) {
                                    res.send(err);
                                }
                                else {
                                    user.find({ userId: req.body.userId }, (err, row) => {
                                        if (err) {
                                            res.send(err);
                                        }
                                        else {
                                            transport.sendMail(
                                                {
                                                    to: row[0].userEmail,
                                                    from: 'RentalHomes',
                                                    subject: 'About Appointment',
                                                    html: '<p>Admin of RentalHomes has set the Appointment with you please check your account for more details.</p>'
                                                }
                                            ).then(result1 => {
                                                res.send({
                                                    result: 1
                                                });
                                            }
                                            )
                                                .catch(err => {
                                                    res.send(err);
                                                });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
})

router.get('/admin/appointment/getTenants', (req, res) => {
    user.find({ userType: { $ne: 0 } }, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(row);
        }
    });
})

module.exports = router;    