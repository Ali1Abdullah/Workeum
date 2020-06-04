import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form.component';



const routes: Routes = [
  {
    path: '',
    component:EmployeeFormComponent
  },
  
]
 
/////////////////////
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeFormRoutingModule { }
