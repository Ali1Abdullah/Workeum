import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './login-admin.component';



const routes: Routes = [
  {
    path: '',
    component:LoginAdminComponent
  },
  
]
 
/////////////////////
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginAdminRoutingModule { }
