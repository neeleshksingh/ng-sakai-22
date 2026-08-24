import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusHostelOptInOptOutComponent } from './bus-hostel-opt-in-opt-out.component';

describe('BusHostelOptInOptOutComponent', () => {
  let component: BusHostelOptInOptOutComponent;
  let fixture: ComponentFixture<BusHostelOptInOptOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusHostelOptInOptOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusHostelOptInOptOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
