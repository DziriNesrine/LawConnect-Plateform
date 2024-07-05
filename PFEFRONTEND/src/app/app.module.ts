import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginAvocatComponent } from './login-avocat/login-avocat.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FindavocatComponent } from './findavocat/findavocat.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfilClientComponent } from './profil-client/profil-client.component';
import { HomeAvocatComponent } from './home-avocat/home-avocat.component';
import { ProfilAvocatComponent } from './profil-avocat/profil-avocat.component';
import { EditAvocatComponent } from './edit-avocat/edit-avocat.component';
import { CalandrierComponent } from './calandrier/calandrier.component';
import { VideoComponent } from './video/video.component';
import { ChatComponent } from './chat/chat.component';
import { PiecesjustificativesComponent } from './piecesjustificatives/piecesjustificatives.component';
import { ChatService } from './services/chat.service';
import { SocketioService } from './services/socketio.service';
import { NotificationServiceService } from './services/notification-service.service';
import { Calandrier1Component } from './calandrier1/calandrier1.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
const config: SocketIoConfig = { url: 'http://localhost:4600', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginAvocatComponent,
    HeaderComponent,
    HomeComponent,
    FindavocatComponent,
    NavbarComponent,
    ProfilClientComponent,
    HomeAvocatComponent,
    ProfilAvocatComponent,
    EditAvocatComponent,
    CalandrierComponent,
    VideoComponent,
    ChatComponent,
    PiecesjustificativesComponent,
    Calandrier1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule, // register FullCalendar with your app
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
    
    
  ],
  providers:[ChatService , SocketioService, NotificationServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
