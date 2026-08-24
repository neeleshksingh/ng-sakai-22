import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBasicInformationComponent } from './student-basic-information.component';

describe('StudentBasicInformationComponent', () => {
  let component: StudentBasicInformationComponent;
  let fixture: ComponentFixture<StudentBasicInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentBasicInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentBasicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
