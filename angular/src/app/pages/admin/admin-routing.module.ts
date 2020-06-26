import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { MessagesComponent } from './messages/messages.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { CompanyManagementComponent } from './company-management/company-management.component';



const routes: Routes = [
  {
    path: '',
    component:AdminComponent,
    children: [
      { path: 'events',  component: EventManagementComponent },
      { path: 'add-event',  component: EventAddComponent },
      { path: 'messages',  component: MessagesComponent },
      { path: 'employee',  component: EmployeeManagementComponent },
      { path: 'companies',  component: CompanyManagementComponent },
    ]
  }

  
]
 
/////////////////////
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
