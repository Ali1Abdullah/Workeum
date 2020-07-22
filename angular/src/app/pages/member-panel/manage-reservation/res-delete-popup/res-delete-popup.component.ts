import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Main } from 'src/app/models/main.model';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-res-delete-popup',
  templateUrl: './res-delete-popup.component.html',
  styleUrls: ['./res-delete-popup.component.css']
})
export class ResDeletePopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public mainService: MainService) { }

  ngOnInit(): void {
    console.log(this.data.id)
  }
  cancel(){
    this.mainService.deleteItemInApi('','api/reservations/delete/'+this.data.id).subscribe()
    setTimeout(() => {
      location.reload()
    }, 2000);
  }

}
