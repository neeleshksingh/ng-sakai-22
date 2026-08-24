import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardNoticeComponent } from './student-dashboard-notice.component';

describe('StudentDashboardNoticeComponent', () => {
  let component: StudentDashboardNoticeComponent;
  let fixture: ComponentFixture<StudentDashboardNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDashboardNoticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDashboardNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
