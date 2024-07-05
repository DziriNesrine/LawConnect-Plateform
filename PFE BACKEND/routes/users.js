var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const Avocat = require('../models/avocat');
const contrchat= require('../controller/contChat');
const Admin = require('../models/admin')
const contrv = require('../controller/contV');
const contrC= require('../controller/contCL');
const contrS = require('../controller/contS');
const contrAV = require('../controller/contAV');
const contrCL= require('../controller/contCL');
const { addAvis } = require('../controller/contAvis');
const { getCID, rendez_vous, getCV } = require('../controller/contC');
const { messageCL, messageAV } = require('../controller/contChat');
require('../controller/contC')

const { signinA } = require('../controller/contA');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
  });
  
  var upload = multer({storage: storage});

/* GET users listing. */
/* CRUD Admin */
router.post('/addA', addA);
router.post('/signinA', signinA);
router.patch("/updateA/:id" ,updateA);
router.delete('/deleteA/:id' ,deleteA);
router.get('/getA',getA)

/* CRUD Avocat*/
router.post('/addAV', addAV);
router.get('/getAV2', getAvocatAvis);
router.get('/getAV', getAV);
router.get('/getAVID/:id', getAVID);
router.post('/signinAV', signinAV);
router.patch("/statusAV/:id" ,statusAV)
router.patch("/updateAV/:id" ,upload.single('file'),updateAV)
router.post('/file/:id', upload.single('file'), image)
router.patch("/avis/:id" ,avisAV)
router.delete('/deleteAV/:id' ,deleteAV);
router.post('/cin/:id', upload.single('cinP') ,cinP)
router.post('/diplome/:id', upload.single('piece'), piece)

/* CRUD Client*/
router.post('/addCL', addCL);
router.get('/getCL', getCL);
router.get('/getCLID/:id', getCLID);
router.post('/signinCL', signinCL);
router.patch("/updateCL/:id" ,updateCL)
router.delete('/deleteCL/:id' ,deleteCL);
/* CRUD CITY*/
router.post('/city', addC);
router.get('/getC', getC);

/* CRUD speciality*/
router.post('/speciality', addS);
router.post('/file/:id', upload.single('file'), image)
router.get('/getS', getS);
router.patch('/updateS/:id', updateS);
router.delete('/deleteS/:id', deleteS);

/* CRUD Avis*/
router.get('/getAvis/:id', totalAvis);
router.post('/avis', addAvis);

/* CRUD Calendar*/
router.get('/getDateVide/:id',getCID);
router.get('/getCVide',getCV);
router.get('/getDateNV/:id',getRendezValide);//NONVALIDE
router.get('/getDate/:id',getRendez); //VALIDE
router.get("/getRV/:id",getRendezClient) //RendezVousClient
router.get("/getRVTD/:id",getRendezClientTD) //RendezVousClientToDay
router.post('/date',addCl);
router.patch("/rendez_vous/:id",rendez_vous)
router.patch("/ValiderRV/:id",valide_RendezVous)
router.delete('/deleteDate/:id',deleteDate);
router.post('/payer/:id', upload.single('file'), paye)

/* CRUD Chat*/
router.get('/chat/:room/:clientName',getchat);
router.get('/chatR/:room',getchatIDR);
router.get('/chatCL/:clientName',getchatID);
router.post('/chatcl',messageCL);
router.post('/chatAV',messageAV);

//setup of dependencies
server.listen(4000);

/*socket io*/
io.on('connection', function (socket) {
  console.log('User connected');
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
  socket.on('save-message', function (data) {
    console.log(data);
    io.emit('new-message', { message: data });
  });
});


module.exports = router;
