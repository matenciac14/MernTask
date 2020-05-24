const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const autentication = require('../middleware/autentication');
const {check} = require('express-validator');


router.get('/',
    autentication,
    taskController.getTasks
)

router.post('/',
    autentication,
    [
        check('name','the task name is obligatory').not().isEmpty(),
        check('project','the project name is obligatory').not().isEmpty()
    ],
    taskController.createTask
)

router.put('/:id',
    autentication,
    taskController.updateTask
)

router.delete('/:id',
    autentication,
    taskController.deleteTask
)
module.exports = router;