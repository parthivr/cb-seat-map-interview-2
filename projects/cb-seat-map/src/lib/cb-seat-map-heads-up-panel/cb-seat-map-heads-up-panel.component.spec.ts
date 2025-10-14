import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbSeatMapHeadsUpPanelComponent } from './cb-seat-map-heads-up-panel.component';

describe('CbSeatMapHeadsUpPanelComponent', () => {
  let component: CbSeatMapHeadsUpPanelComponent;
  let fixture: ComponentFixture<CbSeatMapHeadsUpPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CbSeatMapHeadsUpPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CbSeatMapHeadsUpPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
