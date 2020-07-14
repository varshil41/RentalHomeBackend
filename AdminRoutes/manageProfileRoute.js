let express = require('express');
let user = require('../models/userModel');
const multer = require('multer');
let router = express.Router();

router.get('/admin/getAdminDetails/:choice', (req, res) => {

    let uname = req.params.choice;

    user.find({ userEmail: uname }, (err, row) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(row);
        }
    });

})

const fileFilter = (req, file, cb) => {

    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/userImage');
    },
    filename: (req, file, cb) => {
        var filename = file.originalname;
        var ext = filename.substring(filename.indexOf('.'));
        cb(null, 'admin' + '_' + Date.now() + ext);
    }
});


const fileupload = (multer({ storage: fileStorage, fileFilter: fileFilter }).single('file'));

router.post('/admin/profile/uploadImage', fileupload, (req, res, next) => {
    const image = req.file;
    if (!image) {
        res.send({
            result: -1
        });
    }
    else {
        res.send({
            result: 1,
            name: image.filename
        });
    };
});

router.post('/admin/updateDetails', (req, res) => {

    user.updateMany({ userEmail: req.body.userEmail }, { userName: req.body.userName, userPassword: req.body.userPassword, contactNo: req.body.contactNo, gender: req.body.gender, addressLine1: req.body.addressLine1, addressLine2: req.body.addressLine2, city: req.body.city, pincode: req.body.pincode, profilePic: req.body.profilePic }, (err, row) => {
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


module.exports = router;    