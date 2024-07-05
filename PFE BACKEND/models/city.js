const mongoose = require('mongoose')
const city = mongoose.Schema({
   
    city:{
        type : String,
        required:true
    },
  
    
    
})
module.exports = mongoose.model('city', city)