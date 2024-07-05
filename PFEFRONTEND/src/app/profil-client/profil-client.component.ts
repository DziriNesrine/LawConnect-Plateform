import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profil-client',
  templateUrl: './profil-client.component.html',
  styleUrls: ['./profil-client.component.css']
})
export class ProfilClientComponent implements OnInit{
  public clientid:any
  public client:any
  public city: any=[];
  public user:any ={}

  constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private _myservice: ApiService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getCLID()
    this.getCity()

  }
  getCLID(){
    this.clientid=localStorage.getItem('id')
    this.getClient()

  }
  getClient(){
    this._myservice.getClient(this.clientid).subscribe((res) =>{
      this.client=res;
      console.log(this.client);
      this.update()


     })
    }
    getCity(){
      this._myservice.getC().subscribe((res) =>{
        this.city=res;

       })
      }
  update() {

    this.user.fNameCL=this.client[0].fNameCL
    this.user.lNameCL=this.client[0].lNameCL
    this.user.emailCL=this.client[0].emailCL
    this.user.cityCL=this.client[0].cityCL._id
    this.user.phoneCL=this.client[0].phoneCL
    this.user.age=this.client[0].age
    this.user.information=this.client[0].information
    console.log(this.user)



  }

  updateUser() {

    this._myservice.updateCL(this.clientid,this.user)
    .subscribe(() => {
       window.location.reload()
       console.log(this.client)
    }),(error: any)=>{
       console.log(error)};
    }


}
