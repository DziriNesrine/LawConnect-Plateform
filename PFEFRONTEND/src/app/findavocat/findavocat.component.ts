import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-findavocat',
  templateUrl: './findavocat.component.html',
  styleUrls: ['./findavocat.component.css']
})
export class FindavocatComponent implements OnInit{
  public city: any=[];
  public avocat: any=[];
  emailAV :string | undefined;
  public x = true ;
  specialityAV :string = "";
  sexeAV : string= "";
  cityAV :string= "";
  public avocatList:any=[];
  name :String | undefined;
  token = localStorage.getItem('token')
  id = localStorage.getItem('id')
  public valide:boolean=false
  public DateVide:any=[];
  public items: any;
  public speciality: any=[];
  public Calendar: any=[];
  public client:any
  public idAvocat:any
  public status:boolean = false

  constructor( private _myservice: ApiService,
    private _router: Router ,
   ) { }

  ngOnInit(): void {
    this.getS()
    this.getAV()
    this.Vtoken()
    this.getClient()
    this.getCity()
    this.status=false
}

getClient(){
    this._myservice.getClient(this.id).subscribe((res) =>{
      this.client=res;
      console.log(res);
     })
    }


  getCity(){
    this._myservice.getC().subscribe((res) =>{
      this.city=res;
      console.log(this.city);
     })
    }
  getS(){
      this._myservice.getS().subscribe((res) =>{
        this.speciality=res;
        console.log(res);
       })
      }
  getCalendar(){
        this._myservice.getCalendarVide().subscribe((res) =>{
          this.Calendar=res;
          console.log(res);
          this.calendarAvocat()

         })
        }
  getAV(){
        this._myservice.getAV().subscribe((res) =>{
          this.avocat=res;
          this.avocatList=res;
          console.log(res);
          this.getCalendar()

        })
           }
  search(){
    this.status=true
              this.avocatList=this.avocat.filter((res: { lNameAV: string; fNameAV: string; specialityAV: { speciality: string; }; sexeAV: string; cityAV: { city: string; }; })=>{
                this.name=res.lNameAV +" "+res.fNameAV
              return ( ((this.emailAV==undefined) ||(this.emailAV=="") ||this.name.toLocaleLowerCase().match(this.emailAV.toLocaleLowerCase()))
                    &&((this.specialityAV=="") ||(this.specialityAV==undefined) || res.specialityAV.speciality.toLocaleLowerCase().match(this.specialityAV.toLocaleLowerCase()))
                    &&((this.sexeAV=="")  || (this.sexeAV==undefined) || res.sexeAV.toLocaleLowerCase().match(this.sexeAV.toLocaleLowerCase()))
                    &&((this.cityAV=="")  || (this.cityAV==undefined) || res.cityAV.city.toLocaleLowerCase().match(this.cityAV.toLocaleLowerCase()))
                    )})
  }


   Vtoken(){
     if(this.token==null){
       this.valide=false
      }else {
       this.valide=true}}

  getDateVide(avocatID: string | null){
    this._myservice.getDateVide(avocatID).subscribe((res) =>{
      this.DateVide=res;
      console.log(this.DateVide);})

    }
  getid(x: any){
    console.log(x)
  }


  calendarAvocat(){
    for(var i=0 ; i<this.avocatList.length; i++){
      var z=0
      for(var j=0 ; j<this.Calendar.length; j++){
        if(this.avocatList[i]._id==this.Calendar[j].avocatID){
            this.avocatList[i].calendar[z]={ date: this.Calendar[j].date ,
                                             _id: this.Calendar[j]._id}
            z=z+1
           ;}}
  }
  console.log(this.avocatList)
  }
  
  public idDate:any
  public date:any={}

  rendezVous(idRV: any){
    console.log(idRV)
    this.idDate=idRV
    this.date.clientID=this.client[0]._id
    console.log(this.date)
    console.log(this.idDate)
  }

  prendRV() {
    this._myservice.prendRV(this.idDate,this.date)
    .subscribe(() => {
       window.location.reload()
       console.log(this.date)
    }),(error: any)=>{
       console.log(error)};
    }

  login(){
    this._router.navigate(['/loginClient']);
  }

  public profil:boolean=false
  public avocatP :any =[]

  valider(id: any,fNameAV: any,lNameAV: any,emailAV: any,phoneAV: any,cityAV: any,specialityAV: any,prix: any,Cabinet: any,diplome: any,training: any,picture: any){
    this.profil=true
    this.avocatP.fNameAV=fNameAV
    this.avocatP.lNameAV=lNameAV
    this.avocatP.emailAV=emailAV
    this.avocatP.phoneAV=phoneAV
    this.avocatP.cityAV=cityAV
    this.avocatP.specialityAV=specialityAV
    this.avocatP.prix=prix
    this.avocatP.Cabinet=Cabinet
    this.avocatP.diplome=diplome
    this.avocatP.training=training
    this.avocatP.picture=picture
    console.log(this.avocatP)
    console.log(id,fNameAV,lNameAV,emailAV,phoneAV,cityAV,specialityAV,prix,Cabinet,diplome,training)
  }

  
}
