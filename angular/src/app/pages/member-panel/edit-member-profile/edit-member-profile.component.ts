import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, FormBuilder, FormsModule } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Member } from 'src/app/models/member.model';
import { formatDate } from '@fullcalendar/core';

@Component({
  selector: 'app-edit-member-profile',
  templateUrl: './edit-member-profile.component.html',
  styleUrls: ['./edit-member-profile.component.css']
})
export class EditMemberProfileComponent implements OnInit {

  Image;
  uploadImage: FormGroup
  memberEditForm: FormGroup
  MemberId: number;
  ImageChanged: boolean = false;
  constructor(private mainService: MainService, public formBuilder: FormBuilder, public http: HttpClient) { }

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

  //to convert date format
  convert(str) {
    let result = str.substring(0, str.indexOf("T"))
    return result
  }
  ngOnInit() {
    //      localStorage.setItem('loggedIn', 'true')
    //    isLoggedIn: boolean = JSON.parse(localStorage.getItem('loggedIn') || 'false' )
    this.MemberId = parseInt(localStorage.getItem("UserId"))


    this.mainService.getOneFromApi('', 'api/member/' + this.MemberId, Member).subscribe(member => {
      console.log(member)
      this.Image = '../../../../assets/members/' + member.Image
      let date = this.convert(member.BOD)

      this.memberEditForm = new FormGroup({
        MemberId: new FormControl(this.MemberId),
        MemberName: new FormControl(member.MemberName, Validators.required),
        CompanyName: new FormControl(member.CompanyName, Validators.required),
        BOD: new FormControl(date, Validators.required),
        PhoneNumber: new FormControl(member.PhoneNumber, Validators.required),
        Email: new FormControl(member.Email, [Validators.email, Validators.required]),
        Position: new FormControl(member.Position, Validators.required)
      })


    })
    this.uploadImage = this.formBuilder.group({
      profile: [""]
    });
  }


  onFileChanged(event) {
    this.ImageChanged = true
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

  onSubmit() {
    this.mainService.updateItemInApi(this.memberEditForm.value, 'api/members/edit').subscribe()
    if (this.ImageChanged) {
      let formData = new FormData();
      formData.append("uploadFile", this.uploadImage.get("profile").value);
      return this.http.post(
        'http://localhost:3001/api/member/image/' + this.MemberId, formData).subscribe()
    }

  }
}