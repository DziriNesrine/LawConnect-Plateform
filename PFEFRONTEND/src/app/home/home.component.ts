import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public speciality:any=[]
  constructor(private _myservice: ApiService,
    private _router: Router ,) { }

  ngOnInit(): void {
    this.getS()
  }
  getS(){
    this._myservice.getS().subscribe((res) =>{
      this.speciality=res;

      console.log(res);
     })
    }
}
