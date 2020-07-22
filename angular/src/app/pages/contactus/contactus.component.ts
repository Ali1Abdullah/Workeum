import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { Message } from 'src/app/models/message.model';
import { AppService } from 'src/app/services/app.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactPopupComponent } from './contact-popup/contact-popup.component';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactForm: FormGroup;
  constructor(private mainService: MainService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      FirstName: new FormControl(null,Validators.required),
      LastName: new FormControl(null,Validators.required),
      Email: new FormControl(null,Validators.required),
      PhoneNumber: new FormControl(null,Validators.required),
      Content: new FormControl(null,Validators.required),
    })
  }

  onSubmit(){
    this.mainService.addToApi(this.contactForm.value,'api/messages/post').subscribe((response)=>{
      AppService.appLog(['response',response]);
    });
    this.dialog.open(ContactPopupComponent)
  }

}
