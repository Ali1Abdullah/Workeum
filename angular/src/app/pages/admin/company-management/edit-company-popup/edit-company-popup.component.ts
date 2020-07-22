import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl, FormBuilder } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Company } from 'src/app/models/compnay.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CofirmEditEmployeePopupComponent } from '../../employee-management/edit-employee-popup/cofirm-edit-employee-popup/cofirm-edit-employee-popup.component';


@Component({
  selector: 'app-edit-company-popup',
  templateUrl: './edit-company-popup.component.html',
  styleUrls: ['./edit-company-popup.component.css']
})
export class EditCompanyPopupComponent implements OnInit {

  Image;
  companyForm: FormGroup
  uploadImage:FormGroup
  CompanyId:number;
  ImageChanged: boolean =false
  constructor(public mainService: MainService,public formBuilder: FormBuilder,public http: HttpClient,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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

    this.CompanyId = this.data.id
    this.mainService.getOneFromApi('','api/company/'+this.CompanyId,Company).subscribe(company=>{
      console.log(company)
        this.Image ='../../../../assets/companys/'+ company.Image
     


    this.companyForm = new FormGroup({
      CompanyId: new FormControl(this.CompanyId),
      CompanyName: new FormControl(company.CompanyName,Validators.required),
      FounderName:new FormControl(company.FounderName,Validators.required),
      Email:new FormControl(company.Email,Validators.required),
      BusinessType:new FormControl(company.BusinessType,Validators.required),
      Others:new FormControl(company.Others),
      PhoneNumber:new FormControl(company.PhoneNumber,Validators.required)
    })
    })
  

  this.uploadImage = this.formBuilder.group({
    profile: [""]
  });
  }


  onFileChanged(event) {
    this.ImageChanged = true;
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
      this.mainService.addToApi(this.companyForm.value,'api/companies/edit').subscribe()
        if(this.ImageChanged){
          let formData = new FormData();
          formData.append("uploadFile", this.uploadImage.get("profile").value);
            return this.http.post(
              'http://localhost:3001/api/companies/image/' + this.CompanyId,formData).subscribe()   
        }
        this.dialog.open(CofirmEditEmployeePopupComponent)
    }
}
