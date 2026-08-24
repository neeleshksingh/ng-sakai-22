import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/app/idp/services/authentication-service.service';
import { SharedModule } from '@/shared.module';
import { FeeReceipt } from 'src/app/shared/models/finance-Pro/fee-receipt';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { FeeReceiptDownloadRequest } from 'src/app/shared/models/students/fee-receipt-download-request';
import { PaymentService } from 'src/app/students/services/payment.service';

@Component({
  selector: 'app-receipt-v2',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './receipt-v2.component.html',
  styleUrl: './receipt-v2.component.scss'
})
export class ReceiptV2Component {
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

  displayReceiptDialog: boolean = false;
  receiptHtml: SafeHtml = '';
  currentReceiptNumber: string = '';


  constructor(private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private authenticationService: AuthenticationService,
    private paymentService: PaymentService,
    private sanitizer: DomSanitizer) { }

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
        this.feeReceipts = data;
        this.isLoading = false;
      }
      else {
        this.isLoading = false;
        this.isDisabledFeeReceiptNotFound = false;
      }
    });

  }
  selectReceiptNumber(feeReceipt: FeeReceipt) {
    this.feeReceiptDownloadRequest = {
      receiptNumber: feeReceipt.receiptNumber
    };

    this.currentReceiptNumber = feeReceipt.receiptNumber ?? '';

    this.paymentService.downloadHtmlFeeReceipt(this.feeReceiptDownloadRequest).subscribe(
      (response: any) => {
        if (response && response.htmlContent && response.htmlContent.length > 0) {
          this.receiptHtml = this.sanitizer.bypassSecurityTrustHtml(response.htmlContent[0]);
          this.displayReceiptDialog = true;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Receipt content not available'
          });
        }
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load receipt'
        });
      }
    );
  }

  printReceipt() {
    const printContent = document.getElementById('receipt-content')?.innerHTML;
    const windowPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

    if (windowPrint && printContent) {
      windowPrint.document.write(`
        <html>
          <head>
            <title>Fee Receipt</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                color: #333;
                margin: 10px;
                padding: 0;
              }
              #receipt {
                width: 100%;
                border-collapse: collapse;
                border: 1px solid #e0e0e0;
                background-color: #fff;
              }
              #receipt td {
                padding: 10px;
                border: 1px solid #e0e0e0;
                vertical-align: top;
              }
              .headersection {
                text-align: center;
                background-color: #f5f5f5;
                padding: 12px;
                border-bottom: 2px solid #666;
              }
              .header {
                font-size: 24px;
                font-weight: bold;
                color: #333;
              }
              .subheader {
                font-size: 14px;
                color: #888;
              }
              .logo {
                max-width: 120px;
              }
              #receipt1 {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
              }
              #receipt1 th,
              #receipt1 td {
                border: 1px solid #e0e0e0;
                padding: 8px;
                text-align: center;
              }
              #receipt1 th {
                background-color: #666;
                color: #fff;
                font-weight: bold;
                font-size: 14px;
              }
              #receipt1 td {
                font-size: 14px;
                color: #333;
              }
              #receipt1 tr:nth-child(even) {
                background-color: #f9f9f9;
              }
              #receipt1 tr:last-child td {
                font-weight: bold;
                background-color: #f0f0f0;
                color: #333;
                font-size: 14px;
              }
              #receipt1 tr td[colspan="4"] {
                text-align: left;
                font-size: 12px;
                color: #888;
              }
              @media print {
                body {
                  margin: 0;
                  padding: 10px;
                }
                #receipt, #receipt1 {
                  border: 1px solid #e0e0e0;
                }
                #receipt td, #receipt1 th, #receipt1 td {
                  border: 1px solid #e0e0e0;
                }
              }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            ${printContent}
          </body>
        </html>
      `);
      windowPrint.document.close();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Unable to open print window. Please check your browser settings.'
      });
    }
  }
}
