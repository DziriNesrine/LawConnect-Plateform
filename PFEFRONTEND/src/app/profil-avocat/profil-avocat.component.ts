import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-avocat',
  templateUrl: './profil-avocat.component.html',
  styleUrls: ['./profil-avocat.component.css']
})
export class ProfilAvocatComponent implements OnInit{
  public avocat:any=[]


  constructor(private _myservice: ApiService,
    private router :Router) { }

  ngOnInit(): void {
    this.getAvocat()
  }


  getAvocat(){
    this._myservice.getAvocat(localStorage.getItem('idAV')).subscribe((res) =>{
      this.avocat=res;

      console.log(res);
     })
    }


}
