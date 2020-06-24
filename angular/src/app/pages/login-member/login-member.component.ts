import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth.service';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-login-member',
  templateUrl: './login-member.component.html',
  styleUrls: ['./login-member.component.css']
})
export class LoginMemberComponent implements OnInit {
  loginForm: FormGroup;
  checkedFalse: boolean = false;
  constructor(
    private authGurdService: AuthGuardService, 
    private authadmin: AdminAuthService, 
    private router: Router) { }

  ngOnInit() {
    //form to store data needed for authentication
        this.loginForm = new FormGroup({
      'Email': new FormControl(null),
      'password': new FormControl(null)
    })
  }



  onSubmit() {
    //sending data needed
    let payload = JSON.stringify({
      User: this.loginForm.controls['username'].value,
      Password: this.loginForm.controls['password'].value
    })
    this.authadmin.authBolMember(payload).subscribe((data: boolean) => {
      if (data == true) {
        //if the data given are true
        this.authGurdService.setLoggedIn(true)
        this.router.navigate(['/member-panel'])
      }
      else {
        //if data given are false
        this.checkedFalse = true;
        this.authGurdService.setLoggedIn(false)
        this.router.navigate(['/login-member'])
      }

    });

  }
  }