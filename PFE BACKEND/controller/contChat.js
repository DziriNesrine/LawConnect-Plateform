var Chat = require('../models/chat.js');

/*get room chats "speciality and client "*/
getchat = (req,res,next)=>{
    Chat.find({room: req.params.room , clientName: req.params.clientName}).populate('clientName','fNameCL , lNameCL' ).populate('room', 'speciality').populate('avocatName','fNameAV , lNameAV')
    .then(resultat=>{
        res.status(200).json(
            resultat
    )})
    .catch(err=>{
        res.status(404).json({
        massage :err 

    })})}
/* get room chats "speciality  */
getchatIDR = (req,res,next)=>{
    Chat.find({room: req.params.room }).populate('room', 'speciality').populate('clientName','fNameCL , lNameCL').populate('avocatName','fNameAV , lNameAV')
    .then(resultat=>{
        res.status(200).json(
            resultat
    )})
    .catch(err=>{
        res.status(404).json({
        massage :err 

    })})}

/* get id client */
getchatID = (req,res,next)=>{
    Chat.find({ clientName: req.params.clientName}).populate('clientName','fNameCL , lNameCL').populate('avocatName','fNameAV , lNameAV')
    .then(resultat=>{
        res.status(200).json(
            resultat
    )})
    .catch(err=>{
        res.status(404).json({
        massage :err 

    })})}
/* chat  post avocat */
messageAV = function(req, res, next) {
         const chat = new Chat({
            room : req.body.room,
            clientName : req.body.clientName,
            avocatName : req.body.avocatName,
            message: req.body.message ,
                })
        chat.save().
        then(resultat=>{
             console.log(chat)
             res.status(200).json(chat) })
        .catch(err=>{
             res.status(404).json({
             massage : err})})}
/* chat  post client*/
messageCL = function(req, res, next) {
    const chat = new Chat({
        room : req.body.room,
        clientName : req.body.clientName,
        avocatName : req.body.avocatName,
        message: req.body.message ,
            })
        console.log(chat)
    chat.save().
    then(resultat=>{
         console.log(chat)
         res.status(200).json(chat) })
    .catch(err=>{
        console.log(chat)
         res.status(404).json({
             
         massage : err})})}


/******** UPDATE CHAT *****/
chatupdate=function(req, res, next) {
    const chat= {
        status: req.body.status,
      }
      Chat.findOneAndUpdate({_id : req.params.id},{$set : chat}).
      then(resultat=>{
        if(resultat){
        console.log(resultat)
        res.status(202).json({
          massage: 'msg vu '
  
        })}
      }).catch(err=>{
        res.status(404).json({
          massage :err 
        })
      })
    
};

/* DELETE CHAT 
Chatdelete =function(req, res, next) {
  Chat.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
};*/

module.exports = {
    /*
    chatupdate : chatupdate,
    Chatdelete : Chatdelete*/
    getchat : getchat,
    messageAV : messageAV,
    messageCL : messageCL,
    getchatID : getchatID,
    getchatIDR : getchatIDR
}; 