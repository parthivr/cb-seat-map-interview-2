import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbSeatMapLearnMoreDrawerComponent } from './cb-seat-map-learn-more-drawer.component';

describe('CbSeatMapLearnMoreDrawerComponent', () => {
  let component: CbSeatMapLearnMoreDrawerComponent;
  let fixture: ComponentFixture<CbSeatMapLearnMoreDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CbSeatMapLearnMoreDrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CbSeatMapLearnMoreDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
