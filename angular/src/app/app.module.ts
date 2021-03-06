import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HttpService } from './services/http.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { EventsComponent } from './pages/events/events.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MaterialModule } from './material.module';
import { AdminAuthService } from './services/admin-auth.service';
import { AdminAuthGuardService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    MaterialModule
    
  ],
  providers: [HttpService,HttpClient, AdminAuthService,AdminAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
