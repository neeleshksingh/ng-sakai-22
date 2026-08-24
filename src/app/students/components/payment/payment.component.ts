import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/app/idp/services/authentication-service.service';
import { SharedModule } from '@/shared.module';
import { StudentFeeMaster } from 'src/app/shared/models/finance-Pro/student-fee-master';
import { StudentFeeMasterRequest } from 'src/app/shared/models/finance-Pro/student-fee-master-request';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { OnlinePaymentReference, OnlinePaymentReferenceDetails, OnlinePaymentReferenceRequest, OnlinePaymentReferenceResponse } from 'src/app/shared/models/students/online-payment-reference';
import { RazorPayCheckOutRequest } from 'src/app/shared/models/students/razor-pay-check-out-request';
import { StudentExcessAmount } from 'src/app/shared/models/students/student-excess-amount';
import { DateFormatterService } from 'src/app/shared/services/date-formatter.service';
import { PaymentService } from 'src/app/students/services/payment.service';
import { StudentExcessAmountService } from 'src/app/students/services/student-excess-amount.service';
import { StudentFeeMasterService } from 'src/app/students/services/student-fee-master.service';
import { StudentProgramService } from 'src/app/students/services/student-program.service';
import { WindowRefService } from 'src/app/students/services/window-ref.service';
import partnerBasicInfo from '../../../../assets/jsonFiles/partnerBasicInfo.json';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  paymentFormGroup!: FormGroup;
  registrationNumberList: SelectItem[] = [];
  operationalVerticalList: SelectItem[] = [];
  studentPrograms: StudentProgram[] = [];
  studentProgramsFiltered: StudentProgram[] = [];
  academicSessionProgramId: number = 0;
  studentFeeMastersRequests: StudentFeeMasterRequest[] = [];
  studentFeeMastersRequest: any = {}
  currentUserSubject?: BehaviorSubject<LoginResponse>;
  studentFeeMasters: StudentFeeMaster[] = [];
  filteredStudentFeeMasters: StudentFeeMaster[] = [];
  selectedStudentFeeMaster: StudentFeeMaster[] = [];
  programId: number = 0;
  onlinePaymentReference!: OnlinePaymentReference;
  onlinePaymentReferenceDetail!: OnlinePaymentReferenceDetails;
  onlinePaymentReferenceDetails: OnlinePaymentReferenceDetails[] = [];
  onlinePaymentReferenceRequest!: OnlinePaymentReferenceRequest;
  onlinePaymentReferenceRequestFailure!: OnlinePaymentReferenceRequest;
  onlinePaymentReferenceRequestSucess!: OnlinePaymentReferenceRequest;
  onlinePaymentReferenceResponse!: OnlinePaymentReferenceResponse;
  razorPayCheckOutRequest: RazorPayCheckOutRequest;
  programIds: number[] = [];
  operationalVerticalIds: number[] = [];
  registrationNumbers: string[] = [];
  totalAmount: number = 0;
  accessAmount: number = 0;
  adjustedAmount: number = 0;
  payableAmount: number = 0;
  isPaymentDetailsHidden: boolean = true;
  list: any[] = [];

  dataKey = 'id';
  isLoading: boolean = false;
  skeletonValue: number[] = Array(4).fill(1);



  cols: any[] = [
    { field: 'studentId', header: 'StudentId', filterType: 'text' },
    { field: 'Semester', header: 'Semester', filterType: 'text' },
    { field: 'Fee Component', header: 'Fee Component', filterType: 'text' },
    { field: 'Fee Amount', header: 'Fee Amount', filterType: 'text' },
    { field: 'Paid', header: 'Paid', filterType: 'text' },
    { field: 'Due', header: 'Due', filterType: 'text' },
  ];


  ovsLists: string = '';
  studentExcessAmount!: StudentExcessAmount;
  hiddenAccessAmount: string = "none";
  hiddenAdjustedAmount: string = "none";
  hiddenContinueButton: string = "flex";
  hiddenPayNow: string = "none";
  partnerCode: string = '';

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private studentProgramService: StudentProgramService,
    private authenticationService: AuthenticationService,
    private studentFeeMasterService: StudentFeeMasterService,
    private paymentService: PaymentService,
    private ngZone: NgZone,
    private winRef: WindowRefService,
    private studentExcessAmountService: StudentExcessAmountService,
    private dateFormatterService: DateFormatterService
  ) {

    this.razorPayCheckOutRequest = {};
    let url = window.location.href;
    const rem = partnerBasicInfo.partners;

    for (let ee in rem) {
      if (rem[ee].shortName !== "") {
        const ros = url.includes(rem[ee].shortName);
        if (ros) {
          const res = ee;
          this.partnerCode = rem[ee].partnerCode;
          break;
        }
      }

    }
  }

  ngOnInit(): void {
    var data = localStorage.getItem('currentUser');
    if (data) {
      this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(data));
    }
    else {
      this.authenticationService.logout();
    }

    this.initializePaymentFormGroup();
    this.studentProgramService.getStudentProgramList().subscribe({
      next: (data) => {
        this.studentPrograms = data;
        this.registrationNumberList = [];

        const lists: { label: string; value: string }[] = [];

        for (let i = 0; i < this.studentPrograms.length; i++) {
          const registrationNumber = this.studentPrograms[i].registrationNumber || "";
          lists.push({
            label: registrationNumber,
            value: registrationNumber,
          });
        }

        this.registrationNumberList = lists.reduce((accumulator, current) => {
          if (
            !accumulator.some(
              (x) => x.label === current.label && x.value === current.value
            )
          ) {
            accumulator.push(current);
          }
          return accumulator;
        }, [] as { label: string; value: string }[]);
      },
    });


  }
  onRegistrationNumberChanged(event: any) {
    this.studentProgramsFiltered = this.studentPrograms.filter(x => x.registrationNumber == event.value).sort((a, b) => (a.operationalVerticalId ?? 0) - (b.operationalVerticalId ?? 0));
    if (this.studentProgramsFiltered) {
      this.paymentFormGroup.value.programName = this.studentProgramsFiltered[0].programName;
      this.academicSessionProgramId = this.studentProgramsFiltered[0].academicSessionProgramId || 0;
      this.programId = this.studentProgramsFiltered[0].programId || 0;
      this.studentFeeMastersRequests = [];
      this.studentFeeMastersRequest =
      {
        registrationNumber: event.value
      };
      this.studentFeeMastersRequests.push(this.studentFeeMastersRequest);
      this.studentFeeMasterService.getStudentFeeMasterList(this.studentFeeMastersRequests).subscribe({
        next: (x) => {
          this.paymentFormGroup.patchValue({
            programName: x[0].programName
          })
          this.studentFeeMasters = x
            .filter((z) => (z.dueAmount ?? 0) > 0)
            .sort(
              (a, b) => (a.operationalVerticalId ?? 0) - (b.operationalVerticalId ?? 0)
            );
          if (this.studentFeeMasters.length > 0) {
            this.operationalVerticalList = [];
            let lists: { label: string; value: number }[] = [];

            for (let i = 0; i < this.studentFeeMasters.length; i++) {
              lists.push({
                label: this.studentFeeMasters[i].operationalVerticalName ?? "",
                value: this.studentFeeMasters[i].operationalVerticalId ?? 0,
              });
            }
            this.operationalVerticalList = lists.reduce((accumulator, current) => {
              if (
                !accumulator.some(
                  (x) => x.label === current.label && x.value === current.value
                )
              ) {
                accumulator.push(current);
              }
              return accumulator;
            }, [] as { label: string; value: number }[]);
          }
        },
        error: (error) => {
          this.messageService.add({ severity: 'warn', summary: 'Error', detail: error, life: 3000 });
        }

      });
    }
  }

  selectSingleRow(isChecked: any, studentFeeMaster: StudentFeeMaster) {
    var isAdjustmentAllowedAmountFilter = [];
    this.totalAmount = 0;
    var adjustAmount = 0;
    var selectedHigherOvs = this.selectedStudentFeeMaster.filter(x => (x.operationalVerticalId ?? 0) > (studentFeeMaster.operationalVerticalId ?? 0));
    if (selectedHigherOvs.length > 0) {
      this.selectedStudentFeeMaster = this.selectedStudentFeeMaster.filter(j => !selectedHigherOvs.includes(j));

    }
    var selectedHigherOvs = this.selectedStudentFeeMaster.filter(x => (x.operationalVerticalId ?? 0) < (studentFeeMaster.operationalVerticalId ?? 0));
    var notSelectedFeeOvs = this.studentFeeMasters.filter(y => (y.operationalVerticalId ?? 0) < (studentFeeMaster.operationalVerticalId ?? 0))
    if (selectedHigherOvs.length !== notSelectedFeeOvs.length) {
      this.selectedStudentFeeMaster = this.selectedStudentFeeMaster.filter(u => (u.operationalVerticalId ?? 0) < (studentFeeMaster.operationalVerticalId ?? 0));
    }
    this.selectedStudentFeeMaster.forEach(j => {
      this.totalAmount += j.dueAmount || 0;
    });
    isAdjustmentAllowedAmountFilter = this.selectedStudentFeeMaster.filter(d => d.canStudentAdjust == true);
    isAdjustmentAllowedAmountFilter.forEach(f => adjustAmount += (f.dueAmount ?? 0));
    if (this.accessAmount > 0) {
      this.hiddenAccessAmount = "flex";
      this.hiddenAdjustedAmount = "flex";
      if (this.accessAmount < adjustAmount) {
        this.adjustedAmount = this.accessAmount;
      }
      else {
        this.adjustedAmount = adjustAmount;
      }
    }
    this.payableAmount = this.totalAmount - this.adjustedAmount;
    if (this.payableAmount <= 0) {
      this.hiddenContinueButton = "none";
    }
    else {
      this.hiddenContinueButton = "flex";
    }
  }

  createOrder() {

    if (this.payableAmount <= 0) {
      return;
    }

    var totalExcessBalance = this.accessAmount;

    var onlinePaymentReference = {
      paymentGateway: 'RazorPay',
      feeAmount: this.totalAmount,
      adjustedAmount: this.adjustedAmount,
      paidAmount: this.payableAmount,
      paymentStatus: "Initiate",
      registrationNumber: this.paymentFormGroup.value.registrationNumber,
      status: "PUBLISHED",
      requestDate: this.dateFormatterService.ConvertLocalDateTimeString(new Date())
    };

    var onlinePaymentReferenceDetails: { feeAmount: number | undefined; paidAmount: number | undefined; lastDueAmount: number | undefined; adjustedAmount: number; feeComponentId: number | undefined; operationalVerticalId: number | undefined; programId: number | undefined; status: string | undefined; studentFeeMasterId: number | undefined; }[] = [];

    this.selectedStudentFeeMaster.forEach(x => {
      var isStudentCanAdjustAmount = 0;
      var paidAmount = x.dueAmount;

      //check once data
      if (totalExcessBalance > 0) {
        if (x.canStudentAdjust == true) {
          if (totalExcessBalance < (x.dueAmount ?? 0)) {
            isStudentCanAdjustAmount = totalExcessBalance;
            paidAmount = (x.dueAmount ?? 0) - this.accessAmount;
            totalExcessBalance = totalExcessBalance - isStudentCanAdjustAmount;
          }
          else {
            isStudentCanAdjustAmount = (x.dueAmount ?? 0);
            totalExcessBalance = totalExcessBalance - (x.dueAmount ?? 0);
            paidAmount = 0;
          }
        }
      }

      var onlinePaymentReferenceDetail = {
        feeAmount: x.feeAmount,
        paidAmount: paidAmount,
        lastDueAmount: x.dueAmount,
        adjustedAmount: isStudentCanAdjustAmount,
        feeComponentId: x.feeComponentId,
        operationalVerticalId: x.operationalVerticalId,
        programId: x.programId,
        status: x.status,
        studentFeeMasterId: x.id
      }

      onlinePaymentReferenceDetails.push(onlinePaymentReferenceDetail);
    });

    var onlinePaymentReferenceRequest = {
      onlinePaymentReference: onlinePaymentReference,
      onlinePaymentReferenceDetails: onlinePaymentReferenceDetails
    };

    this.paymentService.saveOnlinePaymentRequest(onlinePaymentReferenceRequest).subscribe({
      next: (x) => {
        const activePartner = partnerBasicInfo.partners.find(partner => partner.partnerCode === this.partnerCode);

        if (activePartner && x.paymentOrderResponse && x.onlinePaymentReference && this.currentUserSubject) {
          this.razorPayCheckOutRequest = {
            keyId: activePartner.razorPay.apiKey,

            callbackUrl: activePartner.razorPay.callbackUrl + "?order_id=" + x.paymentOrderResponse.id + "&partnerCode=" + this.partnerCode,
            description: x.onlinePaymentReference.registrationNumber,
            email: this.currentUserSubject.value.applicationUser.email,
            orderAmount: x.paymentOrderResponse.amount,
            phoneNumber: this.currentUserSubject.value.applicationUser.phoneNumber,
            razorpayOrderId: x.paymentOrderResponse.id,
            studentName: this.currentUserSubject.value.applicationUser.firstName + " " + this.currentUserSubject.value.applicationUser.lastName,
            transactionId: x.paymentOrderResponse.receipt,
          };
        }

        this.hiddenContinueButton = "none";
        this.hiddenPayNow = "flex";
      }, error: (error) => {
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: error, life: 3000 });
      }
    });
  }

  studentPaymentSearchClick(operationalVerticalId: SelectItem[]) {
    this.isPaymentDetailsHidden = false;
    this.isLoading = true;
    this.hiddenAccessAmount = "none";
    this.hiddenAdjustedAmount = "none";
    this.filteredStudentFeeMasters = [];
    this.studentExcessAmount = {};
    this.totalAmount = 0;
    this.accessAmount = 0;
    this.payableAmount = 0;
    this.adjustedAmount = 0;
    var adjustAmount = 0;

    this.studentExcessAmountService.getByRegistrationNumber(this.paymentFormGroup.value.registrationNumber).subscribe({
      next: (e) => {
        this.studentExcessAmount = e;
        if (this.studentExcessAmount != null) {
          this.accessAmount = this.studentExcessAmount.balanceExcessAmount || 0;

          if (this.accessAmount > 0) {
            this.hiddenAccessAmount = "flex";
            this.hiddenAdjustedAmount = "flex";

            if (this.accessAmount < adjustAmount) {
              this.adjustedAmount = this.accessAmount;
            }
            else {
              this.adjustedAmount = adjustAmount;
            }
          }
          this.payableAmount = this.totalAmount - this.adjustedAmount;

        }
      }, error: (error) => {
        this.isLoading = false
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: error, life: 3000 });
      }
    });
    var crosssSelectedOvs = this.operationalVerticalList.filter(t => !operationalVerticalId.includes(t));

    if (crosssSelectedOvs.length > 0) {
      for (var f = 0; f < crosssSelectedOvs.length; f++) {
        for (var t = 0; t < operationalVerticalId.length; t++) {
          if (crosssSelectedOvs[f].value < operationalVerticalId[t].value) {
            this.isLoading = false;
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: "Select previous semester to pay.", life: 3000 });
            return;
          }
        }
      }
    }

    var studentFeeMasterFilteredList = [];

    if (operationalVerticalId.length > 0) {
      for (var k = 0; k < operationalVerticalId.length; k++) {
        var list = [];
        list = this.studentFeeMasters.filter(g => g.operationalVerticalId === operationalVerticalId[k].value);

        if (list.length > 0) {
          for (var t = 0; t < list.length; t++) {
            var data = {
              academicSessionId: list[t].academicSessionId
              , academicSessionName: list[t].academicSessionName
              , canStudentAdjust: list[t].canStudentAdjust
              , componentFee: list[t].componentFee
              , concessionAmount: list[t].concessionAmount
              , createdBy: list[t].createdBy
              , createdDate: list[t].createdDate
              , dueAmount: list[t].dueAmount
              // , dueDate: this.dateFormatterService.ConvertLocalDateTimeString(list[t].dueDate)
              , feeAmount: list[t].feeAmount
              , feeComponentId: list[t].feeComponentId
              , feeComponentName: list[t].feeComponentName
              , id: list[t].id
              , isAdjustmentAllowed: list[t].isAdjustmentAllowed
              , modifiedBy: list[t].modifiedBy
              , modifiedDate: list[t].modifiedDate
              , operationalVerticalId: list[t].operationalVerticalId
              , operationalVerticalName: list[t].operationalVerticalName
              , paidAmount: list[t].paidAmount
              , programId: list[t].programId
              , programName: list[t].programName
              , registrationNumber: list[t].registrationNumber
              , status: list[t].status
            }

            studentFeeMasterFilteredList.push(data);
          }
        }
      }
    }

    var isAdjustmentAllowedAmountFilter = [];


    if (studentFeeMasterFilteredList.length > 0) {
      // studentFeeMasterFilteredList.forEach(y => y.isSelectedToPay = true);
      this.filteredStudentFeeMasters = studentFeeMasterFilteredList.filter(x => (x.dueAmount ?? 0) > 0).sort((a, b) => (a.operationalVerticalId ?? 0) - (b.operationalVerticalId ?? 0));
      this.selectedStudentFeeMaster = this.filteredStudentFeeMasters;
      this.filteredStudentFeeMasters.forEach(a => this.totalAmount += (a.dueAmount ?? 0));
      isAdjustmentAllowedAmountFilter = this.filteredStudentFeeMasters.filter(d => d.canStudentAdjust == true);
      isAdjustmentAllowedAmountFilter.forEach(f => adjustAmount += (f.dueAmount ?? 0));
      // this.isLoading=false;
    }

    this.payableAmount = this.totalAmount;
    this.isLoading = false;
  }

  initializePaymentFormGroup() {
    this.paymentFormGroup = this.fb.group({
      id: 0,
      registrationNumber: ['', Validators.required],
      programName: ['', Validators.required],
      operationalVerticalId: ['', Validators.required],
      createdBy: [''],
      createdByName: [''],
      createdDate: [''],
      modifiedBy: [''],
      modifiedByName: [''],
      modifiedDate: [''],
    });
  }

}
