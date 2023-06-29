import { trigger, transition, style, query, animate } from "@angular/animations";

export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'translateY(-50px)'
        })
      ]),
      query(':enter', [
        animate('600ms ease',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ]),
    ])
  ]);
