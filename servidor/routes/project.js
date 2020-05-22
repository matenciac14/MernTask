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
    autentication,
    //validator
    [
        check('name','the project name is obligatory').not().isEmpty()
    ],
    projectController.createProject
);

router.put('/:id',    
    autentication,
    [
        check('name','the project name is obligatory').not().isEmpty()
    ],
    projectController.updateProject
);

router.delete('/:id',    
    autentication,
    projectController.deleteProject
);

module.exports = router;