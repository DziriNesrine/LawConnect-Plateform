import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { SocketioService } from '../services/socketio.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @ViewChild('localVideo') localVideo: ElementRef | undefined;
  @ViewChild('remoteVideo') remoteVideo: ElementRef | undefined;

  private localStream: MediaStream | undefined;
  private peerConnection: RTCPeerConnection | undefined;
  public clientid: any;
  public client: any;
  public avocatid: any;
  public avocat: any;
  public auth: Boolean | undefined;
  public date: any = new Date();
  public Avis: any = {};
  chatVisible = false;

  constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private _myservice: ApiService,
    private router: Router,
    private socketService: SocketioService
  ) {}

  ngOnInit(): void {
    const s3 = this.renderer2.createElement('script');
    s3.src = '../../assets/js/chatvedio.js';
    s3.text = ``;
    this.renderer2.appendChild(this._document.body, s3);
    this.getid();
    this.getidAV();
    this.joinRoom();
    this.initializeVideo();
    this.setupSocketListeners();

    // Initialize socket listeners
    this.socketService.on('offer', (offer: any) => this.handleOffer(offer));
    this.socketService.on('answer', (answer: any) => this.handleAnswer(answer));
    this.socketService.on('ice-candidate', (candidate: any) => this.handleIceCandidate(candidate));
  }

  ngOnDestroy() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }
  }


  startCall() {
    this.chatVisible = true;
    this.initializeVideo();
    this.socketService.setupSocketConnection();
    this.socketService.joinRoom('room-name', true); // Example room name
  }

  endCall() {
    this.chatVisible = false;
    this.socketService.removeStream();
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }
    this.socketService.emit('end-call', { /* data if needed */ });
  }


  initPeerConnection(): void {
    const config = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] };
    this.peerConnection = new RTCPeerConnection(config);

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socketService.emit('ice-candidate', event.candidate);
      }
    };

    this.peerConnection.ontrack = (event) => {
      if (this.remoteVideo) {
        this.remoteVideo.nativeElement.srcObject = event.streams[0];
      }
    };

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        this.peerConnection?.addTrack(track, this.localStream!);
      });
    }

    this.peerConnection.createOffer()
      .then(offer => {
        return this.peerConnection?.setLocalDescription(offer);
      })
      .then(() => {
        this.socketService.emit('offer', this.peerConnection?.localDescription);
      })
      .catch(error => console.error('Error creating offer.', error));
  }

  handleOffer(offer: any): void {
    this.peerConnection?.setRemoteDescription(new RTCSessionDescription(offer));
    this.peerConnection?.createAnswer()
      .then(answer => {
        return this.peerConnection?.setLocalDescription(answer);
      })
      .then(() => {
        this.socketService.emit('answer', this.peerConnection?.localDescription);
      })
      .catch(error => console.error('Error creating answer.', error));
  }

  handleAnswer(answer: any): void {
    this.peerConnection?.setRemoteDescription(new RTCSessionDescription(answer));
  }

  handleIceCandidate(candidate: any): void {
    this.peerConnection?.addIceCandidate(new RTCIceCandidate(candidate));
  }



  private initializeVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        const localVideo = document.getElementById('local-video') as HTMLVideoElement;
        if (localVideo) {
          localVideo.srcObject = stream;
        }
        this.localStream = stream;
        this.socketService.addStream(stream);
      })
      .catch(error => {
        console.error('Error accessing media devices.', error);
      });
    }

    private setupSocketListeners() {
      this.socketService.on('video-offer', (data: any) => {
        // Handle incoming video offer
        // Use SimplePeer to establish connection and add remote stream
      });
  
      this.socketService.on('video-answer', (data: any) => {
        // Handle incoming video answer
        // Complete the peer connection setup
      });
  
      this.socketService.on('ice-candidate', (data: any) => {
        // Handle ICE candidates
        // Add ICE candidate to the peer connection
      });
    }




  getid(): void {
    this.clientid = localStorage.getItem('id');
    if (this.clientid != null) {
      this.getClient();
      this.auth = false;
    }
  }

  getClient(): void {
    this._myservice.getClient(this.clientid).subscribe((res) => {
      this.client = res;
    });
  }

  getidAV(): void {
    this.avocatid = localStorage.getItem('idAV');
    if (this.avocatid != null) {
      this.getAvocat();
      this.auth = true;
    }
  }

  getAvocat(): void {
    this._myservice.getAvocat(this.avocatid).subscribe((res) => {
      this.avocat = res;
    });
  }

  joinRoom(): void {
    const roomId = localStorage.getItem('room');
    if (roomId) {
      this.socketService.joinRoom(roomId, true);
    } else {
      console.error('Room ID is null');
    }
  }

  avis(nb: number): void {
    this.Avis.nbAvis = nb;
    this.Avis.clientID = this.clientid;
    this.Avis.avocatID = "663d748b3b91ae732c87ddf9";
    this._myservice.postAvis(this.Avis)
      .subscribe(
        data => {
          window.location.reload();
        },
        error => {
          if (error.status === 404) {
            console.log("error");
          }
        }
      );
  }
}
