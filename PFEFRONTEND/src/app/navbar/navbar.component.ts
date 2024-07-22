import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NotificationServiceService } from '../services/notification-service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
 public notification: any;
  
  public clientid:any
  public client:any
  public avocatid:any
  public avocat:any
  public auth:Boolean | undefined
  public RendezVousClient : any=[]
  public  RendezVousValide : any=[]
  images: any ;


  constructor(
   
    private notificationService: NotificationServiceService,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private _myservice: ApiService,
    private router :Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    console.log("navbar")
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = '../../assets/js/navbarprofil.js';
    s.text = ``;
    this.renderer2.appendChild(this._document.body, s);


   /* this.notificationService.socket.on('appointmentNotification', (data: any) => {
      // Traitez les données reçues ici
      console.log('Données reçues :', data);
    });*/

    /*this.notificationService.onAppointmentNotification((data: any) => {
      console.log('Notification de rendez-vous reçue :', data);
      alert(data.message); // Afficher une alerte ou mettre à jour l'UI
    });*/

    this.notificationService.onEvent('BackendEvent', (data) => {
      console.log('Événement BackendEvent reçu dans le composant:', data);
    });
    this.notificationService.onEvent('appointmentNotification', (data) => {
      console.log('Événement BackendEvent reçu dans le composant:', data);
    });

    this.getCLID()
    this.getAVID()
    /*this.testSocket()*/


  }

// Émettre un événement Socket.io
/*testSocket(): void {
  this.notificationService.emitEvent();
} */





  getCLID(){
    this.clientid=localStorage.getItem('id')
    console.log(this.clientid)
    if(this.clientid!=null){
      this.getClient()
      this.auth=false
      this.getRendezClient()
      this.getRendezValide()
    }

  }
  getClient(){
    this._myservice.getClient(this.clientid).subscribe((res) =>{
      this.client=res;
      console.log(res);
     })
    }

    getRendezClient(){
      this._myservice.getRendez_vousClient(this.clientid).subscribe((res) =>{
        this.RendezVousClient=res;

        console.log(res);
       })
      }
      getRendezValide(){
        this._myservice.getRendezVousValide(this.clientid).subscribe((res) =>{
          this.RendezVousValide=res;

          console.log( res);
         })
        }

    getAVID(){
    this.avocatid=localStorage.getItem('idAV')
    console.log(localStorage.getItem('idAV'))
     if(this.avocatid!=null){
      this.getAvocat()
      this.auth=true
    }
    

  }
  getAvocat(){
    this._myservice.getAvocat(this.avocatid).subscribe((res) =>{
      this.avocat=res;
      console.log(res);
     })
    }


   /* selectImage(event: any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.images = file;
      }
    }*/

      selectImage(event: any) {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.images = file;
        }
      }

   /* onSubmit(){
      console.log(this.RendezVousClient)
      var id=this.RendezVousClient[0]._id
      const formData = new FormData();
      formData.append('file', this.images);
      this.http.post<any>(`http://localhost:5000/users/payer/${id}`, formData).subscribe(
        (res) =>{console.log(res)
          localStorage.setItem('room', this.clientid)
          this.router.navigate(['home/video'])},

        (err) => console.log(err)
      );
    }*/

      onSubmit() {
        const id = this.RendezVousClient[0]._id;
        const formData = new FormData();
        formData.append('file', this.images);
    
        this.http.post<any>(`http://localhost:5000/users/payer/${id}`, formData).subscribe(
          (res) => {
            console.log(res);
            localStorage.setItem('room', this.clientid);
            this.notificationService.emitPaymentCompleted({
              clientId: this.clientid,
              message: 'Paiement réussi'
            });
            this.router.navigate(['home/video']);
          },
          (err) => console.log(err)
        );
      }
  
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('idAV');
    localStorage.removeItem('room');
    this.router.navigate(['']);
  }


}
