import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { SharedModule } from '@/shared.module';
import { ExaminationExpando, ExaminationTypeExpando, OperationalVerticalExpando, ProgramExpando } from 'src/app/shared/models/commons/expandos';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { StudentExaminationResponse } from 'src/app/shared/models/knowledge-stand/examination';
import { StudentExaminationResultResponse } from 'src/app/shared/models/knowledge-stand/examination-result';
import { ExaminationType } from 'src/app/shared/models/knowledge-stand/examination-type';
import { StudentExaminationResultStudentWise } from 'src/app/shared/models/knowledge-stand/student-examination-result-student-wise';
import { StudentSubjectPaperCodeEndExamMarks, StudentSubjectPaperCodeMidExamMarks } from 'src/app/shared/models/knowledge-stand/student-full-examination-result-report';
import { ExaminationResultSearch } from 'src/app/shared/models/students/examination-result-search';
import { StudentExamination } from 'src/app/shared/models/students/student-examination';
import { ExaminationResultService } from '../../services/examination-result.service';

@Component({
  selector: 'app-academic-result',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './academic-result.component.html',
  styleUrl: './academic-result.component.scss'
})
export class AcademicResultComponent {

  componentName: string = "Academic Result"
  examinationResultSearch: ExaminationResultSearch = {};
  studentExaminationResultStudentWise: StudentExaminationResultStudentWise = {};
  studentExaminationResultResponse: StudentExaminationResultResponse = {};
  studentExamination: StudentExamination[] = [];
  programExpando: ProgramExpando[] = [];
  operationalVerticalExpando: OperationalVerticalExpando[] = [];
  examinationTypeExpando: ExaminationTypeExpando[] = [];
  examinationExpando: ExaminationExpando[] = [];
  studentSubjectPaperCodeMidExamMarks: StudentSubjectPaperCodeMidExamMarks[] = [];
  studentSubjectPaperCodeEndExamMarks: StudentSubjectPaperCodeEndExamMarks[] = [];
  studentExaminationResponse: StudentExaminationResponse = {};
  examinationType: ExaminationType[] = [];
  academicResultFormGroup!: FormGroup;
  programList: SelectItem[] = [];
  operationalVerticalList: SelectItem[] = [];
  examinationList: SelectItem[] = [];
  examinationTypeList: SelectItem[] = [];

  hasError: boolean = false;

  studentId: string = "";
  programName: string = "";
  operationalVerticalName: string = "";
  registrationNumber: string = "";
  examinationTypeSelected: number = 0;
  downloadByExaminationResultLink: SafeUrl = "";
  resultMessage: string = "";
  feedbackDialog: boolean = false;
  selectedOperationalVertical?: string;

  private currentUserSubject!: BehaviorSubject<LoginResponse>;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private resultService: ExaminationResultService,
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
    // this.examinationResultSearch = {};
    // this.studentExaminationResultStudentWise = {};
    // this.academicResultGroup.value.examinationType = 2;
    // this.academicResultGroup.value.operationalVerticalName = 2;
    // this.studentExaminationResultStudentWise.registrationNumber = "SBU184000001";
    // this.examinationTypeSelected = 2;
    // this.SearchResult();

    // this.bindStudentPrograms();
  }
  getStudentExamination() {
    this.resultService.getStudentExamination(this.studentId).subscribe({
      next: (data) => {
        this.studentExaminationResponse = data;
        if (this.studentExaminationResponse) {
          this.studentExamination = this.studentExaminationResponse.studentExaminations ?? [];
          this.programExpando = this.studentExaminationResponse.programExpandos ?? [];
          this.operationalVerticalExpando = this.studentExaminationResponse.operationalVerticalExpandos ?? [];
          this.examinationTypeExpando = this.studentExaminationResponse.examinationTypeExpandos ?? [];
          this.examinationExpando = this.studentExaminationResponse.examinationExpandos ?? [];
          this.bindStudentPrograms()
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
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
  onProgamChanged(event: any) {
    if (event.value) {
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
  onOperationalVerticalChanged(event: { value: number | undefined; }) {

    if (event.value) {
      this.bindExaminationType(this.academicResultFormGroup.value.programId, this.academicResultFormGroup.value.operationalVerticalId);
    }
  }
  bindExaminationType(selectedProgramId: number | undefined, selectedOV: number | undefined) {
    this.examinationTypeList = [];
    var result = this.examinationTypeExpando.filter(o => this.studentExamination.some(({ programId, operationalVerticalId, examinationTypeId }) =>
      programId === selectedProgramId && operationalVerticalId === selectedOV && examinationTypeId === o.id));
    this.examinationTypeList = result.reduce((accumalator: any, current: any) => {
      if (!accumalator.some((x: any) => x.label == current.name && x.value == current.id)) {
        accumalator.push({ label: current.name, value: current.id });
      }
      return accumalator;
    }, []);
  }
  onExaminationTypeChanged(event: any) {
    if (event.value) {
      this.bindExamination(this.academicResultFormGroup.value.programId, this.academicResultFormGroup.value.operationalVerticalId,
        this.academicResultFormGroup.value.examinationTypeId);
    }
  }
  bindExamination(selectedProgramId: any, selectedOV: any, selectedExaminationId: any) {
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
      this.examinationResultSearch.examinationId = event.value;
      this.studentExaminationResultStudentWise.examinationId = event.value;
    }
  }
  SearchResult() {
    this.downloadByExaminationResultLink = "";
    let payload = {
      "examinationId": this.academicResultFormGroup.value.examinationId,
      "examinationTypeId": this.academicResultFormGroup.value.examinationTypeId,
      "operationalVerticalId": this.academicResultFormGroup.value.operationalVerticalId,
      "registrationNumber": this.studentId,

    }

    if (this.studentExaminationResultStudentWise) {
      this.resultService.downloadByExaminationResultStudentWiseSearchRequest(payload).subscribe({
        next: data => {
          this.downloadByExaminationResultLink = data.result;
        }, error: error => {
          this.hasError = true;
          this.resultMessage = error.error.message;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
        }
      });
    }
  }
}