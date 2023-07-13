import { trigger, transition, style, query, animate, animateChild, group } from "@angular/animations";

export const fader = trigger('routeAnimations', [
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

export const openClose = trigger('routeAnimations', [
  transition('login => registro', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-100%' })
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%' }))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%' }))
      ])
    ])
  ]),
  transition('* => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '100%' })
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '-100%' }))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%' }))
      ])
    ])
  ]),
]);

export const puff = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 1
      })
    ]),
    query(':enter', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0
      })
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('600ms ease-out', style({ opacity: 0, left: '100%' }))
      ]),
      query(':enter', [
        animate('600ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ])
]);

export const slideInBck = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':leave', [
      style({
        position: 'absolute',
        opacity: 1
      })
    ]),
    query(':enter', [
      style({
        position: 'absolute',
        transform: 'translateZ(600px)',
        opacity: 0
      })
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('700ms ease-out', style({ opacity: 0 }))
      ]),
      query(':enter', [
        animate('700ms ease-out', style({ transform: 'translateZ(0)', opacity: 1 }))
      ])
    ])
  ])
]);
