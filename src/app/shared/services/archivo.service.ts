import { Injectable } from '@angular/core';
import { utils, writeFile } from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor() { }

  exportarXLS(nombre: string, data: any) {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet);
    writeFile(workbook, `${nombre}.xlsx`, { compression: true });
  }
}
