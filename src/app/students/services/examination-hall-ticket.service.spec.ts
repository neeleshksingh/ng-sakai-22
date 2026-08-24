import { TestBed } from '@angular/core/testing';

import { ExaminationHallTicketService } from './examination-hall-ticket.service';

describe('ExaminationHallTicketService', () => {
  let service: ExaminationHallTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExaminationHallTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
