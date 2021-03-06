const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {check} = require('express-validator');



//create usres
router.post('/',
    //validator
    [
        check('name','the name is obligatory').not().isEmpty(),
        check('email','insert valid email').isEmail(),
        check('password','min length is 6 character').not().isEmpty(),
    ],
    userController.createUser
);

module.exports = router;