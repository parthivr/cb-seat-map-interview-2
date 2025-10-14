import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbSeatMapLegendComponent } from './cb-seat-map-legend.component';

describe('CbSeatMapLegendComponent', () => {
  let component: CbSeatMapLegendComponent;
  let fixture: ComponentFixture<CbSeatMapLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CbSeatMapLegendComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CbSeatMapLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
