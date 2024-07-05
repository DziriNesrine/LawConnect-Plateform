const bcrypt = require('bcrypt');
const Admin = require('../models/admin')
var jwt = require ('jsonwebtoken')
signinA = function  (req, res, next) {
  Admin.find({emailA : req.body.emailA}).
  then(admin=>{
    if(admin.length >=1){
    const token = jwt.sign({_id:admin._id},'secret',
      { expiresIn: 60},)
    bcrypt.compare(req.body.passwordA , admin[0].passwordA)
      .then(resault=>{
        if(resault){
          res.status(200).json({
            massage:"welcome",
            token})
          }
        else{
          res.status(404).send([
             "worng password"
          ])
        }
    }).catch(err=>{
      res.status(404).json({ 
        massage :err 

    })})

      }else{
        res.status(404).json([
          "wrong  admin name"
        ])
      }
    })
    .catch(err=>{
      res.status(404).json({
        massage :err 
      })
    
    })

  }
    addA= function(req, res, next) {
        Admin.find({emailA : req.body.emailA}).
        then(admin=>{
            if(admin.length < 1){
                bcrypt.hash(req.body.passwordA, 10 ,(err,hash)=>{
                if(err){
                    res.status(404).json({
                    massage : err })
                }else{
                    const admin = new Admin({
                    nameA :req.body.nameA ,
                    emailA : req.body.emailA ,
                    passwordA: hash })
                    admin.save().
                    then(resalt=>{
                            console.log(Admin)
                            res.status(200).json({
                            massage : 'Admin already created'}) })
                    .catch(err=>{
                            res.status(404).json({
                            massage : err})})}
                            })} 
            else{
                res.status(404).send(['Duplicate email adrress found.']);

            }}).catch(err=>{
                res.status(404).json({
                massage :err 
                })
            })
        }
     
        updateA = (req,res,next)=>{
            bcrypt.hash(req.body.passwordA,10).
            then(hash=>{
              const admin= {
                nameA: req.body.nameA,
                emailA: req.body.emailA,
                passwordA : hash
              }
              Admin.findOneAndUpdate({_id : req.params.id},{$set : admin}).
              then(resault=>{
                if(resault){
                console.log(resault)
                res.status(202).json({
                  massage: 'admin  already apdated'
          
                })}else{
                  res.status(404).json({
                    massage: 'admin not found'
          
                })}
              }).catch(err=>{
                res.status(404).json({
                  massage :err 
                })
              })
            }).catch(err=>{
              res.status(404).json({
                massage :err 
              })
            
           
          })}
          deleteA=(req , res,next)=>{
            Admin.deleteOne({_id : req.params.id}).
            then(resualt =>{
              if (resualt) {
                res.status(200).json({
                  massage : ' admin deleted'
                })
                
              } else {
                res.status(404).json({
                  massage : ' admin not found'
                })
                
              }
              
            }).
            catch(err => {
              res.status(404).json({
                massage: err
              })
            }) }
        getA=(req,res,next)=>{
        Admin.find()
        .then(resultat=>{
            res.status(200).json(
                resultat
        )})
        .catch(err=>{
            res.status(404).json({
            massage :err 
    
        })})}
    
    module.exports={
        addA:addA,
        signinA:signinA,
        updateA:updateA,
        deleteA:deleteA,
        getA:getA

    }
         