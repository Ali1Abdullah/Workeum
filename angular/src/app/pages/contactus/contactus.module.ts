import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactusComponent } from './contactus.component';
import { ContactusRoutingModule } from './contactus-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';



@NgModule({
  declarations: [ContactusComponent],
  imports: [
    CommonModule,
    ContactusRoutingModule,
    LayoutModule
  ]
})
export class ContactusModule { }
