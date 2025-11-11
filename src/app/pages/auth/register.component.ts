import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../core/auth.service'

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule],
  template: `
  <h2>Register</h2>
  <form (ngSubmit)="submit()">
    <label>Email <input [(ngModel)]="email" name="email" type="email" required></label>
    <label>Password <input [(ngModel)]="password" name="password" type="password" required></label>
    <button>Create Account</button>
  </form>
  <p>Already have an account? <a routerLink="/login">Login</a></p>
  `,
})
export class RegisterComponent {
  email=''; password=''
  constructor(private auth: AuthService, private router: Router){}
  submit(){
    this.auth.register(this.email, this.password).subscribe(res=>{
      this.auth.saveToken(res.access_token)
      this.router.navigateByUrl('/tickets')
    })
  }
}
