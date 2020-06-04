import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    LayoutModule,
    MaterialModule,

  ]
})
export class ProductsModule { }
