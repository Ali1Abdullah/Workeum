import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactusComponent } from './contactus.component';
import { ContactusRoutingModule } from './contactus-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactPopupComponent } from './contact-popup/contact-popup.component';



@NgModule({
  declarations: [ContactusComponent, ContactPopupComponent],
  imports: [
    CommonModule,
    ContactusRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule
  ],
  entryComponents:[ContactPopupComponent]
})
export class ContactusModule { }
