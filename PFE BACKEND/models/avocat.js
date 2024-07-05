const mongoose = require('mongoose')
const calendar = require('./calendar')
const avocat = mongoose.Schema({
    cinAV :{
        type: Number,
        required: true
    }, 
    picture:{
        type: String,
        
    },
    cinP:{
        type: String,
        
    },
    card :{
        type: Number

    },
    piece:{
        type: String,
        
    },
    fNameAV:{
        type : String,
        required:true
    },
    lNameAV:{
        type : String,
        required:true
    },
    emailAV :{
        type : String,
        required:true
    },
    passwordAV :{
        type : String,
        required:true
    },
    specialityAV :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'speciality',
        required:true
    },
    cityAV :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'city',
        required:true
    },
    phoneAV :{
        type: Number,
        required:true
    },
    prix :{
        type: Number
    },
    sexeAV :{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    },
    languages : {
        type: String

    },
    diplome :{
        type: String

    },
    training:{
        type: String

    },
    Cabinet:{
        type: String

    },
    avis:{
        type: Number,
        default: 0

    },
    calendar:{
        type: Array,
        
    }

    
})
module.exports = mongoose.model('avocat', avocat)