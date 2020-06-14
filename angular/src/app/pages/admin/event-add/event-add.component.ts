import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {


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
  datesValid: boolean = false;
  datesFuture: boolean = false;
  timeValid: boolean = false;
  uploadForm: FormGroup;
  constructor(
    private mainService: MainService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {

    //form needed to store and send the image (main image of an event)
    this.uploadForm = this.formBuilder.group({
      profile: [""]
    });


    //the event form management
    this.eventForm = new FormGroup({
      EventTitle: new FormControl(null, Validators.required),
      EventDate: new FormControl(null, Validators.required),
      EventDescription: new FormControl(null, Validators.required),
      EventStart: new FormControl(this.date),
      EventEnd: new FormControl(null, Validators.required)
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


  onSubmit(){
    this.mainService.addToApi(this.eventForm.value,'api/events/add').subscribe(num=>{
      console.log(num)
    })
  }
}
