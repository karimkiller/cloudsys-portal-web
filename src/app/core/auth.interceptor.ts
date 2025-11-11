import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from './auth.service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService)
  const router = inject(Router)

  if (auth.token) req = req.clone({ setHeaders: { Authorization: `Bearer ${auth.token}` } })

  return next(req).pipe({
    error(err, _caught) {
      if (err?.status === 401) {
        auth.logout()
        router.navigateByUrl('/login')
      }
      throw err
    }
  } as any)
}
