import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SeatsBookingComponent } from './seats-booking.component';


const routes: Routes = [
  {
    path: '',
    component:SeatsBookingComponent
  },
  
]
 
/////////////////////
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeatsBookingRoutingModule { }
