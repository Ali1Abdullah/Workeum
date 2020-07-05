import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
Image;
uploadImage:FormGroup
memberForm:FormGroup
  constructor(private mainService: MainService, public formBuilder: FormBuilder,public http:HttpClient, public router: Router) { }

  public static matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
}

  ngOnInit(): void {


    this.memberForm = new FormGroup({
      MemberName: new FormControl(null,Validators.required),
      CompanyName:  new FormControl(null,Validators.required),
      BOD:new FormControl(null,Validators.required),
      PhoneNumber: new FormControl(null,Validators.required),
      Email: new FormControl(null,[Validators.email,Validators.required]),
      Position: new FormControl(null,Validators.required),
      Password: new FormControl(null,Validators.required),
      ConfirmPassword: new FormControl(null,[
        Validators.required,
        EmployeeFormComponent.matchValues('Password'),
      ])
    })
    
  this.uploadImage = this.formBuilder.group({
    profile: [""]
  });
  }


  onFileChanged(event) {
    let file = event.target.files[0];
    this.uploadImage.get("profile").setValue(file);
    let files = event.target.files;
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
    if (files[0].size / 1024 / 1024 > 0.2) {
      alert("File is too large");
    } else {
      reader.onload = _event => {
        this.Image = reader.result;
      };
    }
  }

  onSubmit(){

    this.mainService.addToApi(this.memberForm.value,'api/members/add').subscribe(id=>{
      localStorage.setItem("UserId",id)
        let formData = new FormData();
        formData.append("uploadFile", this.uploadImage.get("profile").value);
          return this.http.post(
            'http://localhost:3001/api/member/image/' + parseInt(id),formData).subscribe(
            )   
    

            
    })
    this.router.navigate(['member-panel'])
   
  }
}
