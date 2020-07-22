import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-popup',
  templateUrl: './reservation-popup.component.html',
  styleUrls: ['./reservation-popup.component.css']
})
export class ReservationPopupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      location.reload()
    }, 2000);
  }

}
