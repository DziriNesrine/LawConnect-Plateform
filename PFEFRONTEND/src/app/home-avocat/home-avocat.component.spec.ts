import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAvocatComponent } from './home-avocat.component';

describe('HomeAvocatComponent', () => {
  let component: HomeAvocatComponent;
  let fixture: ComponentFixture<HomeAvocatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAvocatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAvocatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
