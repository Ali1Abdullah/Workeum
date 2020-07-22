import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexModule } from './pages/index/index.module';
import { EventsModule } from './pages/events/events.module';
import { AdminAuthGuardService, AuthGuardService } from './services/auth.service';

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
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'companyform',
    loadChildren: () => import('./pages/company-form/company-form.module').then(m => m.CompanyFormModule)
  },
  {
    path: 'employeefrom',
    loadChildren: () => import('./pages/employee-form/employee-form.module').then(m => m.EmployeeFormModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate:[AdminAuthGuardService]
  },
  {
    path: 'member-panel',
    loadChildren: () => import('./pages/member-panel/member-panel.module').then(m => m.MemberPanelModule),
    // canActivate:[AuthGuardService]
  },
  {
    path: 'login-member',
    loadChildren: () => import('./pages/login-member/login-member.module').then(m => m.LoginMemberModule)
  },
  {
    path: 'login-admin',
    loadChildren: () => import('./pages/login-admin/login-admin.module').then(m => m.LoginAdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
