import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInformationCentreComponent } from './student-information-centre.component';

describe('StudentInformationCentreComponent', () => {
  let component: StudentInformationCentreComponent;
  let fixture: ComponentFixture<StudentInformationCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentInformationCentreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInformationCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
