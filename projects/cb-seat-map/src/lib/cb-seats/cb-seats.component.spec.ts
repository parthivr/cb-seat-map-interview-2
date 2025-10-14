import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbSeatsComponent } from './cb-seats.component';

describe('CbSeatsComponent', () => {
  let component: CbSeatsComponent;
  let fixture: ComponentFixture<CbSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CbSeatsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CbSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
