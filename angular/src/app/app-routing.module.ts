import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexModule } from './pages/index/index.module';
import { EventsModule } from './pages/events/events.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/events/events.module').then(m => m.EventsModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contactus/contactus.module').then(m => m.ContactusModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
