const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.userAuthenticated = async (req, res) =>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Error'})
    }
}

exports.autenticateUser = async (req, res) =>{
    //view the error
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({msg:"user doesn't exist"});
        }

        //compare password
        const passok = await bcryptjs.compare(password, user.password);
        if(!passok){
            return res.status(400).json({msg:'password incorrect'});
        }


        //create and firm the jwr
        const payload = {
            user:{
                id: user.id
            }
        };
        //firm token
        jwt.sign(payload,process.env.SECRET,{
            expiresIn:3600
        }, (error, token) =>{
            if(error) throw error;

            res.json({token});
        })
        
    } catch (error) {
        console.log(error)
    }

}