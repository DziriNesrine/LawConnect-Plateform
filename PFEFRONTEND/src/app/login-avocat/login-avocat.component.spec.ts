import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAvocatComponent } from './login-avocat.component';

describe('LoginAvocatComponent', () => {
  let component: LoginAvocatComponent;
  let fixture: ComponentFixture<LoginAvocatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAvocatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAvocatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
