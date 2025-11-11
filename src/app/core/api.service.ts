import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  // Tickets
  listTickets() { return this.http.get<any[]>(`${environment.apiUrl}/tickets`) }
  createTicket(dto: any) { return this.http.post(`${environment.apiUrl}/tickets`, dto) }

  // Time entries
  listTimeEntries() { return this.http.get<any[]>(`${environment.apiUrl}/time-entries`) }
  createTimeEntry(dto: any) { return this.http.post(`${environment.apiUrl}/time-entries`, dto) }
}
