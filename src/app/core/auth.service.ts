import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'
import jwtDecode from 'jwt-decode'

type LoginResp = { access_token: string }
type Decoded = { sub: string; email?: string; role?: string; exp?: number }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'cloudsys_token'
  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http.post<LoginResp>(`${environment.apiUrl}/auth/register`, { email, password })
  }
  login(email: string, password: string) {
    return this.http.post<LoginResp>(`${environment.apiUrl}/auth/login`, { email, password })
  }
  saveToken(t: string) { localStorage.setItem(this.tokenKey, t) }
  token(): string | null { return localStorage.getItem(this.tokenKey) }
  logout() { localStorage.removeItem(this.tokenKey) }
  isAuthed(): boolean {
    const t = this.token()
    if (!t) return false
    try {
      const d = jwtDecode<Decoded>(t)
      return !!d?.sub && (!d?.exp || d.exp * 1000 > Date.now())
    } catch { return false }
  }
}
