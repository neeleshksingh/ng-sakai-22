import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSatisfactionSurveyComponent } from './student-satisfaction-survey.component';

describe('StudentSatisfactionSurveyComponent', () => {
  let component: StudentSatisfactionSurveyComponent;
  let fixture: ComponentFixture<StudentSatisfactionSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSatisfactionSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSatisfactionSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
