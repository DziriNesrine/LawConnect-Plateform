const bcrypt = require('bcrypt');
const Avocat = require('../models/avocat')
var jwt = require('jsonwebtoken');
var multer = require('multer');
const Avis = require('../models/avis');
var { totalAvis } = require('./contAvis');



addAV = function (req, res, next) {
    Avocat.find({ cinAV: req.body.cinAV }).
        then(Result => {
            if (Result.length < 1) {
                Avocat.find({ emailAV: req.body.emailAV }).
                    then(ress => {
                        if (ress.length < 1) {
                            bcrypt.hash(req.body.passwordAV, 10, (err, hash) => {
                                if (err) {
                                    res.status(404).json({
                                        massage: err
                                    })
                                } else {
                                    if (req.body.sexeAV == "femme") {
                                        img = 'http://localhost:5000/images/womenA.png'
                                    } else {
                                        img = 'http://localhost:5000/images/manA.png'

                                    }
                                    const newAvocat = new Avocat({
                                        cinAV: req.body.cinAV,
                                        fNameAV: req.body.fNameAV,
                                        lNameAV: req.body.lNameAV,
                                        emailAV: req.body.emailAV,
                                        passwordAV: hash,
                                        specialityAV: req.body.specialityAV,
                                        cityAV: req.body.cityAV,
                                        phoneAV: req.body.phoneAV,
                                        prix: req.body.prix,
                                        sexeAV: req.body.sexeAV,
                                        status: req.body.status,
                                        picture: img
                                    })
                                    newAvocat.save().
                                        then(resalt => {
                                            res.status(200).json({
                                                massage: 'Avocat already created'
                                            })
                                        })
                                        .catch(err => {
                                            res.status(404).json({
                                                massage: err
                                            })
                                        })
                                }
                            })
                        }
                        else {
                            res.status(404).send(['Duplicate email adrress found.']);
                            console.log('Duplicate email adrress found')
                        }
                    })
                    .catch(err => {
                        res.status(404).json({
                            massage: err,
                        })
                    })
            }
            else {
                res.status(404).send(['Duplicate CIN  found.']);
                console.log('Duplicate CIN  found')
            }
        })
        .catch(err => {
            res.status(404).json({
                massage: err
            })
        })
}
getAV = (req, res, next) => {
    Avocat.find({}).populate('specialityAV', 'speciality').populate('cityAV', 'city')
        .then(resultat => {
            res.status(200).json(
                resultat
            )
        })
        .catch(err => {
            res.status(404).json({
                massage: err

            })
        })
}


getAVV = (req, res, next) => {
    Avocat.find({ status: true }).populate('specialityAV', 'speciality').populate('cityAV', 'city')
        .then(resultat => {
            res.status(200).json(
                resultat
            )
        })
        .catch(err => {
            res.status(404).json({
                massage: err

            })
        })
}


getAVID = (req, res, next) => {
    Avocat.find({ _id: req.params.id }).populate('specialityAV', 'speciality').populate('cityAV', 'city')
        .then(resultat => {
            res.status(200).json(
                resultat
            )
        })
        .catch(err => {
            res.status(404).json({
                massage: err

            })
        })
}

getAvocatAvis = (req, res, next) => {
    Avocat.find({}).populate('specialityAV', 'speciality').populate('cityAV', 'city')
        .then(async resultat => {
            for (let x of resultat) {
                await Avis.find({ avocatID: x._id })
                    .then(resultat => {
                        console.log(resultat)
                        nbP = 0
                        totalAvis = 0
                        for (i = 0; i < resultat.length; i++) {
                            totalAvis = totalAvis + resultat[i].nbAvis
                            nbP = nbP + 1
                        }
                        console.log(totalAvis)
                        if (0 >= totalAvis) {
                            x.avis = 0.;
                        }
                        if (0 < totalAvis && totalAvis <= 15) {
                            x.avis = 1;
                        }
                        else if (16 <= totalAvis && totalAvis <= 25) {
                            x.avis = 2;
                        }
                        else if (25 <= totalAvis && totalAvis <= 35) {
                            x.avis = 3;
                        }
                        else if (35 <= totalAvis && totalAvis <= 45) {
                            x.avis = 4;
                        }
                        else {
                            x.avis = 5;
                        }
                    })
                    .catch(err => {
                        res.status(500).json({
                            massage: err

                        })
                    })
            }
            res.status(200).json(
                resultat
            )
        })
        .catch(err => {
            res.status(404).json({
                massage: err

            })
        })
}
deleteAV = (req, res, next) => {
    Avocat.deleteOne({ _id: req.params.id }).
        then(resualt => {
            if (resualt) {
                res.status(200).json({
                    massage: 'Avocat deleted'
                })

            } else {
                res.status(404).json({
                    massage: 'Avocat not found'
                })

            }

        }).
        catch(err => {
            res.status(404).json({
                massage: err
            })
        })
}
image = (req, res, next) => {
    console.log(req.file.filename);
    const file = req.file;
    if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    const avocat = {
        picture: "http://localhost:5000/images/" + req.file.filename
    }
    console.log("image avocat")
    Avocat.findOneAndUpdate({ _id: req.params.id }, { $set: avocat }).
        then(resault => {
            if (resault) {

                res.status(202).send(['image apdated']);

            } else {
                res.status(404).json({
                    massage: 'avocat not found'

                })
            }
        }).catch(err => {
            res.status(404).json({
                massage: err
            })
        })
}
updateAV = (req, res, next) => {
    let avocat = {
        fNameAV: req.body.fNameAV,
        lNameAV: req.body.lNameAV,
        emailAV: req.body.emailAV,
        cityAV: req.body.cityAV,
        phoneAV: req.body.phoneAV,
        prix: req.body.prix,
        status: req.body.status,
        languages: req.body.languages,
        diplome: req.body.diplome,
        training: req.body.training,
        Cabinet: req.body.Cabinet,
        card: req.body.card
    };

    // Vérifie si un nouveau mot de passe a été fourni
    if (req.body.passwordAV !== undefined) {
        // Si oui, hachez le nouveau mot de passe et ajoutez-le à l'objet avocat
        bcrypt.hash(req.body.passwordAV, 10, (err, hash) => {
            if (err) {
                res.status(404).json({ massage: err });
            } else {
                avocat.passwordAV = hash;

                // Met à jour le document avocat dans la base de données
                Avocat.findOneAndUpdate({ _id: req.params.id }, { $set: avocat })
                    .then(result => {
                        if (result) {
                            console.log(avocat);
                            res.status(202).send(['avocat already updated']);
                        } else {
                            res.status(404).json({ massage: 'avocat not found' });
                        }
                    })
                    .catch(err => {
                        res.status(404).json({ massage: err });
                    });
            }
        });
    } else {
        // Si aucun nouveau mot de passe n'est fourni, mettez simplement à jour l'avocat sans modifier le mot de passe
        Avocat.findOneAndUpdate({ _id: req.params.id }, { $set: avocat })
            .then(result => {
                if (result) {
                    console.log(avocat);
                    res.status(202).send(['avocat already updated']);
                } else {
                    res.status(404).json({ massage: 'avocat not found' });
                }
            })
            .catch(err => {
                res.status(404).json({ massage: err });
            });
    }
};

signinAV = function (req, res, next) {
    Avocat.findOne({ cinAV: req.body.cinAV })
        .then(avocat => {
            if (avocat) {
                return Avocat.findOne({ emailAV: req.body.emailAV });
            } else {
                throw new Error("wrong Avocat CIN");
            }
        })
        .then(resultat => {
            if (resultat) {
                if (resultat.status === true) {
                    const avocatID = resultat._id;
                    const token = jwt.sign({ _id: resultat._id }, 'secret');
                    return bcrypt.compare(req.body.passwordAV, resultat.passwordAV)
                        .then(resault => {
                            if (resault) {
                                res.status(200).send([
                                    "welcome",
                                    token,
                                    avocatID
                                ]);
                            } else {
                                throw new Error("wrong password");
                            }
                        });
                } else {
                    console.log(resultat);
                    console.log("piecejustificative", resultat.cinP, resultat.piece);
                    if (!resultat.cinP || !resultat.piece) {
                        res.status(404).json({ message: "piéce manquant", id: resultat.id });
                    } else {
                        res.status(409).json({message:"votre demande n'est pas encore acceptée"})
                        
                    }
                }
            } else {
                throw new Error("wrong Email");
            }
        })
        .catch(err => {
            res.status(404).json({ message: err.message });
        });
};
avisAV = (req, res, next) => {
    if (0 <= req.body.avis && req.body.avis <= 5) {
        let x = req.body.avis
        Avocat.find({})
            .then(resultat => {
                avisB = resultat[0].avis
                avisN = (req.body.avis / 25)
                avisT = avisB + avisN
                const avocat = {
                    avis: avisT,
                }
                Avocat.findOneAndUpdate({ _id: req.params.id }, { $set: avocat }).
                    then(resault => {
                        if (resault) {
                            res.status(202).send(['avis Ajoutee']);
                            console.log(avocat)

                        } else {
                            res.status(404).json({
                                massage: 'avocat not found'

                            })
                        }
                    }).catch(err => {
                        res.status(404).json({
                            massage: err
                        })
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
    else {
        res.status(404).json({
            massage: 'error'
        })
    }
}

cinP = (req, res, next) => {
    console.log("rew",req);
    const avocat = {
        cinP:  req.body.cinP,
    };
    console.log(avocat)
    return Avocat.findOneAndUpdate({ _id: req.params.id }, { $set: avocat })
        .then(resault => {
            if (resault) {
                res.status(202).send(['cinP updated']);
            } else {
                throw new Error('avocat not found');
            }
        });
}
piece = (req, res, next) => {
    console.log(req.file);
    const avocat = {
        piece:  req.body.piece,
    };
    console.log(avocat)
    return Avocat.findOneAndUpdate({ _id: req.params.id }, { $set: avocat })
        .then(resault => {
            if (resault) {
                res.status(202).send(['piece updated']);
            } else {
                throw new Error('avocat not found');
            }
        });
}


statusAV = (req, res, next) => {
    const avocat = {
        status: req.body.status,
    }
    Avocat.findOneAndUpdate({ _id: req.params.id }, { $set: avocat }).
        then(resault => {
            if (resault) {
                console.log(avocat)
                console.log(resault)
                res.status(202).send(['avocat already apdated']);

            } else {
                res.status(404).json({
                    massage: 'avocat not found'
                })
            }
        }).catch(err => {
            res.status(404).json({
                massage: err
            })
        })
}

module.exports = {
    addAV: addAV,
    getAV: getAV,
    deleteAV: deleteAV,
    updateAV: updateAV,
    signinAV: signinAV,
    avisAV: avisAV,
    getAVID: getAVID,
    image: image,
    piece: piece,
    cinP: cinP,
    statusAV: statusAV,
    getAVV: getAVV

}