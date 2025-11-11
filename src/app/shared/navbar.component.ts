import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="nav">
      <a routerLink="/tickets" routerLinkActive="active">Tickets</a>
      <a routerLink="/timesheet" routerLinkActive="active">Timesheet</a>
      <a routerLink="/admin/template-builder" routerLinkActive="active">Admin</a>
      <span class="spacer"></span>
      <a routerLink="/login">Login</a>
      <a routerLink="/register">Register</a>
    </nav>
  `,
  styles:[`
    .nav{display:flex;gap:16px;align-items:center;padding:12px 16px;border-bottom:1px solid #eee}
    .spacer{flex:1}
    a.active{font-weight:700}
  `]
})
export class NavbarComponent {}
