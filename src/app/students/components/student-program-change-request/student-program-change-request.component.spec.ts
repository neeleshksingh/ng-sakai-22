import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramChangeRequestComponent } from './student-program-change-request.component';

describe('StudentProgramChangeRequestComponent', () => {
  let component: StudentProgramChangeRequestComponent;
  let fixture: ComponentFixture<StudentProgramChangeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProgramChangeRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProgramChangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
