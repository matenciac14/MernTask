const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const autentication = require('../middleware/autentication');
const {check} = require('express-validator');

router.get('/',
    autentication,
    projectController.getProjects
);

router.post('/',
//validator
    [
        check('name','the project name is obligatory').not().isEmpty(),
    ],
    autentication,
    projectController.createProject
);

module.exports = router;