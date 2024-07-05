const mongoose = require('mongoose')
const avis = mongoose.Schema({
   
    avocatID:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'avocat',
        required:true
    },
    clientID:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'client',
        required:true
    },
    nbAvis:{
        type : Number,
        required:true
    },
    
})
module.exports = mongoose.model('avis', avis)