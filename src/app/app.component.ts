import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { openClose } from './shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    openClose
  ]
})
export class AppComponent {
  title = 'Cea Salud';

  constructor(private contexts: ChildrenOutletContexts) { }

  manejarAnimaciones() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
