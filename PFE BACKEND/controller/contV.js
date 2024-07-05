const City = require('../models/city')
addC= function(req, res, next) {
        const newCity= new City ({
          city :req.body.city ,
        
        })
        newCity.save().
        then(resalt=>{
          res.status(200).json({
            massage : 'city already created'
          })
          
        }).
        catch(err=>{
          res.status(404).json({
            massage : err
          })
        })
      }
      getC =(req,res,next)=>{
        City.find()
        .then(resultat=>{
            res.status(200).json(
                resultat
        )})
        .catch(err=>{
            res.status(404).json({
            massage :err 
      
        })})}
module.exports={
    addC : addC ,
    getC : getC }
