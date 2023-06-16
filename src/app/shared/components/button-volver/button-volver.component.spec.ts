import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonVolverComponent } from './button-volver.component';

describe('ButtonVolverComponent', () => {
  let component: ButtonVolverComponent;
  let fixture: ComponentFixture<ButtonVolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonVolverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonVolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
