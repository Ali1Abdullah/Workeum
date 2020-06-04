import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactusComponent } from './contactus.component';
import { ContactusRoutingModule } from './contactus-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ContactusComponent],
  imports: [
    CommonModule,
    ContactusRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule
  ]
})
export class ContactusModule { }
