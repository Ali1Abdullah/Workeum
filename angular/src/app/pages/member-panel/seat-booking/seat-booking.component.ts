import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Reservation } from 'src/app/models/reservation.model';
import { MAT_DIALOG_SCROLL_STRATEGY_PROVIDER, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservationPopupComponent } from './reservation-popup/reservation-popup.component';
@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css']
})
export class SeatBookingComponent implements OnInit {
  MemberId: number;
  datesValid:boolean;
  datesForm:FormGroup;
  seats1: any[]
  seats2: any[]
  seats3: any[]
  seats4: any[]
  seats5: any[]
  seats6: any[]
  seats7: any[]
  seats8: any[]
  seats9: any[]
  reservations: any[]
  seatsToReserve: any[] = [];
  today = new Date().toJSON().split('T')[0];
  constructor(private mainService: MainService, public dialog: MatDialog) { }


  checkDates() {
    this.datesForm.controls['EndDate'].value < this.datesForm.controls['StartDate'].value ? this.datesValid = false : this.datesValid = true;
  } 

  
  seatClicked(seat) {
    this.seatsToReserve.push(seat)
  }


  onCancel(){
    location.reload()
  }

  onSubmit(){


    console.log(this.datesForm.controls['StartDate'].value,this.datesForm.controls['EndDate'].value)
    this.seatsToReserve.forEach(seat =>{
      let json ={
        SeatId: seat.Id,
        UserId:this.MemberId,
        StartDate: this.datesForm.controls['StartDate'].value.toString(),
        EndDate:this.datesForm.controls['EndDate'].value.toString()
      }
      this.mainService.addToApi(json,'api/reservations/reserve').subscribe()
    })

    this.dialog.open(ReservationPopupComponent)
  }
  
  
  ngOnInit(): void {

    this.datesForm = new FormGroup({
      StartDate: new FormControl(null,Validators.required),
      EndDate: new FormControl(null,Validators.required),
    })

    this.MemberId = parseInt(localStorage.getItem("UserId"))
    console.log(this.MemberId)
    this.seats1 = [
      { Id: 1, SeatNumber: 1, RoomId: 1, reserved: false },
      { Id: 2, SeatNumber: 2, RoomId: 1, reserved: false },
      { Id: 3, SeatNumber: 3, RoomId: 1, reserved: false },
      { Id: 4, SeatNumber: 4, RoomId: 1, reserved: false },
      { Id: 5, SeatNumber: 5, RoomId: 1, reserved: false },
      { Id: 6, SeatNumber: 6, RoomId: 1, reserved: false },
      { Id: 7, SeatNumber: 7, RoomId: 1, reserved: false },
      { Id: 8, SeatNumber: 8, RoomId: 1, reserved: false },
      { Id: 9, SeatNumber: 9, RoomId: 1, reserved: false }
    ]
    this.seats2 = [
      { Id: 10, SeatNumber: 10, RoomId: 1, reserved: false },
      { Id: 11, SeatNumber: 11, RoomId: 1, reserved: false },
      { Id: 12, SeatNumber: 12, RoomId: 1, reserved: false },
      { Id: 13, SeatNumber: 13, RoomId: 1, reserved: false },
      { Id: 14, SeatNumber: 14, RoomId: 1, reserved: false },
      { Id: 15, SeatNumber: 15, RoomId: 1, reserved: false },
      { Id: 16, SeatNumber: 16, RoomId: 1, reserved: false },
      { Id: 17, SeatNumber: 17, RoomId: 1, reserved: false },
      { Id: 18, SeatNumber: 18, RoomId: 1, reserved: false }
    ]
    this.seats3 = [
      { Id: 19, SeatNumber: 19, RoomId: 1, reserved: false },
      { Id: 20, SeatNumber: 20, RoomId: 1, reserved: false },
      { Id: 21, SeatNumber: 21, RoomId: 1, reserved: false },
      { Id: 22, SeatNumber: 22, RoomId: 1, reserved: false },
      { Id: 23, SeatNumber: 23, RoomId: 1, reserved: false },
      { Id: 24, SeatNumber: 24, RoomId: 1, reserved: false },
      { Id: 25, SeatNumber: 25, RoomId: 1, reserved: false },
      { Id: 26, SeatNumber: 26, RoomId: 1, reserved: false },
      { Id: 27, SeatNumber: 27, RoomId: 1, reserved: false }
    ]

    ///////
    this.seats4 = [
      { Id: 28, SeatNumber: 1, RoomId: 2, reserved: false },
      { Id: 29, SeatNumber: 2, RoomId: 2, reserved: false },
      { Id: 30, SeatNumber: 3, RoomId: 2, reserved: false },
      { Id: 31, SeatNumber: 4, RoomId: 2, reserved: false },
      { Id: 32, SeatNumber: 5, RoomId: 2, reserved: false },
      { Id: 33, SeatNumber: 6, RoomId: 2, reserved: false },
      { Id: 34, SeatNumber: 7, RoomId: 2, reserved: false },
      { Id: 35, SeatNumber: 8, RoomId: 2, reserved: false },
      { Id: 36, SeatNumber: 9, RoomId: 2, reserved: false }
    ]
    this.seats5 = [
      { Id: 37, SeatNumber: 10, RoomId: 2, reserved: false },
      { Id: 38, SeatNumber: 11, RoomId: 2, reserved: false },
      { Id: 39, SeatNumber: 12, RoomId: 2, reserved: false },
      { Id: 40, SeatNumber: 13, RoomId: 2, reserved: false },
      { Id: 41, SeatNumber: 14, RoomId: 2, reserved: false },
      { Id: 42, SeatNumber: 15, RoomId: 2, reserved: false },
      { Id: 43, SeatNumber: 16, RoomId: 2, reserved: false },
      { Id: 44, SeatNumber: 17, RoomId: 2, reserved: false },
      { Id: 45, SeatNumber: 18, RoomId: 2, reserved: false }
    ]
    this.seats6 = [
      { Id: 46, SeatNumber: 19, RoomId: 2, reserved: false },
      { Id: 47, SeatNumber: 20, RoomId: 2, reserved: false },
      { Id: 48, SeatNumber: 21, RoomId: 2, reserved: false },
      { Id: 49, SeatNumber: 22, RoomId: 2, reserved: false },
      { Id: 50, SeatNumber: 23, RoomId: 2, reserved: false },
      { Id: 51, SeatNumber: 24, RoomId: 2, reserved: false },
      { Id: 52, SeatNumber: 25, RoomId: 2, reserved: false },
      { Id: 53, SeatNumber: 26, RoomId: 2, reserved: false },
      { Id: 54, SeatNumber: 27, RoomId: 2, reserved: false }
    ]
    this.seats7 = [
      { Id: 55, SeatNumber: 1, RoomId: 3, reserved: false },
      { Id: 56, SeatNumber: 2, RoomId: 3, reserved: false },
      { Id: 57, SeatNumber: 3, RoomId: 3, reserved: false },
      { Id: 58, SeatNumber: 4, RoomId: 3, reserved: false },
      { Id: 59, SeatNumber: 5, RoomId: 3, reserved: false },
      { Id: 60, SeatNumber: 6, RoomId: 3, reserved: false },
      { Id: 61, SeatNumber: 7, RoomId: 3, reserved: false },
      { Id: 62, SeatNumber: 8, RoomId: 3, reserved: false },
      { Id: 63, SeatNumber: 9, RoomId: 3, reserved: false }
    ]
    this.seats8 = [
      { Id: 64, SeatNumber: 10, RoomId: 3, reserved: false },
      { Id: 65, SeatNumber: 11, RoomId: 3, reserved: false },
      { Id: 66, SeatNumber: 12, RoomId: 3, reserved: false },
      { Id: 67, SeatNumber: 13, RoomId: 3, reserved: false },
      { Id: 68, SeatNumber: 14, RoomId: 3, reserved: false },
      { Id: 69, SeatNumber: 15, RoomId: 3, reserved: false },
      { Id: 70, SeatNumber: 16, RoomId: 3, reserved: false },
      { Id: 71, SeatNumber: 17, RoomId: 3, reserved: false },
      { Id: 72, SeatNumber: 18, RoomId: 3, reserved: false }
    ]
    this.seats9 = [
      { Id: 73, SeatNumber: 19, RoomId: 3, reserved: false },
      { Id: 74, SeatNumber: 20, RoomId: 3, reserved: false },
      { Id: 75, SeatNumber: 21, RoomId: 3, reserved: false },
      { Id: 76, SeatNumber: 22, RoomId: 3, reserved: false },
      { Id: 77, SeatNumber: 23, RoomId: 3, reserved: false },
      { Id: 78, SeatNumber: 24, RoomId: 3, reserved: false },
      { Id: 79, SeatNumber: 25, RoomId: 3, reserved: false },
      { Id: 80, SeatNumber: 26, RoomId: 3, reserved: false },
      { Id: 81, SeatNumber: 27, RoomId: 3, reserved: false }
    ]



  }



  chooseDate() {
    this.mainService.getDataFromApi('', 'api/reservations/getreservation/' + this.datesForm.controls['StartDate'].value+ '/' + this.datesForm.controls['EndDate'].value, Reservation).subscribe((reservations) => {
      console.log(['reservations', reservations]);
      this.reservations = reservations
      this.seats1.forEach(seat => {
        seat.reserved = false
      })
      this.seats2.forEach(seat => {
        seat.reserved = false
      })
      this.seats3.forEach(seat => {
        seat.reserved = false
      })
      this.seats4.forEach(seat => {
        seat.reserved = false
      })
      this.seats5.forEach(seat => {
        seat.reserved = false
      })
      this.seats6.forEach(seat => {
        seat.reserved = false
      })
      this.seats7.forEach(seat => {
        seat.reserved = false
      })
      this.seats8.forEach(seat => {
        seat.reserved = false
      })
      this.seats9.forEach(seat => {
        seat.reserved = false
      })
      if(this.reservations){
      this.reservations.forEach(obj => {
        if (obj.SeatId <= 9) {
          this.seats1.forEach(seat => {

            if (obj.SeatId == seat.Id) {
              seat.reserved = true

            }
          })
        }
        else if (obj.SeatId > 9 && obj.SeatId <= 18) {
          this.seats2.forEach(seat => {
            if (obj.SeatId == seat.Id) {
              seat.reserved = true
            }
          })
        }
        else if (obj.SeatId > 18 && obj.SeatId <= 27) {
          this.seats3.forEach(seat => {
            if (obj.SeatId == seat.Id) {
              seat.reserved = true
            }
          })
        }
        else if (obj.SeatId > 27 && obj.SeatId <= 36) {
          this.seats4.forEach(seat => {
            if (obj.SeatId == seat.Id) {
              seat.reserved = true
            }
          })
        }
        else if (obj.SeatId > 36 && obj.SeatId <= 45) {
          this.seats5.forEach(seat => {
            if (obj.SeatId == seat.Id) {
              seat.reserved = true
            }
          })
        }
        else if (obj.SeatId > 45 && obj.SeatId <= 54) {
          this.seats6.forEach(seat => {
            if (obj.SeatId == seat.Id) {
              seat.reserved = true
            }
          })
        }
        else if (obj.SeatId > 54 && obj.SeatId <= 63) {
          this.seats7.forEach(seat => {
            if (obj.SeatId == seat.Id) {
              seat.reserved = true
            }
          })
        }
        else if (obj.SeatId > 63 && obj.SeatId <= 72) {
          this.seats8.forEach(seat => {
            if (obj.SeatId == seat.Id) {
              seat.reserved = true
            }
          })
        }
        else if (obj.SeatId > 72 && obj.SeatId <= 81) {
          this.seats9.forEach(seat => {
            if (obj.SeatId == seat.Id) {
              seat.reserved = true
            }
          })
        }
        


      })
    }
    });
  }


}
