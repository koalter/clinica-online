import { Component, Input } from '@angular/core';

@Component({
  selector: 'link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss']
})
export class LinkButtonComponent {
  @Input() titulo: string | null | undefined;
  @Input() url: string | any[] | null | undefined;
  @Input() faClass: string | string[] | Set<string> | { [klass: string]: any} | null | undefined;
}
