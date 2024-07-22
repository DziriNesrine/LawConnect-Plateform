import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ChatService {


  
  constructor(private http: HttpClient) { }

  getChatByRoom(room: string , clientName: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:5000/users/chat/' + room +'/'+ clientName )
        .subscribe(res => {
          console.log(res)
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
   getChatByRoomID(room: string ) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:5000/users/chatR/' + room  )
        .subscribe(res => {
          console.log(res)
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveChat(data: any) {
    return new Promise((resolve, reject) => {
        this.http.post('http://localhost:5000/users/chatcl', data)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  saveChat1(data: any) {
    return new Promise((resolve, reject) => {
        this.http.post('http://localhost:5000/users/chatAV', data)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

}
