import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOnboardingLoginComponent } from './student-onboarding-login.component';

describe('StudentOnboardingLoginComponent', () => {
  let component: StudentOnboardingLoginComponent;
  let fixture: ComponentFixture<StudentOnboardingLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentOnboardingLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentOnboardingLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
