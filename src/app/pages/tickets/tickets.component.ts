import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { NgFor, NgIf } from '@angular/common'
import { environment } from '../../../environments/environment'

@Component({
  standalone:true, selector:'app-tickets',
  imports:[FormsModule, NgFor, NgIf],
  template:`
  <h2>Tickets</h2>
  <form (ngSubmit)="create()">
    <input [(ngModel)]="form.title" name="title" placeholder="Title" required>
    <input [(ngModel)]="form.description" name="description" placeholder="Description">
    <button>Create</button>
  </form>
  <div *ngIf="list?.length; else empty">
    <div *ngFor="let t of list" class="card">
      <div><b>{{t.title}}</b></div>
      <div>{{t.description}}</div>
      <small>{{t.status}} · {{t.priority}}</small>
    </div>
  </div>
  <ng-template #empty><p>No tickets yet.</p></ng-template>
  `,
  styles:[`.card{border:1px solid #eee;padding:12px;margin:8px 0;border-radius:8px}`]
})
export class TicketsComponent implements OnInit {
  list:any[]=[]; form:any={title:'', description:''}
  constructor(private http: HttpClient){}
  ngOnInit(){ this.reload() }
  reload(){ this.http.get<any[]>(`${environment.apiUrl}/tickets`).subscribe(d=> this.list=d) }
  create(){ this.http.post(`${environment.apiUrl}/tickets`, this.form).subscribe(()=>{ this.form={}; this.reload() }) }
}
