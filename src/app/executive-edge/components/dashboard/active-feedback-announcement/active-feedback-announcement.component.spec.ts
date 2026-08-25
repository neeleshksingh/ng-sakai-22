import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveFeedbackAnnouncementComponent } from './active-feedback-announcement.component';

describe('ActiveFeedbackAnnouncementComponent', () => {
  let component: ActiveFeedbackAnnouncementComponent;
  let fixture: ComponentFixture<ActiveFeedbackAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveFeedbackAnnouncementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveFeedbackAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
