import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginAdminComponent } from './login-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginMemberRoutingModule } from '../login-member/login-member-routing.module';
import { LoginAdminRoutingModule } from './login-admin-routing.module';



@NgModule({
  declarations: [LoginAdminComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginAdminRoutingModule
  ]
})
export class LoginAdminModule { }
