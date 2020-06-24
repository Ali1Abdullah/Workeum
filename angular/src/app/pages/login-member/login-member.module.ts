import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginMemberComponent } from './login-member.component';
import { LoginMemberRoutingModule } from './login-member-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginMemberComponent],
  imports: [
    CommonModule,
    LoginMemberRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginMemberModule { }
