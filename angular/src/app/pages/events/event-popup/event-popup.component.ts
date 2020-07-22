import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { MainService } from 'src/app/services/main.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-event-popup',
  templateUrl: './event-popup.component.html',
  styleUrls: ['./event-popup.component.css']
})
export class EventPopupComponent implements OnInit {
event: Event;
Image;
  constructor(
    public mainService: MainService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.mainService.getDataFromApi('','api/events',Event).subscribe((data: any) => {
      let events =data
      events.forEach(e => {
        if(e.EventId == this.data.event){
          this.Image ='../../../../../assets/events/'+ e.EventImage
          this.event = e
        }
    })
  })
  }

}
