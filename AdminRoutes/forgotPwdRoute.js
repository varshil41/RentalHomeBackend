let express = require('express');
let user = require('../models/userModel');
const nodemailer = require('nodemailer');
let router = express.Router();

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shivamelectronics7757@gmail.com',
        pass: 'shivam@123'
    }
});

router.post('/admin/forgotPwd', (req, res) => {
    user.find({ userEmail: req.body.email }, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            let num = row.length;
            if (num === 0) {
                res.json({
                    result: -1
                });
            }
            else {
                var newpwd = Math.floor(Math.random() * (99999999 - 11111111) + 11111111);
                transport.sendMail(
                    {
                        to: req.body.email,
                        from: 'RentalHomes',
                        subject: 'Forgot Password',
                        html: '<p>Your New Password is </p>' + newpwd
                    }
                ).then(result1 => {
                    user.updateMany({ userEmail: req.body.email }, { userPassword: newpwd }, (err, result2) => {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.send({
                                result: 1
                            });
                        }
                    })
                }
                )
                    .catch(err => {
                        res.send(err);
                    });
            }
        }
    });

})


module.exports = router;    