import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { SharedModule } from '@/shared.module';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { Examination } from 'src/app/shared/models/knowledge-stand/examination';
import { StudentExaminationRegistration } from 'src/app/shared/models/knowledge-stand/student-examination-registration';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { DateFormatterService } from 'src/app/shared/services/date-formatter.service';
import { ExaminationResultService } from '../../services/examination-result.service';
import { ExaminationService } from '../../services/examination.service';
import { StudentExaminationRegistrationService } from '../../services/student-examination-registration.service';
import { StudentProgramService } from '../../services/student-program.service';

@Component({
  selector: 'app-backlog-examination-registration',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './backlog-examination-registration.component.html',
  styleUrl: './backlog-examination-registration.component.scss'
})
export class BacklogExaminationRegistrationComponent {

  componentName: string = "Backlog/Supplementary Examination Registration"
  backlogExaminationRegDataFormGroup!: FormGroup;
  studentPrograms: StudentProgram[] = [];
  examinations: Examination[] = [];

  registrationNumberSelectItemList: SelectItem[] = [];

  activeExaminationItemList: SelectItem[] = [];
  studentId: string = "";
  studentExaminationResponse: any;
  studentExpando: any[] = [];
  studentExaminationRegistrations: StudentExaminationRegistration[] = [];
  backlogExamRegistrationBasicDetails: any;
  basicDetailVisible: boolean = false;
  tableVisible: boolean = false;
  backlogPaperData: StudentExaminationRegistration[] = [];
  currentSemesterDetails: any;
  disableSubmitButton: boolean = false;
  rowData: any;


  private currentUserSubject!: BehaviorSubject<LoginResponse>;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private studentExaminationRegistrationService: StudentExaminationRegistrationService,
    private examinationService: ExaminationService,
    private dateFormatterService: DateFormatterService,
    private resultService: ExaminationResultService,
    private studentProgramService: StudentProgramService
  ) { }


  ngOnInit(): void {
    this.initializeAcademicResultFormGroup();
    var data = localStorage.getItem('currentUser');
    if (data) {
      const parsedData = JSON.parse(data);
      this.currentUserSubject = new BehaviorSubject<LoginResponse>(parsedData);
      this.studentId = this.currentUserSubject.value.applicationUser.userName ?? '';
    }
    this.getStudentCurrentProgramDetails();
    this.getStudentExamination();
  }

  getStudentCurrentProgramDetails() {
    this.studentPrograms = [];
    this.studentProgramService.getStudentProgramList().subscribe({
      next: (response) => {
        this.currentSemesterDetails = response.filter(x => x.isCurrentOperationalVertical == true);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }

  getStudentExamination() {
    this.resultService.getStudentExamination(this.studentId).subscribe({
      next: (data) => {
        this.studentExaminationResponse = data;
        if (this.studentExaminationResponse) {
          this.studentExpando = this.studentExaminationResponse.studentExpandos
          this.bindStudentRegNum();
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }

  initializeAcademicResultFormGroup() {
    this.backlogExaminationRegDataFormGroup = this.fb.group({
      registrationNumber: ['', Validators.required],
      examinationId: ['', Validators.required],
    });
  }

  bindStudentRegNum() {
    this.registrationNumberSelectItemList = [];
    const registrationNumber = this.studentExaminationResponse?.studentExaminations?.[0]?.registrationNumber;
    if (registrationNumber) {
      this.registrationNumberSelectItemList.push({ label: registrationNumber, value: registrationNumber });

    }
    // this.registrationNumberSelectItemList.push({ label: this.studentExpando[0].registrationNumber, value: this.studentExpando[0].registrationNumber })
    this.getExamId();
  }

  getExamId() {
    this.activeExaminationItemList = [];
    this.examinationService.getActiveExaminationsForFormSubmission().subscribe(res => {
      var result = res;
      if (res.length == 0) {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: "No Active Examination found for this student.", life: 3000 });
      }
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

      this.activeExaminationItemList = tempArr.reduce((acc: any[], curr: any) => {
        if (!acc.some(x => x.label === curr.name && x.value === curr.id)) {
          acc.push({ label: curr.name, value: curr.id });
        }
        return acc;
      }, []);
    })
  }

  onSearch() {
    this.basicDetailVisible = false;
    this.tableVisible = false;
    this.disableSubmitButton = false;
    this.studentExaminationRegistrations = [];
    let examId = this.backlogExaminationRegDataFormGroup.value.examinationId;
    let regNum = this.backlogExaminationRegDataFormGroup.value.registrationNumber;

    this.getBacklogRegstrationData(examId, regNum);
  }

  getBacklogRegstrationData(examId: number, regNum: string) {
    this.studentExaminationRegistrationService.getStudentBacklogExaminationRegistrationData(examId, regNum).subscribe({
      next: response => {
        if (response.length > 0) {
          this.basicDetailVisible = true;
          this.tableVisible = true;
          this.studentExaminationRegistrations = response;
          if (this.studentExaminationRegistrations.every(element => element.id != 0)) {
            this.disableSubmitButton = true;
          }

          this.backlogExamRegistrationBasicDetails = this.studentExaminationRegistrations[0];

        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Subjects are not available at this time as the configuration is still pending. Kindly contact the Examination Department.", life: 3000 });
        }
      }, error: error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    });
  }

  onExamSubmit() {
    let payload: StudentExaminationRegistration[] | {
      id: number | undefined; examinationId: number | undefined; academicSessionId: number | undefined;
      programId: number | undefined; operationalVerticalId: number | undefined; paperTypeId: number | undefined;
      subjectPaperCodeId: number | undefined; batchCode: string | undefined; registrationNumber: string | undefined; isBackPaper: boolean;
      submitDateTime: string; status: string; createdBy: string; createdDate: Date; modifiedBy: string; modifiedDate: Date;
    }[] = [];

    this.studentExaminationRegistrations.forEach(element => {
      let payloadObj = {
        "id": element.id,
        "examinationId": element.examinationId,
        "academicSessionId": element.academicSessionId,
        "programId": element.programId,
        "operationalVerticalId": element.operationalVerticalId,
        "paperTypeId": element.paperTypeId,
        "subjectPaperCodeId": element.subjectPaperCodeId,
        "batchCode": element.batchCode,
        "registrationNumber": element.registrationNumber,
        "isBackPaper": true,
        "submitDateTime": this.dateFormatterService.ConvertLocalDateTimeString(new Date()),
        "status": "PUBLISHED",
        "createdBy": "",
        "createdDate": new Date(),
        "modifiedBy": "",
        "modifiedDate": new Date(),
      }
      payload.push(payloadObj)
    });


    this.studentExaminationRegistrationService.addMultiple(payload).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'submitted successfully...' });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      },
      complete: () => {
        this.getBacklogRegstrationData(this.backlogExaminationRegDataFormGroup.value.examinationId, this.backlogExaminationRegDataFormGroup.value.registrationNumber);
      }
    })
  }
}
