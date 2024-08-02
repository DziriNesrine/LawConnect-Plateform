
import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
declare var SimplePeer: any;

interface Peer {
  signal: (data: any) => void;
  addStream: (stream: MediaStream) => void;
  removeStream: (stream: MediaStream) => void;
}
@Injectable({
  providedIn: 'root',
})
export class SocketioService {

  constructor() {}
  socket: any=io(environment.SOCKET_ENDPOINT);
  peer: any;
  private peersMap: { [key: string]: Peer } = {};
  stream: MediaStream | null = null;


  //Linear list for ease of rendering.
  peerList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  on(eventName: string, callback: (data: any) => void): void {
    this.socket.on(eventName, callback);
  }

  //New socket connection.
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  joinRoom(hostRoom: string, isHost: boolean): void {
    this.socket.emit('join', {
      host: hostRoom,
      isHost: isHost,
      caller: this.socket.id,
    });

    //Get all the users currently in the room.
    this.socket.on('all_users', (users: any) => {
      this.initPeersMap(users, hostRoom);
    });

    //On recieving a new p2pRequest, complete the handshake and add a new peer to the peersMap.
    this.socket.on('p2prequest', (data: any) => {
      this.addPeer(data);
    });

    this.socket.on('acknowledge', (data: { caller: string | number; signal: any; }) => {
      //The handshake is completed here.
      console.log('Handshake completed for', data.caller);
      this.peersMap[data.caller].signal(data.signal);
    });
  }

  addStream(stream: MediaStream): void {
    Object.keys(this.peersMap).forEach((item) => {
      this.peersMap[item].addStream(stream);
    });
    this.peerList.next(Object.values(this.peersMap));
    this.stream = stream;
  }

  removeStream(): void {
    if (this.stream) {
      const stream = this.stream as MediaStream; // Assertion de type
      Object.keys(this.peersMap).forEach((item) => {
        this.peersMap[item].removeStream(stream);
      });
    } else {
      console.error("Stream is null");
    }
  }

  addPeer(data: { caller: string | number; signal: any; }): void {
    //Add the peer only if not already in the PeersMap.
    if (!this.peersMap[data.caller]) {
      console.log('Adding peer...');
      var peer = new SimplePeer({
        initiator: false,
        trickle: false,
      });
      this.peersMap[data.caller] = peer;
      this.peerList.next(Object.values(this.peersMap));

      peer.signal(data.signal);
      peer.on('signal', (signal: any) => {
        this.socket.emit('acknowledge_request', {
          caller: this.socket.id,
          signal: signal,
          recipient: data.caller,
        });
      });
    }
    //If not, simply access the peer and signal back.
    else {
      console.log('This peer already exists in map');
      this.peersMap[data.caller].signal(data.signal);
    }
  }

  initPeersMap(users: string[], hostRoom: string): void {
    //For each user returned, create a new peer and map the user's socket id to it.
    users.forEach((userId: string) => {
      //Don't add a peer for your own socket id.
      if (userId === this.socket.id) {
        return;
      }
      var peer = new SimplePeer({
        initiator: true,
        trickle: false,
      });
      this.peersMap[userId] = peer;
      peer.on('signal', (signal: any) => {
        console.log('initiating the p2p request');
        this.socket.emit('initiate', {
          recipient: userId,
          caller: this.socket.id,
          signal: signal,
          hostRoom: hostRoom,
        });
      });
    });

    this.peerList.next(Object.values(this.peersMap));
  }

  get getSocketId(): string {
    return this.socket.id;
  }

  get getPeersList(): Observable<any[]> {
    return this.peerList.asObservable();
  }
}
