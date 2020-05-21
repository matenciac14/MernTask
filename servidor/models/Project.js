const mongoose  = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    create:{
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Project', ProjectSchema);