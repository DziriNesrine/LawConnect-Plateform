const mongoose = require('mongoose')
const admin = mongoose.Schema({
   
    nameA:{
        type : String,
        required:true
    },
    emailA :{
        type : String,
        required:true
    },
    passwordA :{
        type : String,
        required:true
    },
    
})
module.exports = mongoose.model('admin', admin)