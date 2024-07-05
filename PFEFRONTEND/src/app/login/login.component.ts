import { Component, NgModule } from '@angular/core';
import { Renderer2,  OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ApiService} from '../services/api.service'
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  registerForm: FormGroup;
  public city: any=[];
  public errorMessage: Boolean | undefined
  public errorMessageR: Boolean = false
  public serverErrorMessages: String | undefined
  public sexecl: String=""
  public citycl: String=""

  constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private _myservice: ApiService,
    private _router: Router,
    private formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute) {
    this.loginForm = new FormGroup({
      emailCL: new FormControl(null, Validators.required),
      passwordCL: new FormControl(null, Validators.required)
    });

    this.registerForm = new FormGroup({
      lNameCL: new FormControl(null, Validators.required),
      fNameCL: new FormControl(null, Validators.required),
      emailCL: new FormControl(null, Validators.required),
      passwordCL: new FormControl(null,[Validators.required, Validators.minLength(8)]),
      confirmPasswordCL: new FormControl(null, Validators.required),
      phoneCL: new FormControl(null, [Validators.required, Validators.minLength(8) ]),
      cityCL: new FormControl(null, Validators.required),
      sexeCL: new FormControl(null, Validators.required),
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

  }

  getCity(){
    this._myservice.getC().subscribe((res: any) =>{
      this.city=res;

      console.log(res);
     })
    }

    login() {
      localStorage.clear();
            if (this.loginForm.valid) {
        this._myservice.signinCL(this.loginForm.value)
          .subscribe(
            (data : any) => {
              const id = data[2];
              const token = data[1]; 
console.log(data, "data")
              this._myservice.id(id)
              this._router.navigate(['home']);   
              localStorage.setItem('id', id)
              localStorage.setItem('token', token)
            },
            (error : any) => {
              console.log(error)
              if (error.status === 404) {
                this.errorMessage=true
                this.serverErrorMessages = error.error.join('<br/>');
              }
            }
          );
      }else{
          this.errorMessageR=true
        }}
    

        signUp() {
          console.log(this.registerForm)
          if (this.registerForm.valid) {
            this._myservice.signUpCL(this.registerForm.value)
              .subscribe(
                (                data: any) => {
                  console.log(data);
                  window.location.reload();
                },
                (                error: { status: number; error: any[]; }) => {
                  if (error.status === 404) {
                    console.log("welcome to nesrine world")
                    this.errorMessage=true
                    this.serverErrorMessages = error.error.join('<br/>');
                  }
                }
              );
          }else{
             console.log("welcome")
              this.errorMessageR=true
      }}


}
