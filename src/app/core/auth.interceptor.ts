import { HttpInterceptorFn } from '@angular/common/http'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  try {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('cloudsys_token')
      if (token) {
        req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      }
    }
  } catch { /* noop for SSR or restricted environments */ }

  return next(req)
}
