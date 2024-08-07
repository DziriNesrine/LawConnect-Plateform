const Reservation = require('../models/reservation');

// Méthode pour obtenir toutes les réservations
 getReservations = (req, res, next) => {
    Reservation.find()
        .populate('clientID', 'fNameCL lNameCL')  // Inclure les champs du client si nécessaire
        .populate('avocatID', 'fNameAV lNameAV')  // Inclure les champs de l'avocat si nécessaire
        .then(reservations => {
            if (!reservations || reservations.length === 0) {
                return res.status(404).json({
                    message: 'Aucune réservation trouvée'
                });
            }
            res.status(200).json(reservations);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: 'Erreur interne du serveur',
                error: err.message
            });
        });
};

module.exports = {
    getReservations
};
