import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';
import { MainService } from 'src/app/services/main.service';
import { MatDialog } from '@angular/material/dialog';
import { ResDeletePopupComponent } from './res-delete-popup/res-delete-popup.component';

@Component({
  selector: 'app-manage-reservation',
  templateUrl: './manage-reservation.component.html',
  styleUrls: ['./manage-reservation.component.css']
})
export class ManageReservationComponent implements OnInit {
reservations: Reservation[];
pastReservations: Reservation[]= []
FutureReservations: Reservation[]= []
today=  new Date().toJSON().split('T')[0];
  constructor(public mainService: MainService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.mainService.getDataFromApi('', 'api/reservations-user/' + localStorage.getItem("UserId") ,Reservation).subscribe((reservations) => {
      this.reservations = reservations;
      console.log("today", this.today)
      this.reservations.forEach(rsrv=>{
        if(rsrv.StartDate.split('T')[0] < this.today){
          console.log(rsrv.StartDate.split('T')[0])
          this.pastReservations.push(rsrv)
        }else{
          this.FutureReservations.push(rsrv)
        }
      })
      console.log("Past", this.pastReservations)
      console.log("Future", this.FutureReservations)
    })
  }

  cancelReserve(id){
    this.dialog.open(ResDeletePopupComponent,{

      width: "70%",
       data:{
         id:id
       }
     })
  }

}
