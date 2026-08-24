import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramProvisionalLandingComponent } from './student-program-provisional-landing.component';

describe('StudentProgramProvisionalLandingComponent', () => {
  let component: StudentProgramProvisionalLandingComponent;
  let fixture: ComponentFixture<StudentProgramProvisionalLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProgramProvisionalLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProgramProvisionalLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
