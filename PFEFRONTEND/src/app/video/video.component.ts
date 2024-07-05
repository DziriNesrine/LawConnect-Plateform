import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit{

  public clientid:any
  public client:any
  public avocatid:any
  public avocat:any
  public auth:Boolean | undefined
  public date:any = new Date()
  public Avis : any={}

 
  constructor(

    private renderer2: Renderer2,

    @Inject(DOCUMENT) private _document: Document,
    private _myservice: ApiService,
    private router :Router) { }

  ngOnInit(): void {
    const s3 = this.renderer2.createElement('script');
    s3.src = '../../assets/js/video.js';
    s3.text = ``;
    this.renderer2.appendChild(this._document.body, s3)
    this.getid()
    this.getidAV()
  }

  getid(){
    this.clientid=localStorage.getItem('id')
    console.log(this.clientid)
    if(this.clientid!=null){
      this.getClient()
      this.auth=false
    }

  }
  getClient(){
    this._myservice.getClient(this.clientid).subscribe((res) =>{
      this.client=res;
      console.log(res);
     })
    }
   
      getidAV(){
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
   
    avis(nb: number){
      this.Avis.nbAvis=nb
      this.Avis.clientID=this.clientid
      this.Avis.avocatID= this.avocatid
      this._myservice.postAvis(this.Avis)
      .subscribe(
        data => {
          console.log(data);
          window.location.reload();

        },
        error => {
          if (error.status === 404) {
            console.log("error")


          }


        }
      );


    }

}
