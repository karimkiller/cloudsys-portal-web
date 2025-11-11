import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  template: `
  <h2>Login</h2>
  <form (ngSubmit)="submit()">
    <label>Email <input [(ngModel)]="email" name="email" type="email" required></label>
    <label>Password <input [(ngModel)]="password" name="password" type="password" required></label>
    <button>Login</button>
  </form>
  <p>New here? <a routerLink="/register">Register</a></p>
  `
})
export class LoginComponent {
  email=''; password=''
  constructor(private http: HttpClient, private router: Router) {}
  submit(){
    this.http.post<{access_token:string}>(`${environment.apiUrl}/auth/login`, { email:this.email, password:this.password })
      .subscribe(res => { localStorage.setItem('cloudsys_token', res.access_token); this.router.navigateByUrl('/tickets') })
  }
}
