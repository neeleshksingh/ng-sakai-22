import { formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { SharedModule } from '@/shared.module';
import { ExaminationExpando, ExaminationTypeExpando, OperationalVerticalExpando, ProgramExpando } from 'src/app/shared/models/commons/expandos';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { ExaminationType } from 'src/app/shared/models/knowledge-stand/examination-type';
import { StudentExaminationResultStudentWise } from 'src/app/shared/models/knowledge-stand/student-examination-result-student-wise';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { ExaminationResultSearch } from 'src/app/shared/models/students/examination-result-search';
import { ExaminationScrutiny } from 'src/app/shared/models/students/examination-scrutiny';
import { StudentExamination } from 'src/app/shared/models/students/student-examination';
import { StudentExaminationResponse } from 'src/app/shared/models/students/student-examination-response';
import { StudentExaminationResult } from 'src/app/shared/models/students/student-examination-result';
import { StudentExaminationResultResponse } from 'src/app/shared/models/students/student-examination-result-response';
import { StudentSubjectPaperCodeEndExamMarks } from 'src/app/shared/models/students/student-subject-paper-code-end-exam-marks';
import { StudentSubjectPaperCodeEndExamMarksConsolidated } from 'src/app/shared/models/students/student-subject-paper-code-end-exam-marks-consolidated';
import { StudentSubjectPaperCodeMidExamMarks } from 'src/app/shared/models/students/student-subject-paper-code-mid-exam-marks';
import { DateFormatterService } from 'src/app/shared/services/date-formatter.service';
import { ExaminationResultService } from '../../services/examination-result.service';
import { ExaminationScrutinyApplicationService } from '../../services/examination-scrutiny-application.service';
import { ExaminationService } from '../../services/examination.service';

@Component({
  selector: 'app-examination-scrutiny-application',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './examination-scrutiny-application.component.html',
  styleUrl: './examination-scrutiny-application.component.scss'
})
export class ExaminationScrutinyApplicationComponent {

  componentName: string = "Scrutiny Application";
  examinationScrutinyApplication: ExaminationScrutiny[] = [];
  studentExaminationResult: StudentExaminationResult[] = [];
  examinationResultSearch: ExaminationResultSearch = {};
  studentExaminationResultStudentWise: StudentExaminationResultStudentWise = {};
  studentExaminationResultResponse?: StudentExaminationResultResponse | null;
  studentExamination: StudentExamination[] = [];
  programExpando: ProgramExpando[] = [];
  operationalVerticalExpando: OperationalVerticalExpando[] = [];
  examinationTypeExpando: ExaminationTypeExpando[] = [];
  examinationExpando: ExaminationExpando[] = [];
  studentSubjectPaperCodeMidExamMarks: StudentSubjectPaperCodeMidExamMarks[] = [];
  studentSubjectPaperCodeEndExamMarks: StudentSubjectPaperCodeEndExamMarks[] = [];
  studentSubjectPaperCodeEndExamMarksConsolidated: StudentSubjectPaperCodeEndExamMarksConsolidated = {};
  studentExaminationResponse: StudentExaminationResponse = {};
  studentPrograms: StudentProgram[] = [];
  examinationType: ExaminationType[] = [];
  multiSelectedProgram: any[] = [];

  academicResultFormGroup!: FormGroup;

  programList: SelectItem[] = [];
  operationalVerticalList: SelectItem[] = [];
  examinationList: SelectItem[] = [];
  examinationTypeList: SelectItem[] = [];
  academicSession: string = "";
  studentId: string = "";
  regNumber: string = "";
  fullExaminationName: string = "";
  programName: string = "";
  operationalVerticalName: string = "";
  examinationTypeSelected: number = 0;
  isStudentExaminationResultPublished: boolean = true;
  resultMessage: string = "";
  searchResult: boolean = false;
  searchedData: any;
  selectedProgramForScrutiny: any[] = [];
  visibleConfirmationBox: boolean = false;
  paymentModalBox: boolean = false;
  disableSaveBtn: boolean = false;
  noteA: boolean = false;
  noteB: boolean = false;
  initialNotice: boolean = false;

  private currentUserSubject!: BehaviorSubject<LoginResponse>;

  @ViewChild('downloadResultPDF') content!: ElementRef;
  rowData: any;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private resultService: ExaminationResultService,
    private examinationService: ExaminationService,
    private examinationScrutinyApplicationService: ExaminationScrutinyApplicationService,
    private dateFormatterService: DateFormatterService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeAcademicResultFormGroup();
    this.studentSubjectPaperCodeMidExamMarks = [];
    var data = localStorage.getItem('currentUser');
    if (data) {
      const parsedData = JSON.parse(data);
      this.currentUserSubject = new BehaviorSubject<LoginResponse>(parsedData);
      this.studentId = this.currentUserSubject.value.applicationUser.userName ?? '';
    }
    this.getStudentExamination();
    this.selectedProgramForScrutiny = []
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
    this.academicResultFormGroup = this.fb.group({
      id: 0,
      programId: ['', Validators.required],
      operationalVerticalId: ['', Validators.required],
      examinationTypeId: ['', Validators.required],
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

  onProgamChanged(event: { value: number | undefined; }) {
    if (event.value) {
      this.academicResultFormGroup.patchValue({
        operationalVerticalId: "",
        examinationTypeId: "",
        examinationId: ""
      })
      this.isStudentExaminationResultPublished = true;
      this.bindOperationalVertical(event.value);
    }
  }

  bindOperationalVertical(selectedProgramId: number | undefined) {
    this.operationalVerticalList = [];
    var result = this.operationalVerticalExpando.filter(o => this.studentExamination.some(({ programId, operationalVerticalId }) =>
      programId == selectedProgramId && o.id === operationalVerticalId))
    this.operationalVerticalList = result.reduce((accumalator: any, current: any) => {
      if (!accumalator.some((x: any) => x.label == current.name && x.value == current.id)) {
        accumalator.push({ label: current.name, value: current.id });
      }
      return accumalator;
    }, []);

    this.operationalVerticalList.sort((a, b) => { return a.value - b.value; });
  }

  onOperationalVerticalChanged(event: any) {
    if (event.value) {
      this.academicResultFormGroup.patchValue({
        examinationTypeId: "",
        examinationId: ""
      })
      this.isStudentExaminationResultPublished = true;
      this.bindExaminationType(this.academicResultFormGroup.value.programId, this.academicResultFormGroup.value.operationalVerticalId);
    }
  }

  bindExaminationType(selectedProgramId: number | undefined, selectedOV: number | undefined) {
    this.examinationTypeList = [];
    var result = this.examinationTypeExpando.filter(o => this.studentExamination.some(({ programId, operationalVerticalId, examinationTypeId }) =>
      programId === selectedProgramId && operationalVerticalId === selectedOV && examinationTypeId === o.id));
    this.examinationTypeList = result.reduce((accumalator: any, current: any) => {
      if (!accumalator.some((x: any) => x.label == current.name && x.value == current.id)) {
        if (current.name == 'END SEMESTER EXAMINATION') {
          accumalator.push({ label: current.name, value: current.id });
        }
      }
      return accumalator;
    }, []);
  }

  onExaminationTypeChanged(event: { value: number; }) {
    if (event.value) {
      this.academicResultFormGroup.patchValue({
        examinationId: ""
      })
      this.isStudentExaminationResultPublished = true;
      this.bindExamination(this.academicResultFormGroup.value.programId, this.academicResultFormGroup.value.operationalVerticalId,
        this.academicResultFormGroup.value.examinationTypeId);
    }
  }

  bindExamination(selectedProgramId: number | undefined, selectedOV: number | undefined, selectedExaminationId: number | undefined) {
    this.examinationList = [];
    var result = this.examinationExpando.filter(o => this.studentExamination.some(({ programId, operationalVerticalId, examinationTypeId,
      examinationId }) => programId === selectedProgramId && operationalVerticalId === selectedOV &&
      examinationTypeId === selectedExaminationId && examinationId === o.id));
    this.examinationList = result.reduce((accumalator: any, current: any) => {
      if (!accumalator.some((x: any) => x.label == current.name && x.value == current.id)) {
        accumalator.push({ label: current.name, value: current.id });
      }
      return accumalator;
    }, []);
  }
  onExaminationChanged(event: any) {
    if (event.value) {
      this.isStudentExaminationResultPublished = true;
      this.examinationResultSearch.examinationId = event.value;
      this.studentExaminationResultStudentWise.examinationId = event.value;
    }
  }

  SearchResult() {
    this.noteA = false;
    this.noteB = false;
    this.disableSaveBtn = false;

    this.examinationService.getByIntId(this.academicResultFormGroup.value.examinationId).subscribe({
      next: (x: any) => {
        var todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
        var scrutinyLastDate = formatDate(x.scrutinyLastDate, 'yyyy-MM-dd', 'en_US');

        if (x.isScrutinyOpen && scrutinyLastDate > todayDate) {

          this.studentExaminationResultStudentWise.examinationTypeId = this.academicResultFormGroup.value.examinationTypeId;
          this.studentExaminationResultStudentWise.operationalVerticalId = this.academicResultFormGroup.value.operationalVerticalId;
          this.isStudentExaminationResultPublished = true;
          this.studentExaminationResultResponse = null;
          this.studentSubjectPaperCodeEndExamMarks = [];
          let payload = {
            examinationId: this.academicResultFormGroup.value.examinationId,
            operationalVerticalId: this.academicResultFormGroup.value.operationalVerticalId,
            examinationTypeId: this.academicResultFormGroup.value.examinationTypeId,
            registrationNumber: this.studentId
          }
          if (this.studentExaminationResultStudentWise) {
            this.resultService.getByExaminationResultStudentWiseSearchRequest(payload).subscribe(data => {
              this.searchResult = true;

              this.searchedData = data;
              this.academicSession = data.academicSessionName;
              this.programName = data.programName;
              this.fullExaminationName = data.examinationName;
              this.operationalVerticalName = data.operationalVerticalName;
              this.studentExaminationResult = data.studentExaminationResultList;
              this.studentSubjectPaperCodeEndExamMarks = data.studentExaminationResultList[0].studentSubjectPaperCodeEndExamMarks
              this.studentSubjectPaperCodeEndExamMarksConsolidated = data.studentExaminationResultList[0].studentSubjectPaperCodeEndExamMarksConsolidated

            }, error => {
              this.isStudentExaminationResultPublished = false;
              this.resultMessage = error.error.message;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
            });
          }
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Scrutiny window is not opened. Please visit later.', life: 3000 });
        }
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
    this.getStudentScrutinyApplicationDetails();
  }

  getStudentScrutinyApplicationDetails() {
    this.examinationScrutinyApplicationService.getExaminationScrutinyApplicationByStudentIdExamId(this.studentId, this.academicResultFormGroup.controls['examinationId'].value).subscribe(res => {
      if (res) {
        const paymentSt = res?.paymentStatus;
        if (paymentSt?.toUpperCase() == "PAID" || paymentSt?.toUpperCase() == "INITIATED") {
          this.disableSaveBtn = true;
          if (paymentSt?.toUpperCase() == "INITIATED") { this.noteA = true; }
          if (paymentSt?.toUpperCase() == "PAID") { this.noteB = true; }
        }
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'You have not submitted or initiated any application for Scrutiny.', life: 3000 });
      }
    })
  }

  createArrayForSlectedProgram(Subjectid: any, SubjectPaperCodeId: any, i: any) {
    if (!this.selectedProgramForScrutiny.includes(SubjectPaperCodeId)) {
      this.selectedProgramForScrutiny.push(SubjectPaperCodeId)
    }
    else if (this.selectedProgramForScrutiny.includes(SubjectPaperCodeId)) {
      this.selectedProgramForScrutiny.splice(this.selectedProgramForScrutiny.indexOf(SubjectPaperCodeId), 1)
    }
  }

  confirmation() {
    if (this.selectedProgramForScrutiny.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Kindly Select your papers for Scrutiny', life: 3000 });
    } else {
      this.visibleConfirmationBox = true;
    }

  }

  applyScrutiny() {
    this.visibleConfirmationBox = false;
    this.multiSelectedProgram = [];
    this.selectedProgramForScrutiny.forEach(subId => {

      this.multiSelectedProgram.push({
        id: 0,
        examinationScrutinyApplicationId: 0,
        subjectPaperCodeId: subId,
        status: 'PUBLISHED',
        createdBy: "",
        modifiedBy: "",
        createdDate: this.dateFormatterService.ConvertLocalDateTimeString(new Date()),
        modifiedDate: this.dateFormatterService.ConvertLocalDateTimeString(new Date()),
      });
    });

    this.examinationScrutinyApplication = []
    const payload = {
      createdBy: "",
      modifiedBy: "",
      createdDate: this.dateFormatterService.ConvertLocalDateTimeString(new Date()),
      modifiedDate: this.dateFormatterService.ConvertLocalDateTimeString(new Date()),
      id: 0,
      academicSessionId: this.searchedData.academicSessionId,
      programId: this.searchedData.programId,
      operationalVerticalId: this.searchedData.operationalVerticalId,
      examinationId: this.searchedData.examinationId,
      studentId: this.searchedData.studentExaminationResultList[0].studentId,
      registrationNumber: this.searchedData.studentExaminationResultList[0].registrationNumber,
      rollNumber: this.searchedData.studentExaminationResultList[0].rollNumber,
      remarks: 'Examination Scrutiny Application',
      paymentStatus: 'INITIATED',
      paidAmount: 0,
      status: 'PUBLISHED',
      examinationScrutinyApplicationSubjectPaperCodes: this.multiSelectedProgram
    };

    this.examinationScrutinyApplicationService.ExaminationScrutinyApplicationAdd(payload).subscribe(res => {
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Initiated for Scrutiny', life: 3000 });
        this.paymentModalBox = true;
      }
    },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      });
  }

  proceedForPayment() {
    this.paymentModalBox = false;
    this.router.navigateByUrl('/home/students/payments');
  }
}
