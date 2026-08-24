import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGeneralInformationComponent } from './student-general-information.component';

describe('StudentGeneralInformationComponent', () => {
  let component: StudentGeneralInformationComponent;
  let fixture: ComponentFixture<StudentGeneralInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentGeneralInformationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StudentGeneralInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
