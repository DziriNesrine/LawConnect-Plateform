import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calandrier',
  templateUrl: './calandrier.component.html',
  styleUrls: ['./calandrier.component.css']
})
export class CalandrierComponent {
  public Date:any
  public avocatID=localStorage.getItem('idAV')


  constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private _myservice: ApiService,
    private router :Router
  ) { }
  ngOnInit(): void {

    this.DATE()
    
    const s1 = this.renderer2.createElement('script');
    s1.type = 'text/javascript';
    s1.src = '../../assets/js/clan.js';
    s1.text = ``;
    this.renderer2.appendChild(this._document.body, s1);
   
    

    
  }
  DATE(){
    this._myservice.getDateVide(this.avocatID).subscribe((res) =>{
      this.Date=res
      console.log(res);
     })
  }
  delete(id: string) {
    this._myservice.delete(id)
        .subscribe(() => {
            window.location.reload()
            this.Date= this.Date.filter((x: { id: string; }) => x.id !== id)
            console.log(this.Date)
        });
}
rolead(){
  window.location.reload()

}

}
