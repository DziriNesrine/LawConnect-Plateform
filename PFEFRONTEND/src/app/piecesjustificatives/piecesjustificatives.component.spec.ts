import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesjustificativesComponent } from './piecesjustificatives.component';

describe('PiecesjustificativesComponent', () => {
  let component: PiecesjustificativesComponent;
  let fixture: ComponentFixture<PiecesjustificativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiecesjustificativesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiecesjustificativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
