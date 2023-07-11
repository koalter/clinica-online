import { Component, OnInit } from '@angular/core';
import { LogService } from '../../../shared/services/log.service';
import { LogUsuario } from '../../../shared/domains/log-usuario.model';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logs?: LogUsuario[];

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.logService.traerLogsUsuarios()
    .then(logs => {
      this.logs = logs;
    });
  }
}
