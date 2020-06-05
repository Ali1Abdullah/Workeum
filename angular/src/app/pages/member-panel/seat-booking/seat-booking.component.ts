import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css']
})
export class SeatBookingComponent implements OnInit {
  seats1: any[]
  seats2: any[]
  seats3: any[]
  constructor() { }

  ngOnInit(): void {

    let json = [
      { seatId: 3, name: "mousa" },
      { seatId: 4, name: "ali" },
      { seatId: 6, name: "mhmd" },
      { seatId: 12, name: "ghassan" },
      { seatId: 20, name: "ghassan" }
    ]




    this.seats1 = [
      { Id: 1, reserved: false },
      { Id: 2, reserved: false },
      { Id: 3, reserved: false },
      { Id: 4, reserved: false },
      { Id: 5, reserved: false },
      { Id: 6, reserved: false },
      { Id: 7, reserved: false },
      { Id: 8, reserved: false },
      { Id: 9, reserved: false }
    ]
    this.seats2 = [
      { Id: 10, reserved: false },
      { Id: 11, reserved: false },
      { Id: 12, reserved: false },
      { Id: 13, reserved: false },
      { Id: 14, reserved: false },
      { Id: 15, reserved: false },
      { Id: 16, reserved: false },
      { Id: 17, reserved: false },
      { Id: 18, reserved: false }
    ]
    this.seats3 = [
      { Id: 19, reserved: false },
      { Id: 20, reserved: false },
      { Id: 21, reserved: false },
      { Id: 22, reserved: false },
      { Id: 23, reserved: false },
      { Id: 24, reserved: false },
      { Id: 25, reserved: false },
      { Id: 26, reserved: false },
      { Id: 27, reserved: false }
    ]

    json.forEach(obj => {
      if(obj.seatId<=9){
        this.seats1.forEach(seat => {
          if (obj.seatId == seat.Id) {
            seat.reserved = true
          }
        })
      }
      else if(obj.seatId > 9 && obj.seatId <=18 ){
        this.seats2.forEach(seat => {
          if (obj.seatId == seat.Id) {
            seat.reserved = true
          }
        })
      }
      else{
        this.seats3.forEach(seat => {
          if (obj.seatId == seat.Id) {
            seat.reserved = true
          }
        })
      }
   
   
    })

  }

  chooseDate(){
    `SELECT * from public."Reservations" WHERE 
    ("startDate"< '2020-03-05' AND "endDate" > '2020-03-05') OR
    ("startDate"> '2020-03-05' AND "startDate" < '2020-03-10')
    `
    let json = [
      { seatId: 7, name: "mousa" },
      { seatId: 8, name: "ali" },
      { seatId: 14, name: "mhmd" },
      { seatId: 11, name: "ghassan" },
      { seatId: 25, name: "ghassan" }
    ]

this.seats1.forEach(seat=>{
  seat.reserved = false
})
this.seats2.forEach(seat=>{
  seat.reserved = false
})
this.seats3.forEach(seat=>{
  seat.reserved = false
})
    json.forEach(obj => {
      if(obj.seatId<=9){
        this.seats1.forEach(seat => {
      
          if (obj.seatId == seat.Id) {
            seat.reserved = true
           
          }
        })
      }
      else if(obj.seatId > 9 && obj.seatId <=18 ){
        this.seats2.forEach(seat => {
          if (obj.seatId == seat.Id) {
            seat.reserved = true
          }
        })
      }
      else{
        this.seats3.forEach(seat => {
          if (obj.seatId == seat.Id) {
            seat.reserved = true
          }
        })
      }
   
   
    })
  }



}
