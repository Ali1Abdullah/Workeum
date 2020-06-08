import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Reservation } from 'src/app/models/reservation.model';
@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css']
})
export class SeatBookingComponent implements OnInit {
  seats1: any[]
  seats2: any[]
  seats3: any[]
  reservations: any[]
  constructor(private mainService: MainService) { }

  ngOnInit(): void {


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


  }

  chooseDate(){
    this.mainService.getDataFromApi('','api/reservations/'+'2020-03-05'+ '/'+ '2020-03-10', Reservation).subscribe((reservations)=>{
      console.log(['reservations',reservations]);
      this.reservations = reservations
      this.seats1.forEach(seat=>{
        seat.reserved = false
      })
      this.seats2.forEach(seat=>{
        seat.reserved = false
      })
      this.seats3.forEach(seat=>{
        seat.reserved = false
      })
      this.reservations.forEach(obj => {
            if(obj.SeatId<=9){
              this.seats1.forEach(seat => {
            
                if (obj.SeatId == seat.Id) {
                  seat.reserved = true
                 
                }
              })
            }
            else if(obj.SeatId > 9 && obj.SeatId <=18 ){
              this.seats2.forEach(seat => {
                if (obj.SeatId == seat.Id) {
                  seat.reserved = true
                }
              })
            }
            else{
              this.seats3.forEach(seat => {
                if (obj.SeatId == seat.Id) {
                  seat.reserved = true
                }
              })
            }
         
         
          })
    });


  }



}
