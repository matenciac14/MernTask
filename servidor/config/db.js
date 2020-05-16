const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'});


//connect database
const  connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('database is connect')
    } catch (error) {
        console.log(error);
        process.exit(1); //stop app
    }
}

module.exports = connectDB;
