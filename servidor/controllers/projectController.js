
const Project = require('../models/Project');
const {validationResult} = require('express-validator');


exports.createProject = async (req, res) =>{
    //view the error
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        //create new project
        const project = new Project(req.body);
        //save the creator to jwt
        project.creator = req.user.id;
        // save project
        project.save();
        res.json(project)
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
    
}

//get all project for user

exports.getProjects = async (req, res) =>{
    try {
        const projects = await Project.find({creator: req.user.id}).sort({create:-1});
        res.json({projects})
    } catch (error) {
        console.log(error);
        res.status(500).send('Error')
    }
}