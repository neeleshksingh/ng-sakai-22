import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInformationCenterComponent } from './student-information-center.component';

describe('StudentInformationCenterComponent', () => {
  let component: StudentInformationCenterComponent;
  let fixture: ComponentFixture<StudentInformationCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentInformationCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInformationCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
