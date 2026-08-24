import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInfoUpdateRequestComponent } from './student-info-update-request.component';

describe('StudentInfoUpdateRequestComponent', () => {
  let component: StudentInfoUpdateRequestComponent;
  let fixture: ComponentFixture<StudentInfoUpdateRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentInfoUpdateRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInfoUpdateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
