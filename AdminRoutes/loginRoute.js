let express = require('express');
let user = require('../models/userModel');
let router = express.Router();

router.post('/admin/signin', (req, res) => {
    user.find({ userEmail: req.body.email, userPassword: req.body.pwd }, (err, row) => {
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
                res.json({
                    result: 1
                });

            }
        }
    });

})


module.exports = router;    