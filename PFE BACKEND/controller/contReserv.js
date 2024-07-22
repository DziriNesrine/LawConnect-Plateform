const Reservation = require('../models/Reservation');

const getRS = (req, res, next) => {
    Reservation.find()
        .populate('avocatID', 'avocat') 
        .populate('clientID', 'client')  
        .then(resultat => {
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

module.exports = {
    getRS: getRS,
};
