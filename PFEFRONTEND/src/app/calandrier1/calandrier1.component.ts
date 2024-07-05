import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import {ChangeDetectorRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from '../event-utils';

declare let $: any;

@Component({
  selector: 'app-calandrier1',
  templateUrl: './calandrier1.component.html',
  styleUrls: ['./calandrier1.component.css']
})
export class Calandrier1Component implements OnInit {


  public dates:any[]=[];
  public avocatID=localStorage.getItem('idAV');
  time: any;
  public Date:any;
  public avocat: any
 
  

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
   currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private _myservice: ApiService,
    private router :Router
  ) {
  }
  ngOnInit(): void {
    this.loadInitialDates()
  }


  loadInitialDates() {
    this._myservice.getDateVide(this.avocatID).subscribe(
      (res) => {
        this.dates = res;
        console.log("Initial dates loaded:", this.dates);
      },
      (error) => {
        console.error('Erreur lors de la récupération des dates initiales :', error);
      }
    );
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const time = prompt('Please enter a new time for your event (HH:MM)');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (time) {
      const [hours, minutes] = time.split(':').map(Number);
      if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
        const start = new Date(selectInfo.start);
        start.setHours(hours);
        start.setMinutes(minutes);
        calendarApi.addEvent({
          id: createEventId(),
          title: 'Event', // You can set a default title here
          start: start.toISOString(),
          allDay: false // Assuming the event is not an all-day event
        });
        //this.dates.push(start.toISOString());
        this.currentEvents.push();
        this.getDate(selectInfo) // Add the event to currentEvents
        this.DATE(start.toISOString());
      } else {
        alert('Invalid time format. Please enter time in HH:MM format.');
      }
    }
  }
  
  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }


  DATE(date1: any){
    this.Date={
      "date":date1,
    "avocatID":this.avocatID
    }
    if (this.Date) {
      this._myservice.Date(this.Date)
        .subscribe(
          (data: any) => {
            console.log("date",data);
          },
          (                error: { status: number; error: any[]; }) => {
            if (error) {
              console.log("error", error)
            }
          }
        );
    }else{
       console.log(" Date ")
}
  }

  getDate(selectInfo: DateSelectArg) {
    this._myservice.getDateVide(this.avocatID).subscribe(
      (res) => {
        const calendarApi = selectInfo.view.calendar;
        const start = new Date(selectInfo.start);
        console.log("nesrinewoh", res);
        this.dates = res;
        console.log("datess", this.dates[0]?.date);
        for (let i = 0; i < this.dates.length; i++) {
          calendarApi.addEvent({
            id: createEventId(),
            title: 'Event', // Vous pouvez définir un titre par défaut ici
            start: new Date(this.dates[i].date).toISOString(), // Convertir en chaîne ISO si nécessaire
            allDay: false // Supposé que l'événement n'est pas un événement toute la journée
          });
        }
        console.log("curentsevents", this.currentEvents);
      },
      (error) => {
        console.error('Erreur lors de la récupération des dates :', error);
      }
    );
  }


  

}
