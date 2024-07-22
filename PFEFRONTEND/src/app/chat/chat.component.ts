import { AfterViewChecked, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DOCUMENT } from '@angular/common';
import { io } from 'socket.io-client';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked{

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  public speciality: any=[];
  joinned: boolean = false;
  chats: any=[];
  newUser:any = {}
  msgData:any = {}
  login : boolean = false
  public client : any
  public sexe : boolean = false
  public nbN : number =1
  public notification : boolean=true
  public avocat:any=[]
  public avocatID : any
  socket = io('http://localhost:4600');

  constructor(private chatService: ChatService , private _myservice: ApiService , private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document) {}

  ngOnInit() {
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = '../../assets/js/chattext.js';
    s.text = ``;
    this.renderer2.appendChild(this._document.body, s);
    this.getS()
    this.notification=true
    this.joinned=false
    this.client=localStorage.getItem('id')
    this.avocatID=localStorage.getItem('idAV')
    if(this.avocatID== null) {
      this.chat()
    }else{
      this.get()

    }


  }
  chat() {
    if (this.avocatID != null) {
      this.login = false;
      var speciallity = this.avocat[0].specialityAV._id;
      if (speciallity !== null) {
        this.getChatByRoomID(speciallity);
        this.msgData = { room: speciallity, avocatName: this.avocatID, clientName: "", message: '' };
        this.scrollToBottom();
      }
      this.socket.on('new-message', (data: { message: { room: any } }) => {
        if (data.message.room === speciallity) {
          this.chats.push(data.message);
          this.msgData = { room: speciallity, avocatName: this.avocatID, clientName: "", message: '' };
          this.scrollToBottom();
        }
      });
    } else {
      this.login = true;
      if (this.client !== null) {
        this.getChatByRoom(this.sroom, this.client);
        this.msgData = { room: this.sroom, clientName: this.client, message: '' };
        this.scrollToBottom();
      }
      this.socket.on('new-message', (data: { message: { room: any } }) => {
        if (data.message.room === this.sroom) {
          this.chats.push(data.message);
          this.msgData = { room: this.sroom, clientName: this.client, message: '' };
          this.scrollToBottom();
        }
      });
    }
  }
  

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  getChatByRoom(room: string , client: string | null) {
    this.chatService.getChatByRoom(room , client || '').then((res) => {
      this.chats = res;
    }).catch((err) => {
      console.log(err);
    });
  }
  
  public allClient:any=[]
  getChatByRoomID(room: string) {
     this.chatService.getChatByRoomID(room).then((res) => {
        this.chats=res;
        this.allClient[0]=this.chats[0].clientName
        for(var i=1 ; i<this.chats.length ; i++){
           var j=0
          var test=false
          while (!test && j<this.allClient.length){
             if(this.chats[i].clientName._id==this.allClient[j]._id){
               test=true }
               j=j+1 }
          if(test==false){
            this.allClient[j]=this.chats[i].clientName
            console.log(this.allClient )
          }}

    }, (err) => {
      console.log(err);
    });
  }
  public sroom:any
  joinRoomID(specialityroom: string) {
    var date = new Date();
    this.sroom=specialityroom
    var clientName=localStorage.getItem('id')
    this.getChatByRoom(specialityroom , clientName);
    this.msgData = { room: this.sroom, clientName: clientName, message: '' };
    this.joinned = true;
    this.socket.emit('save-message', { room: this.sroom, clientName: clientName, message: 'Join this room', updated_at: date });
  }

  public idcl: string | null | undefined;
  joinRoomD(IDCL: string | null) {
    var date = new Date();
    this.idcl=IDCL
    console.log(IDCL)
    var speciallity = this.avocat[0].specialityAV._id
    this.getChatByRoom(speciallity , this.idcl);
    this.msgData = { room: speciallity,avocatName: this.avocatID, clientName: IDCL,  message: '' };
    this.joinned = true;
    this.scrollToBottom();
    this.socket.emit('save-message', { room: speciallity,avocatName: this.avocatID, clientName: IDCL, message: 'Join this room', updated_at: date });
  }
  sendMessageID() {
    this.msgData.clientName=localStorage.getItem('id')
    this.msgData.room=this.sroom
    this.chatService.saveChat(this.msgData).then((result) => {
      this.socket.emit('save-message', result);
      console.log(this.msgData)
    }, (err) => {
      console.log(err);
    });
  }
  sendMessageAV() {
    this.msgData.clientName = this.idcl;
    console.log(this.msgData);
    this.chatService.saveChat1(this.msgData).then((result) => {
        this.socket.emit('save-message', result);
        console.log(this.msgData);
    }).catch((err) => {
        console.log(err);
    });
}

  logoutID() {
    var date = new Date();
    this.client=localStorage.getItem('id')
    this.socket.emit('save-message', { room: this.sroom, clientName: this.client, message: 'Left this room', updated_at: date });
    this.sroom=""
    this.joinned = false;
    this.notification=true
  }

  /*=joinRoom() {
    var date = new Date();
    localStorage.setItem("user", JSON.stringify(this.newUser));
    var clientName=localStorage.getItem('id')
    this.getChatByRoom(this.newUser.room , this.newUser.clientName);
    this.msgData = { room: this.newUser.room, clientName: this.newUser.clientName, message: '' };
    this.joinned = true;
    this.socket.emit('save-message', { room: this.newUser.room, clientName: this.newUser.clientName, message: 'Join this room', updated_at: date });
  }
  sendMessage() {
    this.msgData.clientName=localStorage.getItem('id')
    this.chatService.saveChat(this.msgData).then((result) => {
      this.socket.emit('save-message', result);
      console.log(this.msgData)
    }, (err) => {
      console.log(err);
    });
  }
   logout() {
    var date = new Date();
    var user = JSON.parse(localStorage.getItem("user"));
    user.clientName=localStorage.getItem('id')
    this.socket.emit('save-message', { room: user.room, clientName: user.clientName, message: 'Left this room', updated_at: date });
    localStorage.removeItem("user");
    this.joinned = false;
  }*/
  notificationM(){
   this.notification=false
   this.nbN=0

  }


  getS(){
    this._myservice.getS().subscribe((res) =>{
      this.speciality=res;
      console.log(res);
     })
    }

  get(){
      this._myservice.getAvocat(localStorage.getItem('idAV')).subscribe((res) =>{
        this.avocat=res;
        console.log(this.avocat);
        if(this.avocat[0].sexeAV="homme"){

          console.log(this.sexe)
          console.log(this.avocat[0].sexeAV)

        }else{
          this.sexe=true
          console.log(this.sexe)
          console.log(this.avocat[0].sexeAV)
        }
        this.chat()
       })
      }

}
