import { Routes } from '@angular/router'
import { authGuard } from '../app/core/auth.guard'
import { roleGuard } from '../app/core/role.guard'
import { ShellComponent } from '../app/shared/shell.component'

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('../app/pages/auth/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('../app/pages/auth/register.component').then(m => m.RegisterComponent) },

  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'tickets' },
      { path: 'tickets', loadComponent: () => import('../app/pages/tickets/tickets.component').then(m => m.TicketsComponent) },
      { path: 'timesheet', loadComponent: () => import('../app/pages/timesheet/timesheet.component').then(m => m.TimesheetComponent) },
      {
        path: 'admin/template-builder',
        canActivate: [roleGuard(['OWNER','ADMIN','MANAGER'])],
        loadComponent: () => import('../app/pages/admin/template-builder.component').then(m => m.TemplateBuilderComponent)
      }
    ]
  },

  { path: '**', redirectTo: '' }
]
