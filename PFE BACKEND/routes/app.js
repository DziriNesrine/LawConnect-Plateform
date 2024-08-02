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

const users = [];

// Événements Socket.io pour les connexions, déconnexions, et événements spécifiques
io.on('connection', (socket) => {
  console.log('Nouveau client connecté');

  // Événements de votre code initial
  socket.on('frontendEvent', (data) => {
    console.log('Événement reçu du frontend:', data);
  });

  socket.on('disconnect', () => {
    console.log('Client déconnecté');
  });

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User ${socket.user.userId} joined room ${room}`);
  });

  socket.on('leave_room', (room) => {
    socket.leave(room);
    console.log(`User ${socket.user.userId} left room ${room}`);
  });

  socket.on('video_offer', (data) => {
    socket.to(data.room).emit('video_offer', data.offer);
  });

  socket.on('video_answer', (data) => {
    socket.to(data.room).emit('video_answer', data.answer);
  });

  socket.on('ice_candidate', (data) => {
    socket.to(data.room).emit('ice_candidate', data.candidate);
  });
});

// Tâche cron pour vérifier les rendez-vous et envoyer des notifications
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
        clientId: appointment.clientID,
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
