import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import { FeeReceiptDownloadRequest } from 'src/app/shared/models/students/fee-receipt-download-request';
import { DateFormatterService } from 'src/app/shared/services/date-formatter.service';
import { StudentProgramProvisionalService } from '../../services/student-program-provisional.service';
import { FeeReceiptComponent } from '../fee-receipt/fee-receipt.component';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [SharedModule, FeeReceiptComponent],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent {
  isPaymentGet: boolean = true;
  products: any[] = [];
  isHiddenReceipt: boolean = true;
  isHiddenRetryPayment: boolean = true;
  isHiddenReceiptNumber: boolean = true;
  feeReceiptDownloadRequest: FeeReceiptDownloadRequest = {};
  paymentStatusPrint: string = "";
  registrationNumber: string = "";
  paymentId: string = "";
  paidAmount: number = 0;
  transactionDate: string = "";
  receiptNumber: string = "";
  provisionalNumber: string = "";
  studentEmail: string = "";
  studentPhonenumber: string = "";
  feeReceiptDialog: boolean = false;
  studentId: string = "";
  @Input() paymentResponseId: string = "";
  @Input() provisionalStudentId: string = "";
  @Input() referenceNumber: string = "";
  username: string = "";
  password: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private studentProgramProvisionalService: StudentProgramProvisionalService,
    private dateFormatterService: DateFormatterService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var paymentResponseId = params.get('paymentResponseId') || this.paymentResponseId;
      this.provisionalNumber = params.get('provisionalNumber') || '';
      this.studentEmail = params.get('email') || '';
      this.studentPhonenumber = params.get('phoneNumber') || '';
      // if (paymentResponseId != null) {
      //   if(!this.provisionalStudentId && !this.receiptNumber) {
      //     this.getOnlinePaymentReferenceByPaymentResponseId(paymentResponseId);
      //   } else {
      //     this.getFeeReceiptByProvisionalStudentIdAndReceiptNumber(this.provisionalStudentId, this.receiptNumber);
      //   }
      // }
      if (!this.provisionalStudentId && !this.referenceNumber) {
        if (paymentResponseId !== null && paymentResponseId !== '' && paymentResponseId !== undefined)
          this.getOnlinePaymentReferenceByPaymentResponseId(paymentResponseId);
      } else {
        if (this.referenceNumber !== null && this.referenceNumber !== '')
          this.getFeeReceiptByProvisionalStudentIdAndReferenceNumber(this.provisionalNumber, this.referenceNumber);
      }

    });
  }

  getOnlinePaymentReferenceByPaymentResponseId(paymentResponseId: string) {
    this.studentProgramProvisionalService.getOnlinePaymentReferenceByPaymentResponseId(paymentResponseId).then((x: any) => {
      if (x.referenceNumber != "") {
        this.isPaymentGet = false;
        this.paymentStatusPrint = x.paymentStatus.toUpperCase();
        this.registrationNumber = x.registrationNumber;
        this.studentId = x.studentId;
        this.referenceNumber = x.referenceNumber;
        this.password = x.password;
        this.paymentId = x.paymentId,
          this.paidAmount = x.paidAmount;
        this.transactionDate = x.transactionDate;
        this.receiptNumber = x.receiptNumber;
        if (x.paymentStatus.toUpperCase() == "SUCCESS") {
          this.isHiddenReceiptNumber = false;
          this.isHiddenReceipt = false;
          this.isHiddenRetryPayment = true;
        }
        else {
          this.isHiddenReceiptNumber = true;
          this.isHiddenReceipt = true;
          this.isHiddenRetryPayment = false;
        }
      }
      else {
        this.isPaymentGet = true;
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: "Invalid Access !!!", life: 3000 });
      }
    }, error => {
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: error, life: 3000 });
    });
  }

  getFeeReceiptByProvisionalStudentIdAndReferenceNumber(provisionalStudentId: string, referenceNumber: string) {
    if (referenceNumber !== null || referenceNumber === '') {
      this.studentProgramProvisionalService.getFeeReceiptByProvisionalStudentIdAndReferenceNumber(provisionalStudentId, referenceNumber).subscribe({
        next: (x: any) => {
          if (x.referenceNumber != "") {
            this.isPaymentGet = false;
            if (x.receiptNumber !== '') {
              this.paymentStatusPrint = 'SUCCESS';
            } else {
              this.paymentStatusPrint = 'FAILED';
            }
            this.registrationNumber = x.registrationNumber;
            this.studentId = x.studentId;
            this.referenceNumber = x.referenceNumber;
            this.password = x.password;
            this.paymentId = x.paymentId,
              this.paidAmount = x.paidAmount;
            this.transactionDate = x.receiptDate;
            this.receiptNumber = x.receiptNumber;
            if (this.paymentStatusPrint == "SUCCESS") {
              this.isHiddenReceiptNumber = false;
              this.isHiddenReceipt = false;
              this.isHiddenRetryPayment = true;
            }
            else {
              this.isHiddenReceiptNumber = true;
              this.isHiddenReceipt = true;
              this.isHiddenRetryPayment = false;
            }
          }
          else {

            this.isPaymentGet = true;
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: "Invalid Access !!!", life: 3000 });
          }
        }, error: error => {
          this.messageService.add({ severity: 'warn', summary: 'Error', detail: error, life: 3000 });
        }
      });
    }
  }

  printReceipt() {
    this.feeReceiptDialog = true;
  }

  retryPayment() {
    this.router.navigateByUrl('/student-onboarding/student-onboarding-overview/' + this.provisionalNumber + '/' + this.studentPhonenumber + '/' + this.studentEmail);
  }


  getStatusClass(): string {
    switch (this.paymentStatusPrint) {
      case 'SUCCESS': return 'status-success';
      case 'PENDING': return 'status-pending';
      case 'FAILED': return 'status-failed';
      default: return '';
    }
  }

  getStatusIcon(): string {
    switch (this.paymentStatusPrint) {
      case 'SUCCESS': return 'pi-check-circle';
      case 'PENDING': return 'pi-clock';
      case 'FAILED': return 'pi-times-circle';
      default: return 'pi-info-circle';
    }
  }

  getBackgroundColor(): string {
    switch (this.paymentStatusPrint) {
      case 'SUCCESS': return '#10b981';
      case 'PENDING': return '#f59e0b';
      case 'FAILED': return '#ef4444';
      default: return '#6c757d';
    }
  }
}
