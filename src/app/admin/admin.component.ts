import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { fader, puff } from '../shared/animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    fader
  ]
})
export class AdminComponent {
  constructor(private contexts: ChildrenOutletContexts) { }

  manejarAnimaciones() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
