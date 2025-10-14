import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbSeatMapPreviewLegendComponent } from './cb-seat-map-preview-legend.component';

describe('CbSeatMapPreviewLegendComponent', () => {
  let component: CbSeatMapPreviewLegendComponent;
  let fixture: ComponentFixture<CbSeatMapPreviewLegendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CbSeatMapPreviewLegendComponent]
    });
    fixture = TestBed.createComponent(CbSeatMapPreviewLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
