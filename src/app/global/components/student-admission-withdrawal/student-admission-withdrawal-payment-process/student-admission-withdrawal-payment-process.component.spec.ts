import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdmissionWithdrawalPaymentProcessComponent } from './student-admission-withdrawal-payment-process.component';

describe('StudentAdmissionWithdrawalPaymentProcessComponent', () => {
  let component: StudentAdmissionWithdrawalPaymentProcessComponent;
  let fixture: ComponentFixture<StudentAdmissionWithdrawalPaymentProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAdmissionWithdrawalPaymentProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAdmissionWithdrawalPaymentProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
