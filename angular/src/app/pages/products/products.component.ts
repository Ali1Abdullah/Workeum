import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductsMemberPopupComponent } from './products-member-popup/products-member-popup.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onReserve(){
    this.dialog.open(ProductsMemberPopupComponent,{
      width:'53%',
      height:'28%'
    })
  }

}
