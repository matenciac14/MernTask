const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const autentication = require('../middleware/autentication');


//get users
router.get('/',
    autentication,
    authController.userAuthenticated
);

//create usres
router.post('/',
    authController.autenticateUser
);

module.exports = router;