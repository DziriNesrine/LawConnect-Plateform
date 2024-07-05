import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalandrierComponent } from './calandrier.component';

describe('CalandrierComponent', () => {
  let component: CalandrierComponent;
  let fixture: ComponentFixture<CalandrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalandrierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalandrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
