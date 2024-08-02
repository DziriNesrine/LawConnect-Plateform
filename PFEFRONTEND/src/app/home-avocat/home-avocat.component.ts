import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { SocketioService } from '../services/socketio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home-avocat',
  templateUrl: './home-avocat.component.html',
  styleUrls: ['./home-avocat.component.css']
})
export class HomeAvocatComponent implements OnInit {
  public avocatid:any
  public rendez_vous:any
  public rendez_vousValide:any
  public client : any = []
  joinGroupForm: FormGroup;
  isFormOpen = false;

  constructor( private _myservice: ApiService,
    private router :Router ,
    private socketioService: SocketioService,
    private formBuilder: FormBuilder,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.joinGroupForm = this.formBuilder.group({
      call_id: '',
    });
  }

    ngOnInit(): void {
      const s = this.renderer2.createElement('script');
      s.type = 'text/javascript';
      s.src = '../../assets/js/vérife.js';
      this.renderer2.appendChild(this._document.body, s);
      this.getidAV()
  
    }
    getidAV(){
      this.avocatid=localStorage.getItem('idAV')
      this.getRendez_vous()
      this.getRendez_vousValide()
  
    }
    getRendez_vous(){
      this._myservice.getRendez_vous(this.avocatid).subscribe((res) =>{
        this.rendez_vous=res
        console.log(res);
       })
    }
    getRendez_vousValide(){
      this._myservice.getRendez_vousValide(this.avocatid).subscribe((res) =>{
        this.rendez_vousValide=res
        console.log(res);
       })
    }

    public rdv : any = {}

  updateRV(id:string) {
    this.rdv.status=true
    this.rdv._id=id
    console.log(this.rdv.status)
    console.log(id)
    this._myservice.valideDRV(id,this.rdv)
        .subscribe(() => {
          console.log(this.rdv)
          window.location.reload()
        }),(error: any)=>{
          console.log(error)
        };
}
  
  videochat(idroom: any) {

    this.router.navigate([
      '/home/video'
    ]);
    localStorage.setItem('room', idroom)
    
  }


  


  deleteRV(id: string){
    this._myservice.delete(id)
    .subscribe(() => {
        window.location.reload()
        this.rendez_vous= this.rendez_vous.filter((x: { id: any; }) => x.id !== id)
        console.log(this.rendez_vous)
    });
   }


}
