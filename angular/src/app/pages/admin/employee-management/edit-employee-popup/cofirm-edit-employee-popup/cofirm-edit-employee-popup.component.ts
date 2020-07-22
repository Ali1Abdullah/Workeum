import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cofirm-edit-employee-popup',
  templateUrl: './cofirm-edit-employee-popup.component.html',
  styleUrls: ['./cofirm-edit-employee-popup.component.css']
})
export class CofirmEditEmployeePopupComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
    setTimeout(() => {
      location.reload()
    }, 2000);
  }

}
