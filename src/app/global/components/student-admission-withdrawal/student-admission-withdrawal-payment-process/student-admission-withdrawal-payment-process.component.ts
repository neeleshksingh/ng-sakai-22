import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { WithdrawalService } from 'src/app/global/services/student-admission-withdrawal/withdrawal.service';
import { SharedModule } from '@/shared.module';
import { Withdraw } from 'src/app/shared/models/student-onboarding/withdraw';

@Component({
  selector: 'app-student-admission-withdrawal-payment-process',
  standalone: true,
  imports: [SharedModule],
  providers: [MessageService],
  templateUrl: './student-admission-withdrawal-payment-process.component.html',
  styleUrl: './student-admission-withdrawal-payment-process.component.scss'
})
export class StudentAdmissionWithdrawalPaymentProcessComponent implements OnInit, OnChanges {

  componentName: string = 'Student Admission Withdrawal Payment Process';
  withdrawalPaymentProcessFormGroup!: FormGroup;
  approvalStatusList: any;
  isHoldReasonDisabled: boolean = true;
  withdrawalPaymentProcessConfirmationBox: boolean = false;
  formData = new FormData();
  @Input() studentOnBoardingWithdrawalDetialsTo: Withdraw | null = null;
  @Input() studentProgramProvisional: any;

  constructor(private fb: FormBuilder,
    private withdrawalService: WithdrawalService,
    private messageService: MessageService,
  ) {
    this.initializeWithdrawalPaymentProcessFormGroup();
  }

  ngOnInit(): void {
    this.approvalStatusList = ['REFUND ISSUED', 'REQUEST ON HOLD'];
  }
  ngOnChanges(): void {
    if (this.studentOnBoardingWithdrawalDetialsTo?.id && this.studentProgramProvisional?.provisionalNumber) {
      this.withdrawalPaymentProcessFormGroup.patchValue({
        id: this.studentOnBoardingWithdrawalDetialsTo.id,
        refundDescription: this.studentOnBoardingWithdrawalDetialsTo.refundDescription,
        totalRefund: this.studentOnBoardingWithdrawalDetialsTo.totalRefund,
        approvalStatus: this.studentOnBoardingWithdrawalDetialsTo.withdrawalStatus,
        holdReason: this.studentOnBoardingWithdrawalDetialsTo.holdReason,
        provisionalNumber: this.studentProgramProvisional.provisionalNumber
      });
    }
  }

  initializeWithdrawalPaymentProcessFormGroup(): void {
    this.withdrawalPaymentProcessFormGroup = this.fb.group({
      id: [0],
      refundDescription: ['', Validators.required],
      totalRefund: [0],
      approvalStatus: ['', Validators.required],
      holdReason: [''],
      provisionalNumber: ['']
    });
  }
  approvalStatusChange(event: any) {
    if (event.value === 'REQUEST ON HOLD') {
      this.isHoldReasonDisabled = false;
    }
    else {
      this.isHoldReasonDisabled = true;
      this.withdrawalPaymentProcessFormGroup.value.holdReason = null;
    }
  }
  onSubmit() {
    console.log("withdrawalPaymentProcessFormGroup", this.withdrawalPaymentProcessFormGroup.value);
    this.withdrawalPaymentProcessConfirmationBox = true;
  }
  withdrawalPaymentProcessConfirmation() {

    this.studentOnBoardingWithdrawalDetialsTo!.refundDescription = this.withdrawalPaymentProcessFormGroup.value.refundDescription || '';
    this.studentOnBoardingWithdrawalDetialsTo!.totalRefund = this.withdrawalPaymentProcessFormGroup.value.totalRefund || 0;
    this.studentOnBoardingWithdrawalDetialsTo!.holdReason = this.withdrawalPaymentProcessFormGroup.value.holdReason || '';
    this.studentOnBoardingWithdrawalDetialsTo!.withdrawalStatus = this.withdrawalPaymentProcessFormGroup.value.approvalStatus || '';
    this.studentOnBoardingWithdrawalDetialsTo!.provisionalNumber = this.withdrawalPaymentProcessFormGroup.value.provisionalNumber || '';

    this.withdrawalPaymentProcessConfirmationBox = false;
    if (this.studentOnBoardingWithdrawalDetialsTo) {
      this.withdrawalService.updateStudentOnBoardingWithdrawalById(this.studentOnBoardingWithdrawalDetialsTo).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Refund process has been submitted successfully.' });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        }
      })
    }
  }
}
