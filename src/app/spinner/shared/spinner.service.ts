import { Component, Injectable } from '@angular/core';
import { BehaviorSubject, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private readonly loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  inyectar(estado?: Partial<Observer<boolean>> | ((value: boolean) => void)) {
    return this.loading.subscribe(estado);
  }

  ejectar() {
    this.loading.complete();
  }

  mostrar() {
    this.loading.next(true);
  }

  ocultar() {
    this.loading.next(false);
  }
}
