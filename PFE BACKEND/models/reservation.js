const mongoose = require('mongoose');

const Reservation =  mongoose.Schema({
    avocatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'avocat',  // Ensure the reference matches the model name
        required: true
    },
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',  // Ensure the reference matches the model name
        required: true
    }
});

module.exports = mongoose.model('Reservation', Reservation);
