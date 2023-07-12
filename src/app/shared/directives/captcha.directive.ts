import { Directive, HostListener } from '@angular/core';
import { CaptchaService } from '../services/captcha.service';

@Directive({
  selector: '[appCaptcha]'
})
export class CaptchaDirective {

  constructor(private captchaService: CaptchaService) {}

  @HostListener('resolved', ['$event']) onResolved(event: any) {
    this.captchaService.set(event);
  }
}
