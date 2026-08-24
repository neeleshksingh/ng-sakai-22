import { TestBed } from '@angular/core/testing';

import { StudentProfileUpdateRequestService } from './student-profile-update-request.service';

describe('StudentProfileUpdateRequestService', () => {
  let service: StudentProfileUpdateRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentProfileUpdateRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
