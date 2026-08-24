import { TestBed } from '@angular/core/testing';

import { BatchAttendanceService } from './batch-attendance.service';

describe('BatchAttendanceService', () => {
  let service: BatchAttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchAttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
