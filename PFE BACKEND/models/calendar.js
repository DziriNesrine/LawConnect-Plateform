const mongoose = require('mongoose')
const calendar = mongoose.Schema({
   
    avocatID:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'avocat',
        required:true
    },
    clientID:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'client',
        
    },
    date:{
        type : Date,
        required:true
    },
    notificationSent:{
        type: Boolean,
        default: false
    },
    status:{
        type : Boolean,
        default: false
    },
    paye:{
        type : String
      
    },
    information :  
        {        
            situationfamiliale: {
                type: String
                },
                enfants : {
                type: String
                },
                situationprofessionnelle : {
                    type: String
    
                }
           
        }
    
        

    
    
})
module.exports = mongoose.model('calendar', calendar)