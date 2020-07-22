import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.css']
})
export class AddPopupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      location.reload()
    }, 2000);
  }

}
