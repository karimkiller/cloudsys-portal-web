import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../core/auth.service'

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  template: `
  <h2>Login</h2>
  <form (ngSubmit)="submit()">
    <label>Email <input [(ngModel)]="email" name="email" type="email" required></label>
    <label>Password <input [(ngModel)]="password" name="password" type="password" required></label>
    <button>Login</button>
  </form>
  <p>New here? <a routerLink="/register">Register</a></p>
  `,
})
export class LoginComponent {
  email=''; password=''
  constructor(private auth: AuthService, private router: Router){}
  submit(){
    this.auth.login(this.email, this.password).subscribe(res=>{
      this.auth.saveToken(res.access_token)
      this.router.navigateByUrl('/tickets')
    })
  }
}
