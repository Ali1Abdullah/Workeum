import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member } from 'src/app/models/member.model';
import { HttpService } from 'src/app/services/http.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-popup-reservation',
  templateUrl: './popup-reservation.component.html',
  styleUrls: ['./popup-reservation.component.css']
})
export class PopupReservationComponent implements OnInit {
  member
  constructor(   @Inject(MAT_DIALOG_DATA) public data: any,
  public mainSerivce: MainService) { 

  }

  ngOnInit(): void {
    this.mainSerivce.getOneFromApi('','api/member/'+this.data.id,Member).subscribe(resp=>{
      this.member = resp
    })

  }

}
