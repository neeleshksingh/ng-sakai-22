import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchAttendanceSummaryComponent } from './batch-attendance-summary.component';

describe('BatchAttendanceSummaryComponent', () => {
  let component: BatchAttendanceSummaryComponent;
  let fixture: ComponentFixture<BatchAttendanceSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchAttendanceSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchAttendanceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
