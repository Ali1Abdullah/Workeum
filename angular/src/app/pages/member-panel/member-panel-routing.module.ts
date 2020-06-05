import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MemberPanelComponent } from './member-panel.component';




const routes: Routes = [
  {
    path: '',
    component:MemberPanelComponent,
    // children: [
    //   { path: 'events',  component: EventManagementComponent },
    //   { path: 'add-event',  component: EventAddComponent },
    //   { path: 'messages',  component: MessagesComponent },
    //   { path: 'employee',  component: EmployeeManagementComponent },
    // ]
  }

  
]
 
/////////////////////
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberPanelRoutingModule { }
