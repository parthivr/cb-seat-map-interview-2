import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbSeatMapSectionComponent } from './cb-seat-map-section.component';

describe('CbSeatMapSectionComponent', () => {
  let component: CbSeatMapSectionComponent;
  let fixture: ComponentFixture<CbSeatMapSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CbSeatMapSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CbSeatMapSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
