
const Project = require('../models/Project');
const {validationResult} = require('express-validator');

//get all project for user
exports.getProjects = async (req, res) =>{
    try {
        const projects = await Project.find({creator: req.user.id}).sort({create:-1});
        res.json({projects})
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

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

//update projects
exports.updateProject = async(req, res) =>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    //get the project information
    const { name } = req.body;
    const newProject = {}

    if(name){ newProject.name = name; }

    try {
        //review id 
        let project = await Project.findById(req.params.id);
        
        //project exists
        if(!project){return res.status(404).json({msg: 'project not found'})}
        
        //project creator  is valid
        if(project.creator.toString() !== req.user.id){
            return res.status(401).send('unauthorized')
        }
        //update
        project = await Project.findByIdAndUpdate({_id: req.params.id}, {$set: newProject}, {new: true})
        res.json({project})

    } catch (error) {
        console.log(Error);
        res.status(500).send('Error')
    }
}


exports.deleteProject = async( req, res ) =>{
    try {
        //review id 
        let project = await Project.findById(req.params.id);
        
        //project exists
        if(!project){return res.status(404).json({msg: 'project not found'})}
        
        //project creator  is valid
        if(project.creator.toString() !== req.user.id){
            return res.status(401).send('unauthorized')
        }
        //update
        project = await Project.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Project deleted'})

    } catch (error) {
        console.log(Error);
        res.status(500).send('Error')
    }
}