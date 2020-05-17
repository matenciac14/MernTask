const User = require('../models/User');

exports.createUser = async (req, res) =>{
    const { email, password } = req.body;

    try {
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({msg:'The user Exists'});
        }

        //create user
        user = new User(req.body);
        //save the new user
        await user.save();
        res.json({msg:'User Created OK'});
    } catch (error) {
        console.log(Error);
        res.status(400).send('Error')
    }
}