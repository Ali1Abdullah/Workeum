import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MemberPanelComponent } from './member-panel.component';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';




const routes: Routes = [
  {
    path: '',
    component:MemberPanelComponent,
    children: [
      { path: 'seats',  component: SeatBookingComponent },
    //   { path: 'add-event',  component: EventAddComponent },
    //   { path: 'messages',  component: MessagesComponent },
    //   { path: 'employee',  component: EmployeeManagementComponent },
    ]
  }

  
]
 
/////////////////////
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberPanelRoutingModule { }