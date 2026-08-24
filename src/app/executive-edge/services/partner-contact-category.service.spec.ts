import { TestBed } from '@angular/core/testing';

import { PartnerContactCategoryService } from '../../cloud-bytes/services/partner-contact-category.service';

describe('PartnerContactCategoryService', () => {
  let service: PartnerContactCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnerContactCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
