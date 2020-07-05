import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-company-popup',
  templateUrl: './company-popup.component.html',
  styleUrls: ['./company-popup.component.css']
})
export class CompanyPopupComponent implements OnInit {

  constructor(public router: Router,private dialogRef: MatDialogRef<CompanyPopupComponent>) { }

  ngOnInit(): void {
    setTimeout(() => {
      console.log("HRLLO")
      this.router.navigate([''])
      this.dialogRef.close(); 
    }, 3000);
  }

}
