import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindavocatComponent } from './findavocat.component';

describe('FindavocatComponent', () => {
  let component: FindavocatComponent;
  let fixture: ComponentFixture<FindavocatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindavocatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindavocatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
