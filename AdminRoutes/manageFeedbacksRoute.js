let express = require('express');
let user = require('../models/userModel');
let router = express.Router();

router.get('/admin/getFeedbacks', (req, res) => {
    user.aggregate([
        {
            $lookup: {
                from: "feedbacktbls",
                localField: "userId",
                foreignField: "userId",
                as: "table1"
            }
        },
        {
            "$unwind": "$table1"
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