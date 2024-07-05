import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calandrier1Component } from './calandrier1.component';

describe('Calandrier1Component', () => {
  let component: Calandrier1Component;
  let fixture: ComponentFixture<Calandrier1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Calandrier1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Calandrier1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
