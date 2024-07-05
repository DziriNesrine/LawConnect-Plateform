import { Component } from '@angular/core';
import { Renderer2,  OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login-avocat',
  templateUrl: './login-avocat.component.html',
  styleUrls: ['./login-avocat.component.css']
})
export class LoginAvocatComponent implements OnInit{
  loginForm: FormGroup;
  resisterForm: FormGroup;
  public city: any=[];
  public speciality: any=[];
  public errorMessage!: Boolean;
  public errorMessageR: Boolean = false
  public serverErrorMessages: String | undefined; 
  public sexeav: String=""
  public cityav: String=""
  public specialityav: String=""
  public popup: boolean = false
  diplome: string="";
  images: string="";


  constructor(
    private http: HttpClient,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private _myservice: ApiService,
    private _router: Router,
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute) {
    this.loginForm = new FormGroup({
      cinAV: new FormControl(null, Validators.required),
      emailAV: new FormControl(null, Validators.required),
      passwordAV: new FormControl(null, Validators.required)
    });

    this.resisterForm = new FormGroup({
      lNameAV: new FormControl(null, Validators.required),
      fNameAV: new FormControl(null, Validators.required),
      cinAV: new FormControl(null, Validators.required),
      emailAV: new FormControl(null, Validators.required),
      passwordAV: new FormControl(null,[Validators.required, Validators.minLength(8)]),
      confirmPasswordAV: new FormControl(null, Validators.required),
      phoneAV: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      cityAV: new FormControl(null, Validators.required),
      sexeAV: new FormControl(null, Validators.required),
      specialityAV: new FormControl(null, Validators.required),
    }
    );
  }


  ngOnInit(): void {
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = '../../assets/js/login.js';
    s.text = ``;
    this.renderer2.appendChild(this._document.body, s);
    this.getCity()
    this.getS()
  }

  //get région
  getCity(){
    this._myservice.getC().subscribe((res: any) =>{
      this.city=res;
      console.log(res);
     })
    }

    //get specialité
    getS(){
      this._myservice.getS().subscribe((res: any) =>{
        this.speciality=res;
        console.log(res);
       })
      }

      //fonction login
  login() {
    localStorage.clear();
    if (this.loginForm.valid) {
      this._myservice.signinAV(this.loginForm.value)
        .subscribe(
          (data: any) => {
            const id = data[2];
              const token = data[1]; 
             
            this._router.navigate(['home/Avocat']);
            this._myservice.idAV(id)
            localStorage.setItem('token', token)
            localStorage.setItem('id', id)
           
            this.popup=true
          },
          error => {
            console.log("erreur", error.status)
            if(error.status === 500){
              this.popup=false

            }
            if(error.status === 409){
              this.popup=false
              this.errorMessage=true
              this.serverErrorMessages=error.error.message
            }
            if (error.status === 404) {
              localStorage.setItem('id', error.error.id)
              this.popup=true
              this.errorMessage=true
            }
          }
        );
    }else{
        this.errorMessageR=true
      }}


      //fonction signup
  signUp() {
    console.log(this.resisterForm)
    if (this.resisterForm.valid) {
      this._myservice.signUpAV(this.resisterForm.value)
        .subscribe(
          (data: any) => {
            console.log(data);
            window.location.reload();
          },
          (                error: { status: number; error: any[]; }) => {
            if (error.status === 404) {
              console.log("error")
              this.errorMessage=true
              this.serverErrorMessages = error.error.join('<br/>');
            }
          }
        );
    }else{
       console.log(" NESRINE WORLD")
        this.errorMessageR=true
}}

selectImage(event: any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
  
      // Concaténer le nom du répertoire avec le nom du fichier
      const filePath = 'public\\images\\' + file.name;
      
      // Utiliser le chemin d'accès simulé comme nécessaire
      console.log("Chemin d'accès simulé du fichier :", filePath);
      this.images = filePath;
    }
}
selectImage2(event: any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];

    // Concaténer le nom du répertoire avec le nom du fichier
    const filePath = 'public\\images\\' + file.name;
    
    // Utiliser le chemin d'accès simulé comme nécessaire
    console.log("Chemin d'accès simulé du fichier :", filePath);
    this.diplome = filePath;
  }
}


public id : any
onSubmit() {
  this.id = localStorage.getItem("id");
  console.log(this.id, "BTS");

  const formData = new FormData();
  formData.append('cinP', this.images);

  const formData2 = new FormData();
  formData2.append('piece', this.diplome);

  this.http.post<any>(`http://localhost:5000/users/cin/${this.id}`, formData).subscribe(
    (res: any) => {
      console.log(res);
      // Réussite de la première requête, maintenant envoyer la deuxième
      this.http.post<any>(`http://localhost:5000/users/diplome/${this.id}`, formData2).subscribe(
        (res2: any) => {
          console.log(res2);
          // Si vous avez besoin de recharger la page après avoir envoyé les deux requêtes
          window.location.reload();
        },
        (err2: any) => console.log(err2)
      );
    },
    (err: any) => console.log(err)
  );
}




}
