const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



//create usres
router.post('/',
    userController.createUser
);

module.exports = router;