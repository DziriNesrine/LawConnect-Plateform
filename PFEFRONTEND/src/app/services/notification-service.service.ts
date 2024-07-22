import { Injectable } from '@angular/core';

import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  public socket: Socket
  constructor() {


    this.socket = io('http://localhost:4600'); 
  this.socket.on('BackendEvent', (data) => {
    console.log('Événement BackendEvent reçu:', data);
  });
  this.socket.on('appointmentNotification', (data) => {
    console.log('Événement BackendEvent reçu:', data);
  });
  }
  emitEvent(event: string, data: any): void {
    this.socket.emit(event, data);
  }
  
  onEvent(event: string, action: (...args: any[]) => void): void {
    this.socket.on(event, action);
  }
  // Vous pouvez ajouter des méthodes pour émettre des événements si nécessaire
  //public emitEvent(): void {
  //  this.socket.emit('test', 'Ceci est un message de test');
 // }

  // Méthode pour émettre des événements
  emitPaymentCompleted(data: any) {
    this.socket.emit('paymentCompleted', data);
  }

  onAppointmentNotification(callback: (data: any) => void) {
    this.socket.on('appointmentNotification', callback);
  }
  }





  



