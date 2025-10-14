import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbSeatMapTravelerPanelComponent } from './cb-seat-map-traveler-panel.component';

describe('CbSeatMapTravelerPanelComponent', () => {
  let component: CbSeatMapTravelerPanelComponent;
  let fixture: ComponentFixture<CbSeatMapTravelerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CbSeatMapTravelerPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CbSeatMapTravelerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
