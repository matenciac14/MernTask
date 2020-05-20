const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


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
            return res.status(400).json({msg:'The user dont Exists'});
        }

        //compare password
        const passok = await bcryptjs.compare(password, user.password);
        if(!passok){
            return res.status(400).json({msg:'error pasword'});
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