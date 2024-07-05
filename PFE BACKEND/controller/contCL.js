const bcrypt = require('bcrypt');
const Client = require('../models/client')
var jwt = require ('jsonwebtoken');
const { signinA } = require('./contA');
const client = require('../models/client');
    addCL= function(req, res, next) {
        Client.find({emailCL: req.body.emailCL}).
                then(ress=>{
                    if(ress.length < 1){
                        bcrypt.hash(req.body.passwordCL, 10 ,(err,hash)=>{
                        if(err){
                            res.status(404).json({
                            massage : err })
                        }else{
                            const newClient= new Client({ 
                            fNameCL:req.body.fNameCL,
                            lNameCL:req.body.lNameCL,
                            emailCL: req.body.emailCL,
                            passwordCL: hash,
                            cityCL: req.body.cityCL,
                            phoneCL: req.body.phoneCL,
                            sexeCL: req.body.sexeCL,})
                            console.log(newClient)
                            newClient.save().
                            then(resalt=>{
                                    res.status(200).json({
                                    massage : 'Client already created'}) })
                            .catch(err=>{
                                    res.status(404).json({
                                    massage : err})})
                            }
                    })}
                    else{
                        res.status(404).send(['Duplicate email adrress found.']);
                        console.log('Duplicate email adrress found')
                    }})
                .catch(err=>{
                    res.status(404).json({
                    massage :err  })})}
            
    getCL =(req,res,next)=>{
        Client.find().populate('cityCL','city')
        .then(resultat=>{
            res.status(200).json(
            resultat)})
        .catch(err=>{
             res.status(404).json({
            massage :err 
        
            })})}
    getCLID =(req,res,next)=>{
            Client.find({_id : req.params.id}).populate('cityCL','city')
            .then(resultat=>{
                res.status(200).json(
                resultat)})
            .catch(err=>{
                res.status(404).json({
                massage :err 
            
                })})}
    deleteCL=(req , res,next)=>{
        Client.deleteOne({_id : req.params.id}).
        then(resualt =>{
        if (resualt) {
            res.status(200).json({
            massage : 'Client deleted'
            })
            
        } else {
            res.status(404).json({
            massage : 'Client not found'
            })
            
        }
        
        }).
        catch(err => {
        res.status(404).json({
            massage: err
        })
        }) }   
    updateCL = (req,res,next)=>{
        let client;
        if(req.body.passwordCL === undefined){ 
              client= {
                fNameCL:req.body.fNameCL,
                lNameCL:req.body.lNameCL,
                emailCL: req.body.emailCL,
                cityCL: req.body.cityCL,
                phoneCL: req.body.phoneCL,
                age:req.body.age,
                information : req.body.information,
               }
               console.log(client)
        }
        else{
             bcrypt.hash(req.body.passwordCL, 10 ,(err,hash)=>{
                    if(err){
                        res.status(404).json({
                        massage : err })
                    }else{
                  client ={
                        fNameCL:req.body.fNameCL,
                        lNameCL:req.body.lNameCL,
                        emailCL: req.body.emailCL,
                        cityCL: req.body.cityCL,
                        phoneCL: req.body.phoneCL,
                        passwordCL : hash,
                        age:req.body.age,
                        information : req.body.information,
                        }}
                        console.log(client)
                      
                })}
                Client.findOneAndUpdate({_id : req.params.id},{$set : client}).
                then(resault=>{
                    if(resault){
                    console.log(resault)
                    res.status(202).json({
                    massage: 'Client already updated'
            
                    })}else{
                    res.status(404).json({
                        massage: 'Client not found'
            
                    })}
                }).catch(err=>{
                    res.status(404).json({
                    massage :err 
                    })
                })}
    signinCL = function  (req, res, next) {
        console.log(req)
     Client.find({emailCL : req.body.emailCL}).
        then(client=>{
            
            if(client.length >=1){
                const clientID = client[0]._id
           console.log(client,"hhhhhhhhh")
                const token = jwt.sign({_id:client._id},'secret')
                bcrypt.compare(req.body.passwordCL , client[0].passwordCL)
                .then(resault=>{
                    if(resault){
                        res.status(200).send([
                         "welcome", 
                         token,
                         clientID
                         
                        ])
                      
                        }
                    else{
                       res.status(404).send([
                            "worng password"])
                        }
                }).catch(err=>{
                    res.status(404).json({ 
                    massage :err  })})
                  
            }else{
                res.status(404).json([
                "wrong  Client name" ])}})
        .catch(err=>{
            res.status(404).json({
            massage :err  })
                      
        })}
    
    module.exports={
        addCL : addCL,
        getCL : getCL,
        deleteCL :deleteCL,
        updateCL : updateCL,
        signinCL : signinCL,
        getCLID: getCLID}