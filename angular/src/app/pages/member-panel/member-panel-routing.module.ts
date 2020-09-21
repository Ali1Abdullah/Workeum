import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MemberPanelComponent } from './member-panel.component';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import { EditMemberProfileComponent } from './edit-member-profile/edit-member-profile.component';
import { ManageReservationComponent } from './manage-reservation/manage-reservation.component';




const routes: Routes = [
  {
    path: '',
    component:MemberPanelComponent,
    children: [
      { path: '',  component: SeatBookingComponent },
      { path: 'profile',  component: EditMemberProfileComponent },
      { path: 'manage-reservation',  component: ManageReservationComponent },
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
