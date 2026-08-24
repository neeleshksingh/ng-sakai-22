import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import saveAs from 'file-saver';
import { MessageService, SelectItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/app/idp/services/authentication-service.service';
import { SharedModule } from '@/shared.module';
import { PaymentChallan } from 'src/app/shared/models/finance-Pro/payment-challans';
import { StudentFeeMaster } from 'src/app/shared/models/finance-Pro/student-fee-master';
import { StudentFeeMasterRequest } from 'src/app/shared/models/finance-Pro/student-fee-master-request';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { PaymentChallanSearchRequest } from 'src/app/shared/models/students/payment-challan-search-request';
import { StudentExcessAmount } from 'src/app/shared/models/students/student-excess-amount';
import { DateFormatterService } from 'src/app/shared/services/date-formatter.service';
import { PaymentChallanService } from 'src/app/students/services/payment-challan.service';
import { StudentExcessAmountService } from 'src/app/students/services/student-excess-amount.service';
import { StudentFeeMasterService } from 'src/app/students/services/student-fee-master.service';
import { StudentProgramService } from 'src/app/students/services/student-program.service';

@Component({
  selector: 'app-challan',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './challan.component.html',
  styleUrl: './challan.component.scss'
})
export class ChallanComponent implements OnInit {
  challanFormGroup!: FormGroup;
  registrationNumberList: SelectItem[] = [];
  operationalVerticalList: SelectItem[] = [];
  studentPrograms: StudentProgram[] = [];
  studentProgramsFiltered: StudentProgram[] = [] = [];
  academicSessionProgramId: number = 0;
  studentFeeMastersRequests: StudentFeeMasterRequest[] = [];
  private currentUserSubject!: BehaviorSubject<LoginResponse>;
  studentFeeMasters: StudentFeeMaster[] = [];
  filteredStudentFeeMasters: StudentFeeMaster[] = [];
  selectedStudentFeeMaster: StudentFeeMaster[] = [];
  programId: number = 0;
  studentFeeMastersRequest: any = {}

  paymentChallanSearchRequest!: PaymentChallanSearchRequest;
  challanList: PaymentChallan[] = [];
  registrationNumbers: string = '';
  academicSessionIds: number[] = [];
  programIds: number[] = [];
  operationalVerticalIds: number[] = [];
  feeComponentIds: number[] = [];
  dataKey = 'id';
  isLoading: boolean = false;
  skeletonValue: number[] = Array(3).fill(1);

  totalAmount: number = 0;
  accessAmount: number = 0;
  adjustedAmount: number = 0;
  payableAmount: number = 0;
  isPaymentDetailsHidden: boolean = true;
  isChallanDetailsHidden: boolean = true;
  ovsLists: string = '';
  studentExcessAmount!: StudentExcessAmount;
  hiddenAccessAmount: string = "none";
  hiddenAdjustedAmount: string = "none";
  hiddenChallanButton: string = "flex";

  cols: any[] = [
    { field: 'studentId', header: 'StudentId', filterType: 'text' },
    { field: 'Semester', header: 'Semester', filterType: 'text' },
    { field: 'Fee Component', header: 'Fee Component', filterType: 'text' },
    { field: 'Fee Amount', header: 'Fee Amount', filterType: 'text' },
    { field: 'Paid', header: 'Paid', filterType: 'text' },
    { field: 'Due', header: 'Due', filterType: 'text' },
  ];
  cols2: any[] = [
    { field: 'Challan Number', header: 'Challan Number', filterType: 'text' },
    { field: 'Challan Date', header: 'Challan Date', filterType: 'text' },
    { field: 'GrossTotal Amount', header: 'GrossTotal Amount', filterType: 'text' },
    { field: 'Excess Amount', header: 'Excess Amount', filterType: 'text' },
    { field: 'NetTotal Amount', header: 'NetTotal Amount', filterType: 'text' },
    { field: '', header: '', filterType: 'text' },
  ];
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private studentProgramService: StudentProgramService,
    private authenticationService: AuthenticationService,
    private studentFeeMasterService: StudentFeeMasterService,
    private studentExcessAmountService: StudentExcessAmountService,
    private dateFormatterService: DateFormatterService,
    private paymentChallanService: PaymentChallanService
  ) { }

  ngOnInit(): void {
    var data = localStorage.getItem('currentUser');
    if (data) {
      this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(data));
    }
    else {
      this.authenticationService.logout();
    }
    this.initializeChallanFormGroup();
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
      this.challanFormGroup.value.programName = this.studentProgramsFiltered[0].programName;
      this.academicSessionProgramId = this.studentProgramsFiltered[0].academicSessionProgramId || 0;
      this.programId = this.studentProgramsFiltered[0].programId || 0;
      this.studentFeeMastersRequests = [];
      this.registrationNumbers = event.value;
      // this.registrationNumbers = null;
      this.academicSessionIds = [];
      this.programIds = [];
      this.registrationNumbers = event.value;
      if (this.studentProgramsFiltered[0].academicSessionId !== undefined) {
        this.academicSessionIds.push(this.studentProgramsFiltered[0].academicSessionId);
      }
      if (this.studentProgramsFiltered[0].programId !== undefined) {
        this.programIds.push(this.studentProgramsFiltered[0].programId);
      }
      this.studentFeeMastersRequest =
      {
        registrationNumber: event.value
      };
      this.studentFeeMastersRequests.push(this.studentFeeMastersRequest);
      this.studentFeeMasterService.getStudentFeeMasterList(this.studentFeeMastersRequests).subscribe({
        next: (x) => {
          this.challanFormGroup.patchValue({
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
      this.hiddenChallanButton = "none";
    }
    else {
      this.hiddenChallanButton = "flex";
    }
  }
  studentPaymentSearchClick(operationalVerticalId: SelectItem[]) {
    this.isPaymentDetailsHidden = false;
    this.isChallanDetailsHidden = false;
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

    this.studentExcessAmountService.getByRegistrationNumber(this.registrationNumbers).subscribe({
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
        this.isLoading = false;
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: error, life: 3000 });
      }
    });

    // this.isPaymentDetailsHidden = true;
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
              // , dueDate: this.dateFormatterService.ConvertLocalDateTimeString(new Date(list[t].dueDate))
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
      // this.isPaymentDetailsHidden = false;
      // studentFeeMasterFilteredList.forEach(y => y.isSelectedToPay = true);
      this.filteredStudentFeeMasters = studentFeeMasterFilteredList.filter(x => (x.dueAmount ?? 0) > 0).sort((a, b) => (a.operationalVerticalId ?? 0) - (b.operationalVerticalId ?? 0));
      this.selectedStudentFeeMaster = this.filteredStudentFeeMasters;
      this.filteredStudentFeeMasters.forEach(a => this.totalAmount += (a.dueAmount ?? 0));
      isAdjustmentAllowedAmountFilter = this.filteredStudentFeeMasters.filter(d => d.canStudentAdjust == true);
      isAdjustmentAllowedAmountFilter.forEach(f => adjustAmount += (f.dueAmount ?? 0));
      // this.isLoading=false;
      // this.isPaymentDetailsHidden = false;
    }

    this.payableAmount = this.totalAmount;


    this.bindPaymentChallanList();
  }
  initializeChallanFormGroup() {
    this.challanFormGroup = this.fb.group({
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
  requestChallan() {
    if (this.payableAmount <= 0) {
      return;
    }
    this.operationalVerticalIds = [];
    this.feeComponentIds = [];
    if (this.selectedStudentFeeMaster.length > 0) {
      this.selectedStudentFeeMaster.forEach(x => {
        this.operationalVerticalIds.push(x.operationalVerticalId ?? 0);
        this.feeComponentIds.push(x.feeComponentId ?? 0);
      });
    }

    this.paymentChallanSearchRequest = {};
    this.paymentChallanSearchRequest =
    {
      registrationNumber: this.registrationNumbers,
      academicSessionIds: this.academicSessionIds,
      programIds: this.programIds,
      operationalVerticalIds: this.operationalVerticalIds,
      feeComponentIds: this.feeComponentIds,
    }
    this.paymentChallanService.downloadPaymentChallanByPaymentChallanSearchRequest(this.paymentChallanSearchRequest).subscribe({
      next: (e) => {
        this.bindPaymentChallanList();
        if (this.challanList?.length > 0 && this.challanList[0]?.challanNumber) {
          var filename = this.registrationNumbers + this.challanList[0].challanNumber.replace('/', '_') + ".pdf";
          saveAs(e, filename);
        }
      }, error: (error) => {
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: error, life: 3000 });
      }
    });

  }
  bindPaymentChallanList() {
    this.paymentChallanService.getPaymentChallanByRegistrationNumber(this.registrationNumbers).subscribe({
      next: (e) => {

        this.challanList = e.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
        this.isLoading = false
      }, error: (error) => {
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: error, life: 3000 });
      }
    });
  }
  downloadChallan(challan: PaymentChallan) {
    const search = '/';
    const replaceWith = '_';


    if (challan?.challanNumber) {
      const challanNumber = challan.challanNumber.split(search).join(replaceWith);

      this.paymentChallanService
        .downloadPaymentChallanByRegistrationNumber(this.registrationNumbers, challanNumber)
        .subscribe(data => {
          const filename = this.registrationNumbers + challanNumber + ".pdf";
          saveAs(data, filename);
        });
    } else {
      console.error('Challan or challanNumber is undefined');
      this.messageService.add({
        severity: 'warn',
        summary: 'Error',
        detail: 'Invalid challan data',
        life: 3000,
      });
    }

  }
}
