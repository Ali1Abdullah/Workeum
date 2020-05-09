import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './contactus.component';



const routes: Routes = [
  {
    path: '',
    component:ContactusComponent
  },
  
]
 
/////////////////////
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactusRoutingModule { }
