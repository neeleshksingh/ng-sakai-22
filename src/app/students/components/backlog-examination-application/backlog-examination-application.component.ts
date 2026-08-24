import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { SharedModule } from '@/shared.module';
import { ExaminationExpando, ExaminationTypeExpando, OperationalVerticalExpando, ProgramExpando } from 'src/app/shared/models/commons/expandos';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { Examination, StudentExamination } from 'src/app/shared/models/knowledge-stand/examination';
import { DateFormatterService } from 'src/app/shared/services/date-formatter.service';
import { ExaminationResultService } from '../../services/examination-result.service';
import { ExaminationService } from '../../services/examination.service';

import { Router } from '@angular/router';
import { BacklogExaminationStudentDetails } from 'src/app/shared/models/students/backlog-examination';
import { ExaminationBacklogApplicationService } from '../../services/examination-backlog-application.service';

import { PartnerAppSettingService } from 'src/app/global/services/developers/partner-app-settings.service';
import { StudentExaminationResponse } from 'src/app/shared/models/students/student-examination-response';

@Component({
  selector: 'app-backlog-examination-application',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './backlog-examination-application.component.html',
  styleUrl: './backlog-examination-application.component.scss'
})
export class BacklogExaminationApplicationComponent {
  componentName: string = "Backlog/Supplementary Examination Application"
  studentBacklogExaminationDetails: BacklogExaminationStudentDetails = {};
  studentExamination: StudentExamination[] = [];
  programExpando: ProgramExpando[] = [];
  operationalVerticalExpando: OperationalVerticalExpando[] = [];
  examinationTypeExpando: ExaminationTypeExpando[] = [];
  examinationExpando: ExaminationExpando[] = [];
  studentBacklogExaminationApplicationSubjectPaperCodeResponseList: any[] = [];
  studentExaminationResponse?: StudentExaminationResponse;
  multiSelectedProgram: any[] = [];

  backlogExaminationDataFormGroup!: FormGroup;

  programList: SelectItem[] = [];
  operationalVerticalList: SelectItem[] = [];
  activeExaminationList: SelectItem[] = [];
  examinationList: Examination[] = [];
  examinationTypeList: SelectItem[] = [];
  academicSession: string = "";
  studentId: string = "";
  regNumber: SelectItem[] = [];
  fullExaminationName: string = "";
  programName: string = "";
  operationalVerticalName: string = "";
  examinationTypeSelected: number = 0;
  searchResult: boolean = false;
  searchedData: any;
  selectedProgramForBacklogApplication: any[] = [];
  visibleConfirmationBox: boolean = false;
  paymentModalBox: boolean = false;
  disableSaveBtn: boolean = false;
  noteA: boolean = false;
  noteB: boolean = false;
  applicationStatus: string = "";
  registartionCloseMsg: boolean = false;
  rowData: any;
  examPaperSelectLimitMessage: string = '';
  examPaperSelectLimit: number = 0;
  categoryId: number = 0;
  private readonly backlogExamFeePerPaper = 500;
  private currentUserSubject!: BehaviorSubject<LoginResponse>;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private resultService: ExaminationResultService,
    private examinationService: ExaminationService,
    private backlogExaminationService: ExaminationBacklogApplicationService,
    private partnerAppSettingService: PartnerAppSettingService,
    private dateFormatterService: DateFormatterService,
    private router: Router) { }


  ngOnInit(): void {
    this.initializeAcademicResultFormGroup();
    this.studentBacklogExaminationApplicationSubjectPaperCodeResponseList = [];
    var data = localStorage.getItem('currentUser');
    if (data) {
      const parsedData = JSON.parse(data);
      this.currentUserSubject = new BehaviorSubject<LoginResponse>(parsedData);
      this.studentId = this.currentUserSubject.value.applicationUser.userName ?? '';
    }
    this.getStudentExamination();
    this.selectedProgramForBacklogApplication = []
  }

  private getPaymentStatus(): string {
    return this.studentBacklogExaminationDetails?.paymentStatus?.toUpperCase() ?? '';
  }

  private isPaymentCompleted(): boolean {
    return ['PAID', 'SUCCESS'].includes(this.getPaymentStatus());
  }

  private isPaymentPartial(): boolean {
    return ['PARTIAL', 'PARTIALLY PAID'].includes(this.getPaymentStatus());
  }

  private getSelectedPaperCount(): number {
    return this.studentBacklogExaminationApplicationSubjectPaperCodeResponseList
      .filter(paper => paper.isSelected)
      .length;
  }

  private getPaidPaperCount(): number {
    const paidAmount = Number(this.studentBacklogExaminationDetails?.paidAmount ?? 0);
    if (paidAmount <= 0) {
      return 0;
    }

    return Math.floor(paidAmount / this.backlogExamFeePerPaper);
  }

  private getMinimumRequiredSelectedPaperCount(): number {
    if (!this.isPaymentPartial()) {
      return 0;
    }

    return this.getPaidPaperCount();
  }

  private getCalculatedDueAmount(): number {
    const totalAmount = this.backlogExamFeePerPaper * this.getSelectedPaperCount();
    const paidAmount = Number(this.studentBacklogExaminationDetails?.paidAmount ?? 0);

    return Math.max(totalAmount - paidAmount, 0);
  }

  private updatePaperSelectionLocks(showMinimumReachedMessage: boolean = false): void {
    const minimumRequiredSelectedPaperCount = this.getMinimumRequiredSelectedPaperCount();
    const selectedPaperCount = this.getSelectedPaperCount();
    const lockPaidSelection = minimumRequiredSelectedPaperCount > 0 && selectedPaperCount <= minimumRequiredSelectedPaperCount;

    this.studentBacklogExaminationApplicationSubjectPaperCodeResponseList =
      this.studentBacklogExaminationApplicationSubjectPaperCodeResponseList.map((paper: any) => {
        const isPublishedSelected = paper.status === 'PUBLISHED' && paper.isSelected;

        return {
          ...paper,
          isDisableSubjectCheckBox: (this.isPaymentCompleted() && isPublishedSelected) || (lockPaidSelection && paper.isSelected)
        };
      });

    if (showMinimumReachedMessage && lockPaidSelection) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: `You have already paid for ${minimumRequiredSelectedPaperCount} paper(s). Keep at least ${minimumRequiredSelectedPaperCount} paper(s) selected.`,
        life: 3000
      });
    }
  }

  private syncSelectedPapers() {
    this.selectedProgramForBacklogApplication = this.studentBacklogExaminationApplicationSubjectPaperCodeResponseList
      .filter(result => result.isSelected)
      .map((result, rowIndex) => ({
        id: result.id,
        rowIndex,
        subPaperCodeId: result.subjectPaperCodeId,
        ovId: result.operationalVerticalId,
        backExamId: result.backlogExaminationApplicationId
      }));
  }

  displayLimitMessage(name: string) {
    this.partnerAppSettingService.getByName(name).subscribe({
      next: res => {
        this.examPaperSelectLimit = Number(res.at(-1)?.value ?? 0);
        this.examPaperSelectLimitMessage = `You can apply for a maximum of ${this.examPaperSelectLimit} papers in the Special Backlog Examination. Please select papers based on your priority.`;
      }, error: error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }

  getStudentExamination() {
    this.resultService.getStudentExamination(this.studentId).subscribe(data => {
      this.studentExaminationResponse = data;
      if (this.studentExaminationResponse) {
        this.studentExamination = this.studentExaminationResponse.studentExaminations ?? [];
        this.programExpando = this.studentExaminationResponse.programExpandos ?? [];
        this.operationalVerticalExpando = this.studentExaminationResponse.operationalVerticalExpandos ?? [];
        this.examinationTypeExpando = this.studentExaminationResponse.examinationTypeExpandos ?? [];
        this.examinationExpando = this.studentExaminationResponse.examinationExpandos ?? [];
        this.bindStudentPrograms()
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
    });
  }
  initializeAcademicResultFormGroup() {
    this.backlogExaminationDataFormGroup = this.fb.group({
      id: 0,
      programId: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      examinationId: ['', Validators.required],
    });
  }

  bindStudentPrograms() {
    this.programList = [];
    var result = this.programExpando.filter(o => this.studentExamination.some(({ programId }) => o.id === programId));

    this.programList = result.reduce((accumalator: any, current: any) => {
      if (!accumalator.some((x: any) => x.label == current.name && x.value == current.id)) {
        accumalator.push({ label: current.name, value: current.id });
      }
      return accumalator;
    }, []);

  }

  bindStudentRegNum() {
    this.regNumber = [];
    const registrationNumber = this.studentExaminationResponse?.studentExaminations?.[0]?.registrationNumber;
    if (registrationNumber) {
      this.regNumber.push({ label: registrationNumber, value: registrationNumber });

    }

    this.getExamId(registrationNumber ?? '');

    // this.regNumber.push({ label: this.studentExaminationResponse.studentExaminations[0].registrationNumber, value: this.studentExaminationResponse.studentExaminations[0].registrationNumber })
    //this.getExamId();
  }

  getExamId(registrationNumber: string) {
    this.activeExaminationList = [];
    this.examinationService.getActiveExaminationsForFormSubmissionByRegistrationNumber(registrationNumber).subscribe({
      next: (res) => {
        if (res.length == 0) {
          this.messageService.add({ severity: 'info', summary: 'Info', detail: "There are no active examinations for you at this time.", life: 3000 });
        }
        this.examinationList = res;
        const tempArr = res.filter((element: any) => {
          const normalizedName = element.name.trim().toLowerCase();
          return (
            element.status === "PUBLISHED" &&
            (normalizedName.includes("backlog") ||
              normalizedName.includes("suppl") ||
              normalizedName.includes("summer")
              || normalizedName.includes("special")
            )
          );
        });

        this.activeExaminationList = tempArr.reduce((acc: any[], curr: any) => {
          if (!acc.some(x => x.label === curr.name && x.value === curr.id)) {
            acc.push({ label: curr.name, value: curr.id });
          }
          return acc;
        }, []);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }

  private loadBacklogApplicationData(regNum: string, examId: number, showPaymentDialogOnInitiated: boolean = false) {
    this.backlogExaminationService.getBacklogExaminationApplicationDataByRegistrationNumberExmainationId(regNum, examId).subscribe({
      next: (res) => {
        this.studentBacklogExaminationDetails = res;
        this.applicationStatus = res.status;
        this.searchResult = true;
        const isPaymentCompleted = this.isPaymentCompleted();

        this.studentBacklogExaminationApplicationSubjectPaperCodeResponseList = (this.studentBacklogExaminationDetails.backlogExaminationApplicationSubjectPaperCodeResponseList ?? []).map(result => {
          const paper = result as any;
          return {
            ...paper,
            isSelected: paper.status === 'PUBLISHED',
            isDisableSubjectCheckBox: isPaymentCompleted && paper.status === 'PUBLISHED'
          };
        });
        this.updatePaperSelectionLocks();
        this.syncSelectedPapers();

        if (isPaymentCompleted) {
          this.disableSaveBtn = false;
          if (this.applicationStatus === "PUBLISHED") { this.noteB = true; }
        }

        if (this.getPaymentStatus() == "INITIATED") {
          this.noteA = true;
          if (showPaymentDialogOnInitiated) {
            this.paymentModalBox = true;
          }
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    });
  }

  SearchResult(showPaymentDialogOnInitiated: boolean = false) {
    this.registartionCloseMsg = false;
    this.searchResult = false;
    this.disableSaveBtn = false;
    this.noteA = false;
    this.noteB = false;
    this.paymentModalBox = false;

    this.visibleConfirmationBox = false;
    this.studentBacklogExaminationDetails;
    this.studentBacklogExaminationApplicationSubjectPaperCodeResponseList = [];
    this.selectedProgramForBacklogApplication = [];
    let regNum = this.backlogExaminationDataFormGroup.value.registrationNumber
    let examId = this.backlogExaminationDataFormGroup.value.examinationId

    // if (examId == 62) {
    //   this.registartionCloseMsg = true;
    //   console.log("Registration closed for this examination."); 
    // } else {
    this.loadBacklogApplicationData(regNum, examId, showPaymentDialogOnInitiated);
    // }
  }

  onExaminationChange(event: any) {
    if (event.value) {
      this.studentBacklogExaminationApplicationSubjectPaperCodeResponseList = [];
      const examination = this.examinationList.find(exam => exam.id === event.value);
      this.categoryId = examination?.categoryId ?? 0;
      if (this.categoryId === 3) {
        this.displayLimitMessage("SpecialExaminationBacklogSubjectLimit");
      }
    }
  }


  createArrayForSlectedProgram(paperDetails: any, i: any) {
    // if (this.isPaymentCompleted()) {
    //   return;
    // }

    const selectedPaper = this.studentBacklogExaminationApplicationSubjectPaperCodeResponseList[i];
    if (!selectedPaper) {
      return;
    }

    selectedPaper.isSelected = !selectedPaper.isSelected;
    this.updatePaperSelectionLocks(selectedPaper.isSelected === false);
    this.syncSelectedPapers();
  }

  confirmation() {
    const selectedPaperCount = this.getSelectedPaperCount();
    const minimumRequiredSelectedPaperCount = this.getMinimumRequiredSelectedPaperCount();
    const hasDeletedSubjects = this.studentBacklogExaminationApplicationSubjectPaperCodeResponseList.some((paper: any) => {
      const wasPublished = (paper.status ?? '').toUpperCase() === 'PUBLISHED';
      const isExistingRecord = (paper.id ?? 0) > 0;
      return !paper.isSelected && wasPublished && isExistingRecord;
    });

    if (minimumRequiredSelectedPaperCount > 0 && selectedPaperCount < minimumRequiredSelectedPaperCount) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `You have already paid for ${minimumRequiredSelectedPaperCount} paper(s). Please keep at least ${minimumRequiredSelectedPaperCount} paper(s) selected before saving.`,
        life: 3000
      });
    } else if (this.selectedProgramForBacklogApplication.length === 0 && !hasDeletedSubjects) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You are required to select your papers before moving forward.', life: 3000 });
    } else if (this.categoryId === 3 && this.selectedProgramForBacklogApplication.length > this.examPaperSelectLimit) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `You can select only up to ${this.examPaperSelectLimit} papers.`, life: 3000 });
    } else {
      this.visibleConfirmationBox = true;
    }
  }

  handleCancelConfirmation() {
    this.visibleConfirmationBox = false;
    this.SearchResult();
  }

  applyBacklogExamRegistration() {
    this.visibleConfirmationBox = false;
    const now = this.dateFormatterService.ConvertLocalDateTimeString(new Date());
    this.multiSelectedProgram = [];

    this.studentBacklogExaminationApplicationSubjectPaperCodeResponseList.forEach((paper: any) => {
      const wasPublished = (paper.status ?? '').toUpperCase() === 'PUBLISHED';
      const isExistingRecord = (paper.id ?? 0) > 0;

      if (paper.isSelected) {
        this.multiSelectedProgram.push({
          id: paper.id ?? 0,
          backlogExaminationApplicationId: paper.backlogExaminationApplicationId ?? 0,
          operationalVerticalId: paper.operationalVerticalId,
          subjectPaperCodeId: paper.subjectPaperCodeId,
          status: 'PUBLISHED',
          createdBy: "",
          modifiedBy: "",
          createdDate: now,
          modifiedDate: now,
        });
        return;
      }

      if (!paper.isSelected && wasPublished && isExistingRecord) {
        this.multiSelectedProgram.push({
          id: paper.id,
          backlogExaminationApplicationId: paper.backlogExaminationApplicationId ?? 0,
          operationalVerticalId: paper.operationalVerticalId,
          subjectPaperCodeId: paper.subjectPaperCodeId,
          status: 'DELETED',
          createdBy: "",
          modifiedBy: "",
          createdDate: now,
          modifiedDate: now,
        });
      }
    });

    const payload = {
      createdBy: "",
      modifiedBy: "",
      createdDate: this.dateFormatterService.ConvertLocalDateTimeString(new Date()),
      modifiedDate: this.dateFormatterService.ConvertLocalDateTimeString(new Date()),
      id: this.studentBacklogExaminationDetails.id,
      academicSessionId: this.studentBacklogExaminationDetails.academicSessionId,
      programId: this.studentBacklogExaminationDetails.programId,
      examinationId: this.studentBacklogExaminationDetails.examinationId,
      studentId: this.studentBacklogExaminationDetails.studentId,
      registrationNumber: this.studentBacklogExaminationDetails.registrationNumber,
      rollNumber: this.studentBacklogExaminationDetails.rollNumber,
      remarks: 'Examination Backlog Application',
      paymentStatus: (this.studentBacklogExaminationDetails.id && this.studentBacklogExaminationDetails.id > 0) ? this.studentBacklogExaminationDetails.paymentStatus : 'INITIATED',
      paidAmount: this.studentBacklogExaminationDetails.paidAmount,
      dueAmount: this.getCalculatedDueAmount(),
      status: 'PUBLISHED',
      backlogExaminationApplicationSubjectPaperCodes: this.multiSelectedProgram
    };

    this.backlogExaminationService.addBacklogExaminationApplication(payload).subscribe(res => {
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your Backlog Application has been submitted successfully. Please proceed with the payment process to complete your examination registration.', life: 3000 });
        this.SearchResult(true);
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      this.SearchResult();
    });
  }

  proceedForPayment() {
    this.paymentModalBox = false;
    this.router.navigateByUrl('/home/students/payments');
  }

  goToRegistartion() {
    this.router.navigateByUrl('/home/students/backlog-examination-registration');
  }
}
