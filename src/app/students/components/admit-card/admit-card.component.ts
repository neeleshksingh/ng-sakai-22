import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { ExaminationHallTicketResponse, ExaminationHallTicketSearch } from 'src/app/shared/models/students/examination-hall-ticket';
import { StudentExaminationByAcadmicSession } from 'src/app/shared/models/students/student-examination-by-acadmic-session';
import { ExaminationHallTicketService } from '../../services/examination-hall-ticket.service';
import { ExaminationService } from '../../services/examination.service';
import { StudentProgramService } from '../../services/student-program.service';

@Component({
  selector: 'app-admit-card',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './admit-card.component.html',
  styleUrl: './admit-card.component.scss'
})
export class AdmitCardComponent {

  componentName: string = "Download Admit Card"

  programList: SelectItem[] = [];
  operationalVerticalList: SelectItem[] = [];
  examinationList: SelectItem[] = [];
  academicSessionList: SelectItem[] = [];

  examinationHallTicketSearch: ExaminationHallTicketSearch = {};
  studentPrograms: StudentProgram[] = [];
  studentExaminationByAcadmicSession: StudentExaminationByAcadmicSession[] = [];
  examinationHallTicketResponse: ExaminationHallTicketResponse = {};

  hallTicketFormGroup!: FormGroup;
  downloadByAdmitCardLink: SafeUrl = "";
  isAdmitCardPublished: boolean = true;
  resultMessage: string = "";
  visible: boolean = false;
  subjectsNames: string = "";
  isEndSemExam: boolean = false;
  showBatchAttendancePercentageColumn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentProgramService: StudentProgramService,
    private messageService: MessageService,
    private examinationHallTicketService: ExaminationHallTicketService,
    private examinationService: ExaminationService) { }

  ngOnInit(): void {
    this.initializeHallTicketFormGroup();
    this.examinationHallTicketSearch = {};
    this.GetStudentProgramDetails();
  }

  initializeHallTicketFormGroup() {
    this.hallTicketFormGroup = this.fb.group({
      id: 0,
      programId: ['', Validators.required],
      operationalVerticalId: ['', Validators.required],
      academicSessionId: ['', Validators.required],
      examinationId: ['', Validators.required],
      registrationNumber: ['']
    });
  }

  GetStudentProgramDetails() {
    this.studentPrograms = [];
    this.studentProgramService.getStudentProgramList().subscribe({
      next: (data) => {
        this.studentPrograms = data;
        this.academicSessionList = data.reduce((accumalator: any, current: any) => {
          if (!accumalator.some((x: any) => x.label == current.academicSessionName && x.value == current.academicSessionId)) {
            accumalator.push({ label: current.academicSessionName, value: current.academicSessionId });
          }
          return accumalator;
        }, []);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }

  onAcademicChanged(event: { value: number | undefined; }) {
    if (event.value) {
      this.examinationHallTicketSearch.academicSessionId = event.value;
      this.programLoad(this.examinationHallTicketSearch.academicSessionId);
    }
  }

  programLoad(academicSessionId: number | undefined) {
    var result = this.studentPrograms.filter(x => x.academicSessionId == academicSessionId);
    if (result) {
      this.programList = [];
      this.programList = result.reduce((accumalator: any, current: any) => {
        if (!accumalator.some((x: any) => x.label == current.programName && x.value == current.programId)) {
          accumalator.push({ label: current.programName, value: current.programId });
        }
        return accumalator;
      }, []);
      this.programList.sort((a, b) => { return a.value - b.value; });
    }
  }

  onProgramChanged(event: { value: number | undefined; }) {
    if (event.value) {
      var result = this.studentPrograms.filter(x => x.programId == event.value);
      this.examinationHallTicketSearch.programId = event.value;
      this.examinationHallTicketSearch.registrationNumber = result[0].registrationNumber;
      if (result) {
        this.operationalVerticalList = result.reduce((accumalator: any, current: any) => {
          if (!accumalator.some((x: any) => x.label == current.operationalVerticalName && x.value == current.operationalVerticalId)) {
            accumalator.push({ label: current.operationalVerticalName, value: current.operationalVerticalId });
          }
          return accumalator;
        }, []);
        this.operationalVerticalList.sort((a, b) => { return a.value - b.value; });
      }
    }
  }

  onOperationalVerticalChanged(event: { value: number | undefined; }) {
    if (event.value) {
      this.examinationHallTicketSearch.operationalVerticalId = event.value;
      this.getActiveExaminationByAcadmicSession();
    }
  }

  getActiveExaminationByAcadmicSession() {
    this.examinationService.getActiveExaminationByAcadmicSession(this.examinationHallTicketSearch.academicSessionId ?? 0,
      this.examinationHallTicketSearch.programId ?? 0, this.examinationHallTicketSearch.operationalVerticalId ?? 0,
      this.examinationHallTicketSearch.registrationNumber ?? "").subscribe({
        next: (data: any) => {
          this.studentExaminationByAcadmicSession = data;
          this.examinationList = [];
          if (!data || data.length === 0) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Warning',
              detail: 'Student examination registration not found for selected semester.',
              life: 3000
            });
            return;
          }
          this.examinationList = data.reduce((accumalator: any, current: any) => {
            if (!accumalator.some((x: any) => x.label == current.examinationTypeName && x.value == current.id)) {
              accumalator.push({ label: current.examinationTypeName, value: current.id });
            }
            return accumalator;
          }, []);
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
        }
      })
  }

  onExaminationChanged(event: { value: number | undefined; }) {
    const selectedExam = this.studentExaminationByAcadmicSession.find(x => x.id === event.value);
    if (selectedExam?.examinationTypeId == 2 && selectedExam?.categoryId === 1) {
      this.isEndSemExam = true;
    }
    this.downloadByAdmitCardLink = "";
    this.examinationHallTicketResponse = {};
    if (event.value) {
      this.examinationHallTicketSearch.examinationId = event.value;
    }
  }
  viewExaminationHallTicketDetails() {
    this.downloadByAdmitCardLink = "";
    this.examinationHallTicketResponse = {};
    this.examinationHallTicketService.getByExaminationHallTicketSearchRequest(this.examinationHallTicketSearch).subscribe({
      next: (response) => {
        const subjectList = response?.examinationHallTicketSubjectPaperCodeResponseList || [];
        subjectList.sort((a: any, b: any) =>
          new Date(a.examinationDate).getTime() - new Date(b.examinationDate).getTime()
        );

        this.showBatchAttendancePercentageColumn = subjectList.some(
          (x: any) => x.batchAttendancePercentage !== null && x.batchAttendancePercentage !== undefined
        );

        response.examinationHallTicketSubjectPaperCodeResponseList = subjectList;

        if (!this.isEndSemExam) {
          this.examinationHallTicketResponse = response;
        } else {
          this.examinationHallTicketResponse = response;
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }

  isRowLowAttendance(item: any): boolean {
    if (item.paperTypeId === 1) {
      return this.showBatchAttendancePercentageColumn &&
        item.batchAttendancePercentage != null &&
        item.batchAttendancePercentage <= 74.5;
    } else if (item.paperTypeId === 2 || item.paperTypeId === 3) {
      return this.showBatchAttendancePercentageColumn &&
        item.batchAttendancePercentage != null &&
        item.batchAttendancePercentage <= 50;
    }
    return false;
  }


  onSave() {
    this.examinationHallTicketService.saveExaminationHallTicketResponse(this.examinationHallTicketResponse).subscribe({
      next: (response) => {
        this.examinationHallTicketResponse = {};
        this.examinationHallTicketResponse = response;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }
  onDownload() {
    this.downloadByAdmitCardLink = "";
    this.examinationHallTicketService.downloadByExaminationHallTicketSearchRequest(this.examinationHallTicketSearch).subscribe({
      next: (data) => {
        if (data.fileUrl) {
          window.open(data.fileUrl, '_blank');
        }
        //this.downloadByAdmitCardLink = data.fileUrl;
        this.isAdmitCardPublished = true;
      },
      error: (error) => {
        this.isAdmitCardPublished = false;
        this.resultMessage = error.error.message;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }
}
