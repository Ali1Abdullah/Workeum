import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyFormComponent } from './company-form.component';
import { CompanyFormRoutingModule } from './compnay-form-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyPopupComponent } from './company-popup/company-popup.component';



@NgModule({
  declarations: [CompanyFormComponent, CompanyPopupComponent],
  imports: [
    CommonModule,
    CompanyFormRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents:[CompanyPopupComponent]
})
export class CompanyFormModule { }
