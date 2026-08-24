import { TestBed } from '@angular/core/testing';

import { StudentOnboardingLoginService } from './student-onboarding-login.service';

describe('StudentOnboardingLoginService', () => {
  let service: StudentOnboardingLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentOnboardingLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
