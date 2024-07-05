import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-avocat',
  templateUrl: './edit-avocat.component.html',
  styleUrls: ['./edit-avocat.component.css']
})
export class EditAvocatComponent implements OnInit{

  public avocat:any=[]
  public city: any=[];
  public speciality: any=[];
  public user:any ={}
  images!: string | Blob;


  constructor(private _myservice: ApiService,private http: HttpClient,
    private router :Router) { }

  ngOnInit(): void {
    this.getAvocat()
    this.getCity()
    this.getS()
    this.x=false

  }
   public resultat : number | undefined
   public point  : number | undefined
   public x : boolean =false
  
  

    getAvocat(){
    this._myservice.getAvocat(localStorage.getItem('idAV')).subscribe((res) =>{
      this.avocat=res;
      this.update()

      console.log(res);
     })
    }
  getCity(){
    this._myservice.getC().subscribe((res) =>{
    this.city=res;
    console.log(res);})
  }
  getS(){
    this._myservice.getS().subscribe((res) =>{
      this.speciality=res;

      console.log(res);
     })
    }
    update() {
      this.user.fNameAV=this.avocat[0].fNameAV
      this.user.lNameAV=this.avocat[0].lNameAV
      this.user.emailAV=this.avocat[0].emailAV
      this.user.cityAV=this.avocat[0].cityAV._id
      this.user.phoneAV=this.avocat[0].phoneAV
      this.user.card=this.avocat[0].card
      this.user.prix=this.avocat[0].prix
      this.user.picture=this.avocat[0].picture
      this.user.status= this.avocat[0].status
      this.user.languages=this.avocat[0].languages
      this.user.diplome=this.avocat[0].diplome
      this.user.training=this.avocat[0].training
      this.user.Cabinet=this.avocat[0].Cabinet
    }

   /* selectImage(event: any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.images = file;
      }
    }*/

  /*  selectImage(event: any) {
      if (event.target.files && event.target.files.length > 0) {
        this.images = event.target.files[0];
      }
    } */
    selectImage(event: any) {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        this.images = inputElement.files[0];
      }
    }
    
    
    public id : any
   /* onSubmit(){
      this.id=localStorage.getItem('idAV')
      const formData = new FormData();
      if (this.images) {
        formData.append('file', this.images);
        if (this.id) {
          this.http.post<any>(`http://localhost:5000/users/file/${this.id}`, formData).subscribe(
            (res) => console.log(res),
            (err) => console.log(err)
          );
        } else {
          console.error('ID is not defined');
        }
      } else {
        console.error('No image selected');
      }
    }*/

    onSubmit(){
      this.id=localStorage.getItem('idAV')
      const formData = new FormData();
      formData.append('file', this.images);
      this.http.post<any>(`http://localhost:5000/users/file/${this.id}`, formData).subscribe(
        (res) =>{console.log(res)
          window.location.reload()},

        (err) => console.log(err)
      );
    }
    

    updateAvocat() {
      this._myservice.updateAV(localStorage.getItem('idAV'), this.user)
        .subscribe(
          () => {
            // Succès de la mise à jour
            window.location.reload();
            console.log(this.user, "message");
          },
          (error: any) => {
            // Gestion des erreurs
            if (error.status === 404) {
              console.log("La ressource n'a pas été trouvée.");
              // Afficher un message à l'utilisateur ou prendre d'autres mesures appropriées
            } else {
              console.log("Une erreur s'est produite lors de la mise à jour :", error);
              // Autres gestions d'erreurs
            }
          }
        );
    }
    
    

}
