import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', redirectTo: 'tickets', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('../pages/auth/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('../pages/auth/register.component').then(m => m.RegisterComponent) },
  { path: 'tickets', loadComponent: () => import('../pages/tickets/tickets.component').then(m => m.TicketsComponent) },
  { path: 'timesheet', loadComponent: () => import('../pages/timesheet/timesheet.component').then(m => m.TimesheetComponent) },
  { path: 'admin/template-builder', loadComponent: () => import('../pages/admin/template-builder.component').then(m => m.TemplateBuilderComponent) },
  { path: '**', redirectTo: 'tickets' }
]
