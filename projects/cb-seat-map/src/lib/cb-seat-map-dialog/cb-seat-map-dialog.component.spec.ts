import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbSeatMapDialogComponent } from './cb-seat-map-dialog.component';

describe('CbSeatMapDialogComponent', () => {
  let component: CbSeatMapDialogComponent;
  let fixture: ComponentFixture<CbSeatMapDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CbSeatMapDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CbSeatMapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
