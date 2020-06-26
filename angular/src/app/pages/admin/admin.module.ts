import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MaterialModule } from 'src/app/material.module';
import { EventManagementComponent } from './event-management/event-management.component';
import { MessagesComponent } from './messages/messages.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { EventManagementPopupComponent } from './event-management/event-management-popup/event-management-popup.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { CompanyManagementComponent } from './company-management/company-management.component';


@NgModule({
  declarations: [AdminComponent, EventManagementComponent, MessagesComponent, EventManagementPopupComponent, EventAddComponent, EmployeeManagementComponent, CompanyManagementComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CommonModule,
    LayoutModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MaterialModule
  ],
  entryComponents:[EventManagementPopupComponent]
})
export class AdminModule { }
