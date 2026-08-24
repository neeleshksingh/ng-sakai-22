import { TestBed } from '@angular/core/testing';

import { ExaminationScrutinyApplicationService } from './examination-scrutiny-application.service';

describe('ExaminationScrutinyApplicationService', () => {
  let service: ExaminationScrutinyApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExaminationScrutinyApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
