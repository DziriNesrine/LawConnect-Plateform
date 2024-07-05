import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilAvocatComponent } from './profil-avocat.component';

describe('ProfilAvocatComponent', () => {
  let component: ProfilAvocatComponent;
  let fixture: ComponentFixture<ProfilAvocatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilAvocatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilAvocatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
