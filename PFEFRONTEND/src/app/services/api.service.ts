import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { EventApi } from '@fullcalendar/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http : HttpClient ,private router: Router) { }
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

   //Client
   signinCL(body:any){
    return this.http.post('http://localhost:5000/users/signinCL', body,{
      observe:'body'
    }
    );}
    signUpCL(user: any) {
      return this.http.post<any>('http://localhost:5000/users/addCL', user,);
    }
      //=> id client
    public x:any
    id(idCL:any){
       this.x=idCL
       localStorage.setItem('id', this.x);
    }

    getClient(id: any) {
      return this.http.get(`http://localhost:5000/users/getCLID/${id}`)
    }
    updateCL(id: any,data: any){
      return this.http.patch(`http://localhost:5000/users/updateCL/${id}`,data)
    }

    
    //Avocat
    signinAV(body:any){
      return this.http.post('http://localhost:5000/users/signinAV', body,{
        observe:'body'
      }
      );}
       //=> id avocat
    public idav:any
    idAV(idAV:any){
       this.idav=idAV
       localStorage.setItem('idAV',this.idav);
    }
    getAvocat(id: string | null) {
      return this.http.get(`http://localhost:5000/users/getAVID/${id}`)
    }

    signUpAV(user: any) {
      return this.http.post<any>('http://localhost:5000/users/addAV', user,);
      }
    getAV(){
      return this.http.get<any>('http://localhost:5000/users/getAV2')
      }
    updateAV(id: string | null,data: any){
      console.log(data,"service data")
        return this.http.patch(`http://localhost:5000/users/updateAV/${id}`,data)
    }

     //City
     getC(){
      return this.http.get('http://localhost:5000/users/getC')
    }
    //Speciality
    getS(){
      return this.http.get('http://localhost:5000/users/getS')
    }
   

    //Avis
    getAvis(id: string) {
      return this.http.get(`http://localhost:5000/users/getAvis/${id}`)
    }
    postAvis(avis: any) {
      return this.http.post<any>('http://localhost:5000/users/avis', avis,);
    }

    //Calendar
    getDateVide(id: any) : Observable<EventApi[]> {
      return this.http.get<EventApi[]>(`http://localhost:5000/users/getdateVide/${id}`)
    }
    Date(date: any) {
      return this.http.post<any>('http://localhost:5000/users/date', date);
    }
    getCalendarVide() {
      return this.http.get(`http://localhost:5000/users/getCVide`)
    }
    getRendez_vous(id: any) {
      return this.http.get(`http://localhost:5000/users/getDateNV/${id}`)
    }
    getRendez_vousValide(id: any) {
      return this.http.get(`http://localhost:5000/users/getDate/${id}`)
    }
    getRendez_vousClient(id: any) {
      return this.http.get(`http://localhost:5000/users/getRVTD/${id}`)
    }
    getRendezVousValide(id: any){
      return this.http.get(`http://localhost:5000/users/getRV/${id}`)
    }
    valideDRV(id: string,data: any){
      return this.http.patch(`http://localhost:5000/users/ValiderRV/${id}`, data,)

    }
    prendRV(id: any,data: any){
      return this.http.patch(`http://localhost:5000/users/rendez_vous/${id}`, data,)

    }
    delete(id: string) {
      return this.http.delete(`http://localhost:5000/users/deleteDate/${id}`)
    }


    //token
    loggedIn() {
      return !!localStorage.getItem('token');
    }
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      this.router.navigate(['/login']);
    }
    getToken() {
      return localStorage.getItem('token');
    }

}
