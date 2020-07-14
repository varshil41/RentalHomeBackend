let express = require('express');
let user = require('../models/userModel');
let router = express.Router();

router.post('/admin/blockUser', (req, res) => {
    user.updateMany({ userId: req.body.id }, { userStatus: 1 }, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send({
                result: 1
            });
        }
    });

})


router.post('/admin/unblockUser', (req, res) => {
    user.updateMany({ userId: req.body.id }, { userStatus: 0 }, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send({
                result: 1
            });
        }
    });

})


router.get('/admin/getUsers/:choice', (req, res) => {
    user.find({ userType: req.params.choice }, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(row);
        }
    });

})


module.exports = router;    