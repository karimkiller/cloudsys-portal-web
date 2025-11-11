import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ApiService } from '../../core/api.service'
import { NgFor } from '@angular/common'

@Component({
  standalone:true, selector:'app-timesheet',
  imports:[FormsModule, NgFor],
  template:`
  <h2>Timesheet</h2>
  <form (ngSubmit)="create()">
    <input type="datetime-local" [(ngModel)]="date" name="date" required>
    <input type="number" [(ngModel)]="durationMs" name="durationMs" min="60000" step="60000" placeholder="Duration (ms)" required>
    <input [(ngModel)]="notes" name="notes" placeholder="Notes">
    <button>Add Entry</button>
  </form>
  <div *ngFor="let e of entries" class="card">
    <div>{{e.date | date:'short'}} — {{e.durationMs/60000}} min — {{e.workType}}</div>
    <small>{{e.notes}}</small>
  </div>
  `,
  styles:[`.card{border:1px solid #eee;padding:12px;margin:8px 0;border-radius:8px}`]
})
export class TimesheetComponent implements OnInit {
  entries:any[]=[]; date=''; durationMs=3600000; notes=''
  constructor(private api:ApiService){}
  ngOnInit(){ this.reload() }
  reload(){ this.api.listTimeEntries().subscribe(d=> this.entries = d as any[]) }
  create(){
    const dto = { date:new Date(this.date).toISOString(), durationMs:this.durationMs, notes:this.notes }
    this.api.createTimeEntry(dto).subscribe(()=>{ this.notes=''; this.reload() })
  }
}
