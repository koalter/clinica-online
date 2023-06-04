import { Component } from '@angular/core';
import { SpinnerService } from './shared/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  isLoading!: boolean;

  constructor(private svc: SpinnerService) {
    this.svc.inyectar(state => {
      this.isLoading = state;
    });
  }
}
