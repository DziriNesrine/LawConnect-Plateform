import { Injectable } from '@angular/core';

import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  public socket: Socket
  constructor() {
    // Connectez-vous à votre serveur Socket.io
    this.socket = io('http://localhost:4600');

    this.socket = io(environment.SOCKET_ENDPOINT);

    // Écoutez les événements du serveur
    this.socket.on('appointmentNotification', (data: any) => {
      console.log('Notification de rendez-vous:', data);
    });
  }

  // Vous pouvez ajouter des méthodes pour émettre des événements si nécessaire
  //public emitEvent(): void {
  //  this.socket.emit('test', 'Ceci est un message de test');
 // }

  // Méthode pour émettre des événements
  emitPaymentCompleted(data: any) {
    this.socket.emit('paymentCompleted', data);
  }

 // Méthode générique pour émettre des événements
 public emitEvent(): void {
  this.socket.emit('test', 'Ceci est un message de test');
}

  onAppointmentNotification(callback: (data: any) => void) {
    this.socket.on('appointmentNotification', callback);
  }
  }


