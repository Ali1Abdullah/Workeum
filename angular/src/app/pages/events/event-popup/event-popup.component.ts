import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
  selector: 'app-event-popup',
  templateUrl: './event-popup.component.html',
  styleUrls: ['./event-popup.component.css']
})
export class EventPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    console.log(this.data)
  }

}
