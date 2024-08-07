import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { NotificationServiceService } from '../services/notification-service.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit{
  public RendezVousClient : any=[]
  public clientid:any
  images: any ;
  public auth:Boolean | undefined

  public client:any
  public avocatid:any
  public avocat:any

  public  RendezVousValide : any=[]
  public notifpayement : any=[]
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
    s.src = '../../assets/js/payement.js';
    s.text = ``;
    this.renderer2.appendChild(this._document.body, s);

    this.getCLID()
    this.getAVID()
  }

  getCLID(){
    this.clientid=localStorage.getItem('id')
    console.log(this.clientid)
    if(this.clientid!=null){
      this.getClient()
      this.auth=false
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
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }


  onSubmit() {
    const id = "66a01fb0f5ffaa6eb31607e2"; // ID client fixe
  
    // Vérifiez si this.images contient un fichier
    if (!(this.images instanceof File)) {
      console.error('Invalid file input');
      return;
    }
  
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
        // Redirection vers l'interface de vidéo
        this.router.navigate(['home/video']);
      },
      (err) => console.log(err)
    );
  }
  
  


}
