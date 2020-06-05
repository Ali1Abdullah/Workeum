import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberPanelComponent } from './member-panel.component';
import { MemberPanelRoutingModule } from './member-panel-routing.module';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';



@NgModule({
  declarations: [MemberPanelComponent, SeatBookingComponent],
  imports: [
    CommonModule,
    MemberPanelRoutingModule
  ]
})
export class MemberPanelModule { }
