import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import saveAs from 'file-saver';
import { MessageService } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import { FeeReceiptDownloadRequest } from 'src/app/shared/models/students/fee-receipt-download-request';
import { DateFormatterService } from 'src/app/shared/services/date-formatter.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-response',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './payment-response.component.html',
  styleUrl: './payment-response.component.scss'
})
export class PaymentResponseComponent {
  isPaymentGet: boolean = true;
  products: any[] = [];
  isHiddenReceipt: boolean = true;
  isHiddenRetryPayment: boolean = true;
  isHiddenReceiptNumber: boolean = true;
  feeReceiptDownloadRequest: FeeReceiptDownloadRequest = {};
  paymentStatusPrint: string = "";
  registrationNumber: string = "";
  referenceNumber: string = "";
  paidAmount: number = 0;
  transactionDate: string = "";
  reciptNumber: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private paymentService: PaymentService,
    private dateFormatterService: DateFormatterService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var paymentResponseId = params.get('paymentResponseId');
      if (paymentResponseId) {
        this.paymentService.getOnlinePaymentReferenceByPaymentResponseId(paymentResponseId).subscribe(x => {
          if (x.referenceNumber != "") {
            this.isPaymentGet = false;
            this.paymentStatusPrint = x.paymentStatus || '';
            this.registrationNumber = x.registrationNumber || '';
            this.referenceNumber = x.referenceNumber || '';
            this.paidAmount = x.paidAmount || 0;
            this.transactionDate = x.transactionDate || '';
            this.reciptNumber = x.receiptNumber || '';
            if (x.paymentStatus && x.paymentStatus.toUpperCase() == "SUCCESS") {
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
    });
  }

  printReceipt() {
    this.feeReceiptDownloadRequest =
    {
      receiptNumber: this.reciptNumber
    };

    this.paymentService.downloadFeeReceipt(this.feeReceiptDownloadRequest).subscribe(data => {
      if (this.feeReceiptDownloadRequest.receiptNumber) {
        var filename = this.feeReceiptDownloadRequest.receiptNumber.replace('/', '_') + ".pdf";
        saveAs(data, filename);
      }
    });
  }

  retryPayment() {
    this.router.navigateByUrl('/Home/Student/Transaction/Payment');
  }

  getBackgroundColor() {
    let color = 'red';
    if (this.paymentStatusPrint == "Success") {
      color = 'green';
    }
    return color;
  }
}
