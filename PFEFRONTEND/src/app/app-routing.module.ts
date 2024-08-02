import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginAvocatComponent } from './login-avocat/login-avocat.component';
import { FindavocatComponent } from './findavocat/findavocat.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './auth.guard';
import { ProfilClientComponent } from './profil-client/profil-client.component';
import { HomeAvocatComponent } from './home-avocat/home-avocat.component';
import { ProfilAvocatComponent } from './profil-avocat/profil-avocat.component';
import { EditAvocatComponent } from './edit-avocat/edit-avocat.component';
import { CalandrierComponent } from './calandrier/calandrier.component';
import { VideoComponent } from './video/video.component';
import { ChatComponent } from './chat/chat.component';
import { Calandrier1Component } from './calandrier1/calandrier1.component';
import { PaiementComponent } from './paiement/paiement.component';




const routes: Routes = [
  {path: '' , component:HeaderComponent ,
  children :[
     {path: '' , component:HomeComponent },
     {path: 'loginClient' , component:LoginComponent },
     {path: 'loginAvocat' , component:LoginAvocatComponent },
     {path: 'avocat' , component:FindavocatComponent }
  ]},
  {path: 'home' , component: NavbarComponent,
    children :[
       {path: '' , component:FindavocatComponent},
       {path: 'editProfil' , component:ProfilClientComponent},
       {path: 'Avocat' , component:HomeAvocatComponent },
       {path: 'profilAvocat' , component:ProfilAvocatComponent },
       {path: 'editProfilAvocat' , component:EditAvocatComponent },
      {path: 'calendrier' , component:Calandrier1Component},
      {path: 'video' , component:VideoComponent},
      {path: 'paiement' , component:PaiementComponent},

    ],canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
