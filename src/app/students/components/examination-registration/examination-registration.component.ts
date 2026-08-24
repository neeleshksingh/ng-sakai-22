import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ExcelFileProcessService } from 'src/app/global/services/file-process/excel-file-process.service';
import { SharedModule } from '@/shared.module';
import { Examination } from 'src/app/shared/models/knowledge-stand/examination';
import { ExaminationType } from 'src/app/shared/models/knowledge-stand/examination-type';
import { StudentProgramPaperCodeAllocation } from 'src/app/shared/models/knowledge-stand/student-academics-report';
import { StudentExaminationRegistration } from 'src/app/shared/models/knowledge-stand/student-examination-registration';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { StudentExaminationByAcadmicSession } from 'src/app/shared/models/students/student-examination-by-acadmic-session';
import { DateFormatterService } from 'src/app/shared/services/date-formatter.service';
import { ExaminationService } from '../../services/examination.service';
import { StudentExaminationRegistrationService } from '../../services/student-examination-registration.service';
import { StudentProgramService } from '../../services/student-program.service';

@Component({
  selector: 'app-examination-registration',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './examination-registration.component.html',
  styleUrl: './examination-registration.component.scss'
})
export class ExaminationRegistrationComponent {

  componentName: string = 'Examination Registration';
  examinationRegistrationGroup!: FormGroup;
  isSemesterFeedbackCompleted: boolean = false;
  isCurrentSemExamRegistred: boolean = false;
  isCurrentSemesterExamRegistrationPending: boolean = false;
  studentExaminationRegistrations: StudentExaminationRegistration[] = [];
  examinations: Examination[] = [];
  examinationTypes: ExaminationType[] = [];
  studentProgramPaperCodeAllocations: StudentProgramPaperCodeAllocation[] = [];
  StudentExaminationRegistration: StudentExaminationRegistration = {};
  groupListStudentExaminationRegistrations: any[] = [];
  programList: SelectItem[] = [];
  operationalVerticalList: SelectItem[] = [];
  studentPrograms: StudentProgram[] = [];
  examinationAcadmicSession: ExaminationAcadmicSession = {};
  activeExamination: StudentExaminationByAcadmicSession[] = [];
  activeExaminationList: SelectItem[] = [];
  @ViewChild('searchInput', { static: false }) searchInput: any;

  studentExaminationRegistration: any;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private excelFileProcessService: ExcelFileProcessService,
    private router: Router,
    private fb: FormBuilder,
    private studentExaminationRegistrationService: StudentExaminationRegistrationService,
    private examinationService: ExaminationService,
    private dateFormatterService: DateFormatterService,
    private studentProgramService: StudentProgramService
  ) { }

  ngOnInit(): void {
    this.initializeexaminationRegistrationGroup();
    this.bindStudentPrograms();

  }
  initializeexaminationRegistrationGroup() {
    this.examinationRegistrationGroup = this.fb.group({
      id: 0,
      programName: ['', Validators.required],
      operationalVerticalName: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      examinationTypeId: ['', Validators.required],

    });
  }

  bindStudentPrograms() {
    this.programList = [];
    this.examinationAcadmicSession = new ExaminationAcadmicSession();
    this.studentProgramService.getStudentProgramList().subscribe({
      next: (data) => {
        this.studentPrograms = data.filter(k => k.status == "PUBLISHED");
        this.examinationAcadmicSession.acadmicSessionId = this.studentPrograms[0].academicSessionId;
        this.examinationAcadmicSession.studentId = this.studentPrograms[0].studentId;
        var lists = []
        for (var i = 0; i < this.studentPrograms.length; i++) {
          lists.push({ label: this.studentPrograms[i].programName, value: this.studentPrograms[i].programId });
        }

        this.programList = lists.reduce((accumalator: any, current: any) => {
          if (!accumalator.some((x: any) => x.label == current.label && x.value == current.value)) {
            accumalator.push(current);
          }
          return accumalator;
        }, []);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }

  onProgamChanged(event: any) {
    this.examinationAcadmicSession.programId = event.value;
    this.examinationRegistrationGroup.controls['operationalVerticalName'].reset();
    this.operationalVerticalList = [];

    const currentOperationalVertical = this.studentPrograms.filter(
      (k) => k.status === "PUBLISHED" && k.isCurrentOperationalVertical === true && k.programId === event.value
    );

    if (currentOperationalVertical.length > 0) {
      const currentOperationalVerticalId = currentOperationalVertical[0]?.operationalVerticalId;

      if (currentOperationalVerticalId !== undefined) {
        const fileterStudentProgramList = currentOperationalVertical.filter(
          (k: any) => k.operationalVerticalId !== undefined && k.operationalVerticalId <= currentOperationalVerticalId
        );

        const lists1 = fileterStudentProgramList.map((item: any) => ({
          label: item.operationalVerticalName,
          value: item.operationalVerticalId,
        }));

        this.operationalVerticalList = lists1.reduce((accumalator: any[], current: any) => {
          if (!accumalator.some((x: any) => x.name === current.label && x.id === current.value)) {
            accumalator.push(current);
          }
          return accumalator;
        }, []);
      }
    }
  }


  onOperationalVerticalChanged(event: any) {
    this.examinationAcadmicSession.operationalVertical = event.value;
    this.examinationRegistrationGroup.controls['registrationNumber'].reset()
    var fileterdStudentProgram = this.studentPrograms.filter(k => k.programId == this.examinationRegistrationGroup.value.programName
      && k.operationalVerticalId == event.value);

    this.examinationRegistrationGroup.value.registrationNumber = fileterdStudentProgram[0].registrationNumber;

    //this.getCurrentSemesterPapers(fileterdStudentProgram[0].academicSessionId, fileterdStudentProgram[0].programId, fileterdStudentProgram[0].operationalVerticalId);
    this.getActiveExamination();
  }
  getActiveExamination() {
    if (this.examinationAcadmicSession.acadmicSessionId && this.examinationAcadmicSession.operationalVertical
      && this.examinationAcadmicSession.programId && this.examinationAcadmicSession.studentId) {

      this.examinationService.getActiveExaminationByAcadmicSession(this.examinationAcadmicSession.acadmicSessionId,
        this.examinationAcadmicSession.programId, this.examinationAcadmicSession.operationalVertical,
        this.examinationAcadmicSession.studentId).subscribe({
          next: (response) => {
            this.activeExamination = response;

            var fileterActiveExaminationList = this.activeExamination.filter(k => k.status == 'PUBLISHED');

            var lists = [];
            for (var i = 0; i < fileterActiveExaminationList.length; i++) {
              lists.push({ label: fileterActiveExaminationList[i].examinationTypeName, value: fileterActiveExaminationList[i].examinationTypeId });
            }

            this.activeExaminationList = lists.reduce((accumalator: any, current) => {
              if (!accumalator.some((x: any) => x.name == current.label && x.id == current.value)) {
                accumalator.push(current);
              }
              return accumalator;
            }, []);

          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
          }
        })
    }
  }
  onExaminationTypeChanged(event: any) {
    if (event.value) {
      this.examinationAcadmicSession.examinationTypeId = event.value;

    }
  }

  searchList() {
    this.getStudentExaminationRegistrationData();
  }

  getStudentExaminationRegistrationData() {
    this.studentExaminationRegistrations = [];
    this.groupListStudentExaminationRegistrations = [];
    // this.studentExaminationRegistrationService.getStudentExaminationRegistrationDataByExaminationIdOVIdStudentId(this.examinationAcadmicSession.examinationTypeId,
    // this.examinationAcadmicSession.operationalVertical, this.examinationAcadmicSession.studentId).then(x => {

    this.studentExaminationRegistrationService.getStudentExaminationRegistrationData().subscribe({

      next: (x) => {

        x = x.sort((a: any, b: any) => (b.examinationStartDateTime > a.examinationStartDateTime ? -1 : 1));
        if (x.filter(item => item.submitDateTime == null || item.submitDateTime == '' || item.submitDateTime == undefined).length > 0) {
          this.isCurrentSemExamRegistred = false;
          this.isCurrentSemesterExamRegistrationPending = true;
        }
        else {
          this.isCurrentSemExamRegistred = true;
          this.isCurrentSemesterExamRegistrationPending = false;
        }
        this.studentExaminationRegistrations = x;
        var GroupList = groupBy(this.studentExaminationRegistrations, (studentExaminationRegistration: { programName: any; }) => studentExaminationRegistration.programName);
        GroupList.forEach(j => {
          var gList = {
            examinationName: j[0].examinationName,
            programName: j[0].programName,
            operationalVerticalName: j[0].operationalVerticalName,
            examinationTypeName: j[0].examinationTypeName,
            studentExaminationRegistration: j.sort((a: any, b: any) => new Date(a.examinationStartDateTime) < new Date(b.examinationStartDateTime))
          }
          this.groupListStudentExaminationRegistrations.push(gList);
        });
      },
      error: (error) => {

        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
      }
    })
  }

  onExamSubmit(studentExaminationRegistrations: StudentExaminationRegistration[]) {
    studentExaminationRegistrations.forEach(k => {
      if (k.examinationStartDateTime) {
        k.examinationStartDateTime = this.dateFormatterService.ConvertLocalDateTimeString(new Date(k.examinationStartDateTime));
      }
      if (k.examinationEndDateTime) {
        k.examinationEndDateTime = this.dateFormatterService.ConvertLocalDateTimeString(new Date(k.examinationEndDateTime));
      }
    });

    this.studentExaminationRegistrationService.addMultiple(studentExaminationRegistrations).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Submitted successfully...' });

        this.studentExaminationRegistrationService.getStudentExaminationRegistrationData().subscribe({
          next: (x) => {
            if (x.filter(item => item.submitDateTime == null || item.submitDateTime == '' || item.submitDateTime == undefined).length > 0) {
              this.isCurrentSemExamRegistred = false;
              this.isCurrentSemesterExamRegistrationPending = true;
            } else {
              this.isCurrentSemExamRegistred = true;
              this.isCurrentSemesterExamRegistrationPending = false;
            }
            this.groupListStudentExaminationRegistrations = [];
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
          }
        });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    });
  }

}

function groupBy(list: any, keyGetter: any) {
  const map = new Map();
  list.forEach((item: any) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export class ExaminationAcadmicSession {
  acadmicSessionId?: number;
  programId?: number;
  operationalVertical?: number;
  studentId?: string;
  examinationTypeId?: number;
}
export class ErrorList {
  error?: string;
}