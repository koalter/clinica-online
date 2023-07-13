import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  private readonly token: BehaviorSubject<string> = new BehaviorSubject<string>('');
  
  constructor() { }

  get() {
    return this.token;
  }

  set(valor: string) {
    this.token.next(valor);
  }
}
