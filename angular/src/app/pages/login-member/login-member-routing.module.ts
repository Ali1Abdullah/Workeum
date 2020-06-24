import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginMemberComponent } from './login-member.component';


const routes: Routes = [
  {
    path: '',
    component:LoginMemberComponent
  },
  
]
 
/////////////////////
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginMemberRoutingModule { }
