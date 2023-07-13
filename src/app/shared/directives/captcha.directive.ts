import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CaptchaService } from '../services/captcha.service';
import { FeatureFlagService } from '../services/feature-flag.service';

@Directive({
  selector: '[appCaptcha]'
})
export class CaptchaDirective implements OnInit, OnDestroy {

  private isActive: boolean = false;

  constructor(private captchaService: CaptchaService,
    private featureFlagService: FeatureFlagService,
    private el: ElementRef
  ) { }

  async ngOnInit() {
    this.el.nativeElement.style.display = 'none';
    this.isActive = await this.featureFlagService.captchaHabilitado();
    
    if (this.isActive) {
      this.el.nativeElement.style.display = 'initial';
    }
  }

  ngOnDestroy() {
    this.captchaService.set('');
  }

  @HostListener('resolved', ['$event']) onResolved(event: any) {
    if (this.isActive) {
      this.captchaService.set(event);
    }
  }
}
