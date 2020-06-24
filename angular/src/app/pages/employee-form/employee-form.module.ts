import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './employee-form.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { EmployeeFormRoutingModule } from './employee-form-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [EmployeeFormComponent],
  imports: [
    CommonModule,
    LayoutModule,
    EmployeeFormRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeFormModule { }
