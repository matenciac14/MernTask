const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');


//create usres
router.post('/',
    //validator
    [
        check('email','insert valid email').isEmail(),
        check('password','min length is 6 character').not().isEmpty(),
    ],
    authController.autenticateUser
);

module.exports = router;