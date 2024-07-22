const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const nodeCron = require('node-cron');
const cors = require('cors'); 

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',

  }
});



server.listen(4600, () => {
  console.log('Serveur Socket.io en écoute sur le port 4600');
});


io.on('connection', (socket) => {
  
  console.log('Nouveau client connecté');

  socket.on('frontendEvent', (data) => {
    console.log('Événement reçu du frontend:', data);

  });

  socket.on('disconnect', () => {
    console.log('Client déconnecté');
  });
});


nodeCron.schedule('* * * * *', async () => {
  const now = new Date();
  now.setSeconds(0, 0); 

  try {
   
    const Calendar = require('../models/calendar'); 

    const appointments = await Calendar.find({
      date: now,
      notificationSent: false,
      status: true,
    });

    console.log("Rendez-vous trouvés:", appointments, now);
     io.emit('BackendEvent', {
      message: 'hello from backend .'
    });

    appointments.forEach(async (appointment) => {
      io.emit('appointmentNotification', {
        clientId: appointment.clientId,
        message: 'Votre rendez-vous est arrivé.'
      });

      appointment.notificationSent = true;
      await appointment.save();
    });
  } catch (error) {
    console.error('Erreur lors de la vérification des rendez-vous:', error);
  }
});



module.exports = app;