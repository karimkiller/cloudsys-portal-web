import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { NavbarComponent } from '../app/shared/navbar.component'
import { authInterceptor } from '../app/core/auth.interceptor'



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container"><router-outlet></router-outlet></div>
  `,
  styles: [`.container{max-width:1080px;margin:24px auto;padding:0 16px}`]
})
export class AppComponent {}
