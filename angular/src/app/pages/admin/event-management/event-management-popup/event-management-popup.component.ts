import { Component, OnInit, Inject } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { Router } from '@angular/router';
@Component({
  selector: 'app-event-management-popup',
  templateUrl: './event-management-popup.component.html',
  styleUrls: ['./event-management-popup.component.css']
})
export class EventManagementPopupComponent implements OnInit {

  constructor(private mainService: MainService,
    public router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data.event)

  }
  deleteEvent(){
    this.mainService.deleteItemInApi('' ,'api/events/delete/'+this.data.event).subscribe()
    this.router.navigate(['/admin'])
  }

}
