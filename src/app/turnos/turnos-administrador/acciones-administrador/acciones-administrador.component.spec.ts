import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesAdministradorComponent } from './acciones-administrador.component';

describe('AccionesAdministradorComponent', () => {
  let component: AccionesAdministradorComponent;
  let fixture: ComponentFixture<AccionesAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccionesAdministradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccionesAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
