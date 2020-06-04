import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

import { EventsRoutingModule } from './events-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { EventsComponent } from './events.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { EventPopupComponent } from './event-popup/event-popup.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MaterialModule } from '../../material.module';
@NgModule({
  declarations: [EventsComponent, EventPopupComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    LayoutModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MaterialModule
  ],
  entryComponents:[EventPopupComponent]
})
export class EventsModule { }
