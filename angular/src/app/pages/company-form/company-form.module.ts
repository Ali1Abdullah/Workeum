import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyFormComponent } from './company-form.component';
import { CompanyFormRoutingModule } from './compnay-form-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';



@NgModule({
  declarations: [CompanyFormComponent],
  imports: [
    CommonModule,
    CompanyFormRoutingModule,
    LayoutModule
  ]
})
export class CompanyFormModule { }
