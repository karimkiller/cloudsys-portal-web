import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  standalone: true,
  selector: 'app-template-builder',
  imports: [FormsModule],
  template: `
  <h2>Admin • Template Builder</h2>
  <p>Define a template your boss can fill when going to client sites.</p>
  <label>Template Name <input [(ngModel)]="name"></label>
  <label>Fields (comma-separated) <input [(ngModel)]="fieldsRaw" placeholder="Client, Location, Purpose, Start, End"></label>
  <button (click)="save()">Save Template</button>

  <h3>Preview</h3>
  <ul><li *ngFor="let f of fields">{{f}}</li></ul>
  `,
})
export class TemplateBuilderComponent {
  name='Client Visit Form'
  fieldsRaw='Client, Location, Purpose, Start, End'
  get fields(){ return this.fieldsRaw.split(',').map(s=>s.trim()).filter(Boolean) }
  save(){ alert(`Saved "${this.name}" with fields: ${this.fields.join(', ')}`) }
}
