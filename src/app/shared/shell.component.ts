import { Component, signal } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { MaterialModule } from './material'
import { NgIf } from '@angular/common'
import { AuthService } from '../core/auth.service'

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [MaterialModule, RouterOutlet, RouterLink, NgIf],
  styles: [`
    .layout { display:flex; height:100vh; }
    .sidenav { width: 240px; }
    .content { flex:1; padding:24px; overflow:auto; }
    .brand { font-weight:700; letter-spacing:.2px }
    .spacer { flex:1 }
    a { text-decoration:none; color:inherit }
  `],
  template: `
  <div class="layout">
    <mat-sidenav-container class="layout">
      <mat-sidenav mode="side" opened class="sidenav">
        <mat-toolbar>CloudSys</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="/tickets">Tickets</a>
          <a mat-list-item routerLink="/timesheet">Timesheet</a>
          <a mat-list-item routerLink="/admin/template-builder">Template Builder</a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span class="brand">Dev Team Portal</span>
          <span class="spacer"></span>
          <button mat-button (click)="logout()">Logout</button>
        </mat-toolbar>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  </div>
  `
})
export class ShellComponent {
  constructor(private auth: AuthService) {}
  logout(){ this.auth.logout() }
}
