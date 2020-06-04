import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './employee-form.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { EmployeeFormRoutingModule } from './employee-form-routing.module';



@NgModule({
  declarations: [EmployeeFormComponent],
  imports: [
    CommonModule,
    LayoutModule,
    EmployeeFormRoutingModule
  ]
})
export class EmployeeFormModule { }
