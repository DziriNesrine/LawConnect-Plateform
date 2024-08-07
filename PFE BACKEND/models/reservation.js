const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
        required: true
    },
    avocatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'avocat',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
