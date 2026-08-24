import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import saveAs from 'file-saver';
import { MessageService, SelectItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/app/idp/services/authentication-service.service';
import { SharedModule } from '@/shared.module';
import { FeeReceipt } from 'src/app/shared/models/finance-Pro/fee-receipt';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { FeeReceiptDownloadRequest } from 'src/app/shared/models/students/fee-receipt-download-request';
import { PaymentService } from 'src/app/students/services/payment.service';

@Component({
  selector: 'app-reciept',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reciept.component.html',
  styleUrl: './reciept.component.scss'
})
export class RecieptComponent implements OnInit {
  isDisabledFeeReceipt: boolean = false;
  isDisabledFeeReceiptNotFound: boolean = true;
  feeReceipts: FeeReceipt[] = [];
  feeReceipt!: FeeReceipt;
  feeReceiptDownloadRequest!: FeeReceiptDownloadRequest;
  paymentModeList: SelectItem[] = [];
  private currentUserSubject!: BehaviorSubject<LoginResponse>;
  selectedFeeReceipts: FeeReceipt = {}
  dataKey = 'id';
  isLoading: boolean = true;
  skeletonValue: number[] = Array(4).fill(1);

  cols = [
    { field: 'registrationNumber', header: 'RegistrationNumber', filterType: 'text' },
    { field: 'receiptNumber', header: 'ReceiptNumber', filterType: 'text' },
    { field: 'receiptDate', header: 'ReceiptDate', filterType: 'text' },
    { field: 'paidAmount', header: 'PaidAmount', filterType: 'text' },
    { field: 'referenceNumber', header: 'ReferenceNumber', filterType: 'text' },
    { field: 'paymentModeList[(feeReceipt.paymentMode)-1].label', header: 'PaymentMode', filterType: 'text' },
    { field: 'paymentDate', header: 'PaymentDate', filterType: 'text' },


  ];


  constructor(private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private authenticationService: AuthenticationService,
    private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.paymentModeList = [
      { label: 'BankDeposit', value: 1 },
      { label: 'CardSwap', value: 2 },
      { label: 'Cash', value: 3 },
      { label: 'Cheque', value: 4 },
      { label: 'DemandDraft', value: 5 },
      { label: 'IMPS', value: 6 },
      { label: 'NEFT/RTGS', value: 7 },
      { label: 'UPI', value: 8 },
      { label: 'Online', value: 9 },
      { label: 'Others', value: 10 },
    ];
    var data = localStorage.getItem('currentUser');
    if (data) {
      this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(data));
    }
    else {
      this.authenticationService.logout();
    }
    this.getPaymentReceipt();
  }
  getPaymentReceipt() {
    this.isDisabledFeeReceiptNotFound = true;
    this.feeReceipts = [];
    const userName = this.currentUserSubject.value.applicationUser.userName ?? '';
    this.paymentService.getFeeReceiptByStudentId(userName).subscribe(data => {
      if (data.length > 0) {
        this.feeReceipts = data.sort((a, b) => {
          const dateA = new Date(a.receiptDate || '').getTime();
          const dateB = new Date(b.receiptDate || '').getTime();
          return dateB - dateA;
        });
        this.isLoading = false;
      }
      else {
        this.isLoading = false;
        this.isDisabledFeeReceiptNotFound = false;
      }
    });

  }
  selectReceiptNumber(feeReceipt: FeeReceipt) {
    this.feeReceiptDownloadRequest =
    {
      receiptNumber: feeReceipt.receiptNumber
    }
    this.paymentService.downloadFeeReceipt(this.feeReceiptDownloadRequest).subscribe(data => {
      if (this.feeReceiptDownloadRequest.receiptNumber) {
        const filename = this.feeReceiptDownloadRequest.receiptNumber.replace('/', '_') + ".pdf";

        saveAs(data, filename);
      }
    });
  }

}
