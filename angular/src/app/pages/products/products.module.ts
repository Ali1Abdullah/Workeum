import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MaterialModule } from 'src/app/material.module';
import { ProductsCompanyPopupComponent } from './products-company-popup/products-company-popup.component';
import { ProductsMemberPopupComponent } from './products-member-popup/products-member-popup.component';




@NgModule({
  declarations: [ProductsComponent, ProductsCompanyPopupComponent, ProductsMemberPopupComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    LayoutModule,
    MaterialModule
  ],
  entryComponents:[ProductsCompanyPopupComponent, ProductsMemberPopupComponent]
})
export class ProductsModule { }
