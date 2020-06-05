import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatsBookingComponent } from './seats-booking.component';
import { SeatsBookingRoutingModule } from './seats-booking-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [SeatsBookingComponent],
  imports: [
    CommonModule,
    SeatsBookingRoutingModule,
    LayoutModule,
    MaterialModule
  ]
})
export class SeatsBookingModule { }
