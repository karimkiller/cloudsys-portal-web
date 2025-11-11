import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from './auth.service'

export const roleGuard = (allowed: Array<string>): CanActivateFn => {
  return () => {
    const auth = inject(AuthService)
    const router = inject(Router)
    if (!auth.isLoggedIn) { router.navigateByUrl('/login'); return false }
    if (allowed.includes(auth.role)) return true
    router.navigateByUrl('/tickets') // fallback
    return false
  }
}
