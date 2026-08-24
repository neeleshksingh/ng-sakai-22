import { TestBed } from '@angular/core/testing';

import { PartnerAppSettingService } from './partner-app-setting.service';

describe('PartnerAppSettingService', () => {
  let service: PartnerAppSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnerAppSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
