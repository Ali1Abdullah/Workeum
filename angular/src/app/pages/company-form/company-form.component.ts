import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl, FormBuilder } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  Image;
  companyForm: FormGroup
  uploadImage:FormGroup
  constructor(public mainService: MainService,public formBuilder: FormBuilder,public http: HttpClient) { }

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
    this.companyForm = new FormGroup({
      CompanyName: new FormControl(null,Validators.required),
      FounderName:new FormControl(null,Validators.required),
      Email:new FormControl(null,Validators.required),
      BusinessType:new FormControl(null,Validators.required),
      Others:new FormControl(null),
      PhoneNumber:new FormControl(null,Validators.required),
      Password: new FormControl(null,Validators.required),
      ConfirmPassword: new FormControl(null,[
        Validators.required,
        CompanyFormComponent.matchValues('Password'),
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
      this.mainService.addToApi(this.companyForm.value,'api/companies/add').subscribe(id=>{
        let formData = new FormData();
        formData.append("uploadFile", this.uploadImage.get("profile").value);
          return this.http.post(
            'http://localhost:3001/api/companies/image/' + parseInt(id),formData).subscribe()   
    })
    }
}

