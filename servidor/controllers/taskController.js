const Task = require('../models/Task');
const Project = require('../models/Project');
const {validationResult} = require('express-validator');

//get task by project 
exports.getTasks = async (req, res) =>{
    try {
        //get and validate  project
        const {project} = req.query;
        //review id 
        const projectExist = await Project.findById(project);
        
        //project exists
        if(!projectExist){
            return res.status(404).json({msg: 'project not found'})
        }
        
        //project creator  is valid
        if(projectExist.creator.toString() !== req.user.id){
            return res.status(401).json({msg:'unauthorized'});
        }
        //get tasks by project id
        const tasks = await Task.find({project}).sort({create: -1});
        res.json({tasks})
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }


}

//create new task by project 
exports.createTask = async (req, res) => {
    //view the error
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
   

    try {
        //get and validate  project
        const {project} = req.body;
        //review id 
        const projectExist = await Project.findById(project);
        
        //project exists
        if(!projectExist){
            return res.status(404).json({msg: 'project not found'})
        }
        
        //project creator  is valid
        if(projectExist.creator.toString() !== req.user.id){
            return res.status(401).json({msg:'unauthorized'});
        }

        //create task
        const task = new Task(req.body)
        await task.save();
        res.json({task})
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

//update task
exports.updateTask = async(req,res) =>{
    try {
        //get and validate  project
        const {project, name, state} = req.body;
        //review id 
        let task = await Task.findById(req.params.id);
        
        //task exists
        if(!task){
            return res.status(404).json({msg:"the task donesn't "})
        }
        
        const projectExist = await Project.findById(project);
        //project creator  is valid
        if(projectExist.creator.toString() !== req.user.id){
            return res.status(401).json({msg:'unauthorized'});
        }


        //create new object with  new task
        const newTask = {}
            newTask.name = name;
            newTask.state = state;
        
        //save  and update tasks
        task = await Task.findOneAndUpdate({_id : req.params.id}, newTask, {new: true});
        res.json({task})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error')
    }
}

//delete task
exports.deleteTask = async(req,res) =>{
    try {
        //get and validate  project
        const {project} = req.query;
        //review id 
        let task = await Task.findById(req.params.id);
        
        //task exists
        if(!task){
            return res.status(404).json({msg:"the task donesn't "})
        }
        
        const projectExist = await Project.findById(project);
        //project creator  is valid
        if(projectExist.creator.toString() !== req.user.id){
            return res.status(401).json({msg:'unauthorized'});
        }


        //delete task
        await Task.findOneAndRemove({_id : req.params.id});
        res.json({msg: 'the tasks was deleted'})
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error')
    }
}