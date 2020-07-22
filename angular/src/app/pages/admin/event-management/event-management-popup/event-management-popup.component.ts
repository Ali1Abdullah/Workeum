import { Component, OnInit, Inject } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Event } from 'src/app/models/event.model';
import { CofirmEditEmployeePopupComponent } from '../../employee-management/edit-employee-popup/cofirm-edit-employee-popup/cofirm-edit-employee-popup.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-event-management-popup',
  templateUrl: './event-management-popup.component.html',
  styleUrls: ['./event-management-popup.component.css']
})
export class EventManagementPopupComponent implements OnInit {

  
  Image: any;
  //taking the date from the calendar click
  date: string;
  //the api response of the event id  made by database
  responseId: number;
  //to disable assiging past date
  today = new Date();

  //for event management
  eventForm: FormGroup;
  event: Event;
  timeValid: boolean = false;
  uploadForm: FormGroup;
  constructor(
    public router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private mainService: MainService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    
    console.log(this.data.event)
  
    
    this.mainService.getDataFromApi('','api/events',Event).subscribe((data: any) => {
      let events = data;
      console.log("HELLO",data)
      // looping inside events array to provide the calendar component the data in a comprehensible manner (id, title, start, allDay, end)
     events.forEach(e => {
      if(e.EventId == this.data.event){
        this.event = e
        console.log("THIS EVENT: ",this.event)
      }
      });


    //form needed to store and send the image (main image of an event)
    this.uploadForm = this.formBuilder.group({
      profile: [""]
    });

    this.Image ='../../../../../assets/events/'+ this.event.EventImage
    //the event form management
    this.eventForm = new FormGroup({
      EventId: new FormControl(this.data.event),
      EventTitle: new FormControl(this.event.EventTitle, Validators.required),
      EventDate: new FormControl(this.event.EventDate.split('T')[0], Validators.required),
      EventDescription: new FormControl(this.event.EventDescription, Validators.required),
      EventStart: new FormControl(this.event.EventStart),
      EventEnd: new FormControl(this.event.EventEnd, Validators.required)
    });
  });
  }




  //to check if the session time is valid (ending time > starting time)
  checkTime() {
    this.eventForm.controls["EventStart"].value <
      this.eventForm.controls["EventEnd"].value
      ? (this.timeValid = false)
      : (this.timeValid = true);
  }



  //for the choose file
  onFileChanged(e) {
    const file = e.target.files[0];
    this.uploadForm.get("profile").setValue(file);
    let files = e.target.files;
    if (files.length === 0) {
      return;
    }
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert("Only images are supported.");
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);

    if (files[0].size / 1024 / 1024 > 200) {
      alert("File is too large");
    } else {
      reader.onload = _event => {
        this.Image = reader.result;

      };
    }
  }
  //to reset image
  ResetImage() {
    this.Image = null;
  }


  onSubmit() {
    console.log(this.eventForm.value)
    this.mainService.updateItemInApi(this.eventForm.value, 'api/events/edit/'+ this.data.event).subscribe()
      let formData = new FormData();
      formData.append("uploadFile", this.uploadForm.get("profile").value);
      this.http.post('http://localhost:3001/api/events/image/' + this.data.event, formData).subscribe()
     this.dialog.open(CofirmEditEmployeePopupComponent)
  }

  

deleteEvent(){
  this.mainService.deleteItemInApi('' ,'api/events/delete/'+this.data.event).subscribe()
  this.router.navigate(['/admin'])
}
}











