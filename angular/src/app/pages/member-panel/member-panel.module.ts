import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberPanelComponent } from './member-panel.component';
import { MemberPanelRoutingModule } from './member-panel-routing.module';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import { MaterialModule } from 'src/app/material.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { EditMemberProfileComponent } from './edit-member-profile/edit-member-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MemberPanelComponent, SeatBookingComponent, EditMemberProfileComponent],
  imports: [
    CommonModule,
    MemberPanelRoutingModule,
    MaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MemberPanelModule { }
