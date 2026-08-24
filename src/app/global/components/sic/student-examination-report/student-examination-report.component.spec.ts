import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExaminationReportComponent } from './student-examination-report.component';

describe('StudentExaminationReportComponent', () => {
  let component: StudentExaminationReportComponent;
  let fixture: ComponentFixture<StudentExaminationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentExaminationReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentExaminationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
