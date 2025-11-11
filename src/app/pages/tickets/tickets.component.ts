import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../core/api.service'
import { NgFor, NgIf } from '@angular/common'

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
  constructor(private api: ApiService){}
  ngOnInit(){ this.reload() }
  reload(){ this.api.listTickets().subscribe(d=> this.list = d as any[]) }
  create(){ this.api.createTicket(this.form).subscribe(()=>{ this.form={}; this.reload() }) }
}
