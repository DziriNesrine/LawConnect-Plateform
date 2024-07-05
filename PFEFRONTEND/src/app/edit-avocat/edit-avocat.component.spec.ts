import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAvocatComponent } from './edit-avocat.component';

describe('EditAvocatComponent', () => {
  let component: EditAvocatComponent;
  let fixture: ComponentFixture<EditAvocatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAvocatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAvocatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
