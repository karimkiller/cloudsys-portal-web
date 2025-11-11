import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'

type JwtPayload = { sub: string; email: string; role?: 'OWNER'|'ADMIN'|'MANAGER'|'DEVELOPER'|'CONTRACTOR'|'CLIENT'; exp?: number }

function decode<T>(token: string): T | null {
  try { return JSON.parse(atob(token.split('.')[1])) as T } catch { return null }
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient)
  private router = inject(Router)
  private storageKey = 'cloudsys_token'

  get token(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.storageKey)
  }
  get payload(): JwtPayload | null {
    const t = this.token
    return t ? decode<JwtPayload>(t) : null
  }
  get isLoggedIn(): boolean {
    const p = this.payload
    if (!p?.exp) return !!p
    return Date.now() < p.exp * 1000
  }
  get role() { return this.payload?.role ?? 'CLIENT' }

  login(email: string, password: string) {
    return this.http.post<{ access_token: string }>(`${environment.apiUrl}/auth/login`, { email, password })
  }
  register(email: string, password: string) {
    return this.http.post<{ access_token: string }>(`${environment.apiUrl}/auth/register`, { email, password })
  }
  setToken(token: string) {
    if (typeof window !== 'undefined') localStorage.setItem(this.storageKey, token)
  }
  logout() {
    if (typeof window !== 'undefined') localStorage.removeItem(this.storageKey)
    this.router.navigateByUrl('/login')
  }
}
