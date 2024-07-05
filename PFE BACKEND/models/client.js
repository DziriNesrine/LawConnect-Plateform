const mongoose = require('mongoose')
const client = mongoose.Schema({
   
    fNameCL:{
        type : String,
        required:true
    },
    lNameCL:{
        type : String,
        required:true
    },
    emailCL :{
        type : String,
        required:true
    },
    passwordCL:{
        type : String,
        required:true
    },
    cityCL :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'city',
        required:true
    },
    phoneCL :{
        type: Number,
        required:true
    },
    sexeCL:{
        type: String,
        required:true
    },
    age :{
        type: Number
    },
    information : {
        type: String 
    },
    
    
})
module.exports = mongoose.model('client', client)