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
import { EditEmployeePopupComponent } from './employee-management/edit-employee-popup/edit-employee-popup.component';
import { EditCompanyPopupComponent } from './company-management/edit-company-popup/edit-company-popup.component';
import { ReservationsManagementComponent } from './reservations-management/reservations-management.component';
import { CofirmEditEmployeePopupComponent } from './employee-management/edit-employee-popup/cofirm-edit-employee-popup/cofirm-edit-employee-popup.component';
import { AddPopupComponent } from './event-add/add-popup/add-popup.component';


@NgModule({
  declarations: [AdminComponent, EventManagementComponent, MessagesComponent, EventManagementPopupComponent, EventAddComponent, EmployeeManagementComponent, CompanyManagementComponent, EditEmployeePopupComponent, EditCompanyPopupComponent, ReservationsManagementComponent, CofirmEditEmployeePopupComponent, AddPopupComponent],
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
  entryComponents:[EventManagementPopupComponent,EditEmployeePopupComponent,EditCompanyPopupComponent,CofirmEditEmployeePopupComponent, AddPopupComponent]
})
export class AdminModule { }
