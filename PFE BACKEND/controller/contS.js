
const speciality = require('../models/speciality')
const Speciality = require('../models/speciality')

addS = function(req, res, next) {
  console.log(req.body.speciality)
  console.log(req.body.image)
  
  const newSpeciality = new Speciality({
    speciality: req.body.speciality,
    image: req.body.image
  })

  newSpeciality.save()
    .then(result => {
      res.status(200).json({
        message: 'Speciality already created'
      })
    })
    .catch(err => {
      res.status(404).json({
        message: err
      })
    })
}

getS =(req,res,next)=>{
  Speciality.find()
  .then(resultat=>{
      res.status(200).json(
          resultat
  )})
  .catch(err=>{
      res.status(404).json({
      massage :err 

  })})}
  updateS = (req, res, next) => {
    const speciality = {
        speciality: req.body.speciality,
        image: req.body.image
    }

    Speciality.findOneAndUpdate({ _id: req.params.id }, { $set: speciality })
        .then(result => {
            if (result) {
                console.log(result)
                res.status(202).json({
                    message: 'speciality already updated'
                })
            } else {
                res.status(404).json({
                    message: 'speciality not found'
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })
        })
}

deleteS = (req, res, next) => {
  Speciality.deleteOne({ _id: req.params.id }).
      then(resualt => {
          if (resualt) {
              res.status(200).json({
                  massage: 'Speciality deleted'
              })

          } else {
              res.status(404).json({
                  massage: 'Speciality not found'
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
  const speciality = {
      picture: "http://localhost:5000/images/" + req.file.filename
  }
  console.log("image speciality")
  Speciality.findOneAndUpdate({ _id: req.params.id }, { $set: speciality }).
      then(resault => {
          if (resault) {

              res.status(202).send(['image apdated']);

          } else {
              res.status(404).json({
                  massage: 'speciality not found'

              })
          }
      }).catch(err => {
          res.status(404).json({
              massage: err
          })
      })
}



module.exports={
    addS : addS,
    getS : getS,
    updateS : updateS ,
    deleteS : deleteS,
    image: image 
  }
