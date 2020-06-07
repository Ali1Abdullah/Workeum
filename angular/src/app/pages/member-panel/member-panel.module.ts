import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberPanelComponent } from './member-panel.component';
import { MemberPanelRoutingModule } from './member-panel-routing.module';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import { MaterialModule } from 'src/app/material.module';
import { LayoutModule } from 'src/app/layout/layout.module';



@NgModule({
  declarations: [MemberPanelComponent, SeatBookingComponent],
  imports: [
    CommonModule,
    MemberPanelRoutingModule,
    MaterialModule,
    LayoutModule
  ]
})
export class MemberPanelModule { }
