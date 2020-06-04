import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanyFormComponent } from './company-form.component';




const routes: Routes = [
  {
    path: '',
    component:CompanyFormComponent
  },
  
]
 
/////////////////////
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyFormRoutingModule { }
