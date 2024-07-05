const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const nodeCron = require('node-cron');

// Initialisation de l'application Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(cors());

// Modèle de calendrier pour MongoDB (remplacez par votre propre modèle)
const Calendar = require('../models/calendar');

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Tâche planifiée avec node-cron
nodeCron.schedule('* * * * *', async () => {
  const now = new Date();
  now.setSeconds(0, 0); // Arrondir à la minute précise

  try {
    const appointments = await Calendar.find({
      date: now,
      notificationSent: false,
      status: true,
    });

    console.log("Rendez-vous trouvés:", appointments, now);

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

// Route par défaut pour tester la connexion
app.get('/', (req, res) => {
  res.send('Socket.io server is running.');
});

server.listen(4600, () => {
  console.log('Serveur Socket.io en écoute sur le port 4600');
});
// Exporter l'application Express
module.exports = app;