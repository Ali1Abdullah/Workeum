import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { format } from 'path';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  Image:boolean =false;
  companyForm: FormGroup
  constructor(public mainService: MainService) { }

  ngOnInit(): void {
    this.companyForm = new FormGroup({
      CompanyName: new FormControl(null,Validators.required),
      FounderName:new FormControl(null,Validators.required),
      Email:new FormControl(null,Validators.required),
      BusinessType:new FormControl(null,Validators.required),
      Others:new FormControl(null),
      PhoneNumber:new FormControl(null,Validators.required),
      Password: new FormControl(null,Validators.required),
      ConfirmPassword: new FormControl(null,Validators.required)
    })
    }
  
    onSubmit(){
      this.mainService.addToApi(this.companyForm.value,'api/companies/add').subscribe(num=>{
        console.log(num)
      })
    }

}

