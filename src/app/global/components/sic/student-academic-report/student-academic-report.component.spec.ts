import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAcademicReportComponent } from './student-academic-report.component';

describe('StudentAcademicReportComponent', () => {
  let component: StudentAcademicReportComponent;
  let fixture: ComponentFixture<StudentAcademicReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAcademicReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAcademicReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
