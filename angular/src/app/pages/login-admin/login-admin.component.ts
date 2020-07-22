import { Component, OnInit } from '@angular/core';
import { AdminAuthGuardService } from 'src/app/services/auth.service';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  loginForm: FormGroup;
  checkedFalse: boolean = false;
  constructor(
    private authGurdService: AdminAuthGuardService, 
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
    
    // this.router.navigate(['/admin'])
    //sending data needed
    let payload = JSON.stringify({
      Email: this.loginForm.controls['Email'].value,
      Password: this.loginForm.controls['password'].value
    })
    this.authadmin.authBolAdmin(payload).subscribe((data: boolean) => {
      if (data == true) {
        //if the data given are true
        this.authGurdService.setLoggedIn(true)
        this.router.navigate(['/admin'])
      }
      else {
        //if data given are false
        this.checkedFalse = true;
        this.authGurdService.setLoggedIn(false)
        this.router.navigate([''])
      }

    });

  }
  }