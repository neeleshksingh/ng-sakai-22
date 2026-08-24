import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdmissionWithdrawalViewComponent } from './student-admission-withdrawal-view.component';

describe('StudentAdmissionWithdrawalViewComponent', () => {
  let component: StudentAdmissionWithdrawalViewComponent;
  let fixture: ComponentFixture<StudentAdmissionWithdrawalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAdmissionWithdrawalViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAdmissionWithdrawalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
