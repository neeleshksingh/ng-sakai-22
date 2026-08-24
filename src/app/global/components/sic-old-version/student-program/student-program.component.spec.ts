import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramComponent } from './student-program.component';

describe('StudentProgramComponent', () => {
  let component: StudentProgramComponent;
  let fixture: ComponentFixture<StudentProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
