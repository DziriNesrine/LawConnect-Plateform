const mongoose = require('mongoose')

var ChatSchema = new mongoose.Schema({
  room: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'speciality'
  },
  avocatName: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'avocat',
    default : null
  },
  clientName: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'client',
    require : true
  },
  message: {
     type : String
    },
  updated_at:
   { type: Date, 
    default: Date.now },
   status : {
    type : Boolean ,
    default : false
  }
});

module.exports = mongoose.model('Chat', ChatSchema);
