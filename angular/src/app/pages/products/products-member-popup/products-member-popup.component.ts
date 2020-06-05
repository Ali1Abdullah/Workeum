import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-member-popup',
  templateUrl: './products-member-popup.component.html',
  styleUrls: ['./products-member-popup.component.css']
})
export class ProductsMemberPopupComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }
  onJoinUs(){
    this.router.navigate(['/employeefrom']);
  }

}
