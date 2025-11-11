import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterLink, Router } from '@angular/router'
import { MaterialModule } from '../../shared/material'
import { HttpClient } from '@angular/common/http'
import { AuthService } from '../../core/auth.service'
import { environment } from '../../../environments/environment'

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, MaterialModule, RouterLink],
  template: `
  <div style="display:grid;place-items:center;height:80vh">
    <mat-card style="width:360px">
      <h2 mat-card-title>Sign in</h2>
      <mat-card-content>
        <form (ngSubmit)="submit()" #f="ngForm">
          <mat-form-field appearance="outline" style="width:100%">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="email" name="email" type="email" required>
          </mat-form-field>

          <mat-form-field appearance="outline" style="width:100%">
            <mat-label>Password</mat-label>
            <input matInput [(ngModel)]="password" name="password" type="password" required>
          </mat-form-field>

          <button mat-flat-button color="primary" style="width:100%">Login</button>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <a routerLink="/register">Create an account</a>
      </mat-card-actions>
    </mat-card>
  </div>
  `
})
export class LoginComponent {
  email=''; password=''
  constructor(private auth: AuthService, private router: Router, private http: HttpClient) {}
  submit(){
    this.auth.login(this.email, this.password).subscribe(res=>{
      this.auth.setToken(res.access_token)
      this.router.navigateByUrl('/tickets')
    })
  }
}
