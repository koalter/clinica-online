import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesEspecialistaComponent } from './acciones-especialista.component';

describe('AccionesEspecialistaComponent', () => {
  let component: AccionesEspecialistaComponent;
  let fixture: ComponentFixture<AccionesEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccionesEspecialistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccionesEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
