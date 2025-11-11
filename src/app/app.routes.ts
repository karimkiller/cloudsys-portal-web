import { Routes } from '@angular/router'

export const routes: Routes = [
 { path: 'login', loadComponent: () => import('../app/pages/auth/login.component').then(m => m.LoginComponent) },
{ path: 'register', loadComponent: () => import('../app/pages/auth/register.component').then(m => m.RegisterComponent) },
{ path: 'tickets', loadComponent: () => import('../app/pages/tickets/tickets.component').then(m => m.TicketsComponent) },
{ path: 'timesheet', loadComponent: () => import('../app/pages/timesheet/timesheet.component').then(m => m.TimesheetComponent) },
{ path: 'admin/template-builder', loadComponent: () => import('../app/pages/admin/template-builder.component').then(m => m.TemplateBuilderComponent) },

]
