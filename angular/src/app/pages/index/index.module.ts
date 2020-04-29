import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { IndexComponent } from './index.component';
import { IndexRoutingModule } from './index-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {NgsRevealModule} from 'ngx-scrollreveal';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    LayoutModule,
    SlickCarouselModule,
    NgsRevealModule
  ]
})
export class IndexModule { }
