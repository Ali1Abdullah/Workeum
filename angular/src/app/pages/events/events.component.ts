import {
  Component,
  AfterViewChecked,
  OnInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import {
  MatDialog
} from "@angular/material/dialog";

import { FormControl, FormGroup } from "@angular/forms";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { EventInput, Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventPopupComponent } from './event-popup/event-popup.component';
import { MainService } from 'src/app/services/main.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  //full calendar specified , static : true is obligatory
  @ViewChild("fullcalendar", { static: true })
  calendarComponent: FullCalendarComponent;
  //used to store the data i
  dateForm: FormGroup;
  //used to provide the calednar component with data
  eventsCalendar: any[] = [];
  //used to store initial data
  events: any[] = [];
  
  //storing the events shown in the calendar
  calendarEvents: EventInput[] = [
  ];
  // using plugins to interact with the calendar
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  //getting the calendar api
  calendarApi: Calendar;
  //to prevent entering in an infinite loop (intializing data once)
  initialized = false;
  constructor(
    private dialog: MatDialog,
    public mainService: MainService
  ) {
    this.calendarEvents =  [
    ];
      
    this.mainService.getDataFromApi('','api/events',Event).subscribe((data: any) => {
      this.events = data;
      console.log(this.events)
      // looping inside events array to provide the calendar component the data in a comprehensible manner (id, title, start, allDay, end)
      this.events.forEach(e => {
        let calendarevent = {
          startEditable: false,
          id: e.EventId,
          title: e.EventTitle,
          start: new Date(e.EventDate).getTime(),
          allDay: true,
        };
        this.eventsCalendar.push(calendarevent);
      });
      //calling the loadEvents Function as soon as the data are stored
      this.loadEvents();
    });
  }

  ngOnInit() {
   
    //defining the dateForm to read the date
    this.dateForm = new FormGroup({
      date: new FormControl(null)
    });
  }

  ngAfterViewInit() {
    //laoding events based on calendarApi
    this.calendarApi = this.calendarComponent.getApi();
    if (this.calendarApi && !this.initialized) {
      this.initialized = true;
      this.loadEvents();
    }
  }
  //used to load the events of the calendar
  loadEvents() {
    //to store events in the calendar
    this.calendarEvents =  this.eventsCalendar
  
    this.calendarApi.removeAllEventSources(); //obligatory
    this.calendarApi.addEventSource(this.calendarEvents); //obligatory
  }

  //to go to a specific date the user chose
  gotoDate() {
    //the if condition is to prevent possible error
    if (this.calendarApi) {
      this.calendarApi.gotoDate(this.dateForm.controls["date"].value);
    }
  }

  //when clicking the event
  onEventClick(clickedEvent: any) {

    let dialogRef = this.dialog.open(EventPopupComponent, {
      height: "85%",
      width: "70%",
      data:{
        event: clickedEvent.event.id
      }
    });
  }

}








// import {
//   Component,
//   AfterViewChecked,
//   OnInit,
//   ViewChild,
//   ElementRef
// } from "@angular/core";
// import {
//   MatDialog
// } from "@angular/material/dialog";

// import { FormControl, FormGroup } from "@angular/forms";
// import { FullCalendarComponent } from "@fullcalendar/angular";
// import { EventInput, Calendar } from "@fullcalendar/core";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGrigPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { EventPopupComponent } from './event-popup/event-popup.component';
// import { MainService } from 'src/app/services/main.service';

// @Component({
//   selector: 'app-events',
//   templateUrl: './events.component.html',
//   styleUrls: ['./events.component.css']
// })
// export class EventsComponent implements OnInit {
//   //full calendar specified , static : true is obligatory
//   @ViewChild("fullcalendaradmin", { static: true })
//   calendarComponent: FullCalendarComponent;
//   //used to store the data i
//   dateForm: FormGroup;
//   //used to provide the calednar component with data
//   eventsCalendar: any[] = [];
//   //used to store initial data
//   events: any[] = [];
  
//   //storing the events shown in the calendar
//   calendarEvents: EventInput[] = [
//   ];
//   // using plugins to interact with the calendar
//   calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
//   //getting the calendar api
//   calendarApi: Calendar;
//   //to prevent entering in an infinite loop (intializing data once)
//   initialized = false;
//   constructor(
//     private dialog: MatDialog,
//     public mainService: MainService
//   ) {
//     this.calendarEvents =  [
//     ];

//     //getting data of events from api
    
//     this.mainService.getDataFromApi('','api/events',Event).subscribe((data: any) => {
//       this.events = data;
//       console.log(this.events)
//       // looping inside events array to provide the calendar component the data in a comprehensible manner (id, title, start, allDay, end)
//       this.events.forEach(e => {
//         let calendarevent = {
//           startEditable: false,
//           id: e.EventId,
//           title: e.EventTitle,
//           start: new Date(e.EventDate).getTime(),
//           allDay: true,
//         };
//         this.eventsCalendar.push(calendarevent);
//       });
//       //calling the loadEvents Function as soon as the data are stored
//       this.loadEvents();
//     });
//   }

//   ngOnInit() {

//     //defining the dateForm to read the date
//     this.dateForm = new FormGroup({
//       date: new FormControl(null)
//     });
//   }

//   ngAfterViewInit() {
//     //laoding events based on calendarApi
//     this.calendarApi = this.calendarComponent.getApi();
//     if (this.calendarApi && !this.initialized) {
//       this.initialized = true;
//       this.loadEvents();
//     }
//   }
//   //used to load the events of the calendar
//   loadEvents() {
//     //to store events in the calendar
//     this.calendarEvents =  this.eventsCalendar
  
//     this.calendarApi.removeAllEventSources(); //obligatory
//     this.calendarApi.addEventSource(this.calendarEvents); //obligatory
//   }

//   //to go to a specific date the user chose
//   gotoDate() {
//     //the if condition is to prevent possible error
//     if (this.calendarApi) {
//       this.calendarApi.gotoDate(this.dateForm.controls["date"].value);
//     }
//   }

//   //when clicking the event
//   onEventClick(clickedEvent: any) {

//     let dialogRef = this.dialog.open(EventPopupComponent, {
//       height: "85%",
//       width: "70%",
//       data:{
//         event: clickedEvent.event.id
//       }
//     });
//   }

// }





