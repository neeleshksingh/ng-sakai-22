import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { SharedModule } from '@/shared.module';
import { OperationalVerticalSubjectConfiguration } from 'src/app/shared/models/cloudbytes/operational-vertical-subject-configuration';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { OperationalVerticalSubject } from 'src/app/shared/models/students/operational-vertical-subject';
import { StudentProgramPaperCodeAllocation } from 'src/app/shared/models/students/student-program-paper-code-allocation';
import { UserAccount } from 'src/app/shared/models/students/UserAccount';
import { OperationalVerticalSubjectConfigurationService } from '../../services/operational-vertical-subject-configuration.service';
import { OperationalVerticalSubjectService } from '../../services/operational-vertical-subject.service';
import { StudentProgramPaperCodeAllocationService } from '../../services/student-program-paper-code-allocation.service';
import { StudentProgramService } from '../../services/student-program.service';

@Component({
  selector: 'app-semester-registration',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './semester-registration.component.html',
  styleUrl: './semester-registration.component.scss'
})
export class SemesterRegistrationComponent {
  semesterRegistrationGroup!: FormGroup;
  studentPrograms: StudentProgram[] = [];
  studentProgramList: StudentProgram = {}
  programName?: any;
  programList: SelectItem[] = [];
  operationalVerticalList: SelectItem[] = [];
  rowGroupMetadata: any;
  operationalVerticalSubjects: OperationalVerticalSubject[] = [];
  selectedOperationalVerticalSubjects: OperationalVerticalSubject[] = [];
  operationalVerticalSubjectConfigurations: OperationalVerticalSubjectConfiguration[] = [];
  currentSemesterNotRegistred: boolean = false;
  semesterAllreadyRegistred: boolean = false;
  semesterRegistrationSubjects: boolean = false;
  semesterRegistrationButton: boolean = true;
  studentProgramPaperCodeAllocations: StudentProgramPaperCodeAllocation[] = [];
  private currentUserSubject!: BehaviorSubject<UserAccount>;
  msgCurrentSemesterNotRegistred: string = '';
  msgSemesterAlreadyRegistred: string = '';
  msgSemesterNotRegistred: string = '';
  displayAlert: boolean = false;
  isSubmitButtonEnabled: boolean = false;
  dataKey = 'id';
  isLoading: boolean = false;
  isDisplay: boolean = true;
  skeletonValue: number[] = Array(4).fill(1);
  fileterdStudentProgram: any = []
  cols = [
    { field: 'BatchCode', header: 'BatchCode', filterType: 'text' },
    { field: 'SubjectPaperCode', header: 'SubjectPaperCode', filterType: 'text' },
    { field: 'Subject', header: 'Subject', filterType: 'text' },
    { field: 'PaperType', header: 'PaperType', filterType: 'text' },
    { field: 'Credits', header: 'Credits', filterType: 'text' },
    { field: 'Registration Date', header: 'Registration Date', filterType: 'text' },
  ];

  totalNumberOfPaperCodeAllowed: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private studentProgramService: StudentProgramService,
    private operationalVerticalSubjectService: OperationalVerticalSubjectService,
    private operationalVerticalSubjectConfigurationService: OperationalVerticalSubjectConfigurationService,
    private studentProgramPaperCodeAllocationService: StudentProgramPaperCodeAllocationService
  ) { }

  ngOnInit(): void {


    this.initializeSemesterRegistrationGroup();
    this.bindStudentPrograms();
  }

  initializeSemesterRegistrationGroup() {
    this.semesterRegistrationGroup = this.fb.group({
      id: 0,
      programName: ['', Validators.required],
      operationalVerticalName: ['', Validators.required],
      registrationNumber: ['', Validators.required],
    });
  }

  bindStudentPrograms() {
    this.programList = [];

    this.studentProgramService.getStudentProgramList().subscribe({
      next: (x) => {
        this.studentPrograms = x.filter(k => k.status == "PUBLISHED");
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
      }, error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    });
  }


  onProgamChanged(event: any) {
    this.semesterRegistrationGroup.controls['operationalVerticalName'].reset();
    this.operationalVerticalList = [];
    const filteredPrograms = this.studentPrograms.filter(
      (program) => program.status === "PUBLISHED" && program.programId === event.value
    );

    if (filteredPrograms.length > 0) {
      const operationalVerticals = filteredPrograms.map((item: any) => ({
        label: item.operationalVerticalName,
        value: item.operationalVerticalId,
      }));
      this.operationalVerticalList = operationalVerticals.reduce((accumulator: any[], current: any) => {
        if (!accumulator.some((x: any) => x.label === current.label && x.value === current.value)) {
          accumulator.push(current);
        }
        return accumulator;
      }, []);
      this.operationalVerticalList.sort((a, b) => (a.label ?? '').localeCompare(b.label ?? ''));
    }
  }


  onOperationalVerticalChanged(event: any) {
    this.fileterdStudentProgram = this.studentPrograms.filter(k => k.programId == this.semesterRegistrationGroup.value.programName
      && k.operationalVerticalId == event.value);
    this.semesterRegistrationGroup.value.registrationNumber = this.fileterdStudentProgram[0].registrationNumber;
  }
  getCurrentSemesterPapers(academicSessionId: number, programId: number, operationalVerticalId: number) {
    this.isDisplay = false;
    this.displayAlert = false;
    this.isLoading = true
    this.operationalVerticalSubjects = [];
    this.operationalVerticalSubjectConfigurations = [];
    this.selectedOperationalVerticalSubjects = [];
    this.totalNumberOfPaperCodeAllowed = 0;
    this.operationalVerticalSubjectConfigurationService.getByAcademicSession(academicSessionId, programId, operationalVerticalId).subscribe({
      next: (response) => {
        if (response.length == 0) {
          this.isLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No OperationlVertical configuration found for the AcademicSession(' + academicSessionId + '), Program(' + programId + '), OperationalVertical(' + operationalVerticalId + ')', life: 3000 });
          return;
        }

        response.forEach(k => {
          if (k.status === "PUBLISHED") {
            this.totalNumberOfPaperCodeAllowed += k.noOfPaperCodeAllowed ?? 0;
          }
        });

        this.operationalVerticalSubjectConfigurations = response.filter(k => k.status == "PUBLISHED");

        this.getOperationalVerticalSubjectByAcademicSessionIdProgramIdOperationalVerticalId(academicSessionId, programId, operationalVerticalId)
      }, error: (error) => {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    });

  }
  getOperationalVerticalSubjectByAcademicSessionIdProgramIdOperationalVerticalId(academicSessionId: number, programId: number, operationalVerticalId: number) {

    this.operationalVerticalSubjectService.getByAcademicSession(academicSessionId, programId, operationalVerticalId).subscribe({
      next: (response) => {
        if (response.length == 0) {
          this.isLoading = false
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No OperationlVertical subject found for the AcademicSession(' + academicSessionId + '), Program(' + programId + '), OperationalVertical(' + operationalVerticalId + ')', life: 3000 });
          return;

        }


        this.studentProgramPaperCodeAllocationService.getByRegistrationNumber(this.semesterRegistrationGroup.value.registrationNumber, operationalVerticalId).subscribe({
          next: (sppcaResponse) => {
            this.semesterAllreadyRegistred = false;
            if (sppcaResponse.operationalVerticalSubjectResponseDataList) {
              var selectedPaperCodeCount = sppcaResponse.operationalVerticalSubjectResponseDataList.filter(x => x.isSubjectPaperCodeSelected).length;
              this.displayAlert = true;

              if (selectedPaperCodeCount == 0) {
                this.msgSemesterNotRegistred = "Semester registration is pending.";
                this.isSubmitButtonEnabled = true;
              }
              else if (selectedPaperCodeCount == this.totalNumberOfPaperCodeAllowed) {
                this.msgSemesterAlreadyRegistred = "Semester registration has submitted already.";
                this.semesterAllreadyRegistred = true;
                this.isSubmitButtonEnabled = false;
              }
              else {
                this.isSubmitButtonEnabled = true;
                this.msgSemesterNotRegistred = "Semester registration is not submitted for some paper codes. Please check the below paper code and submit.";
              }

              sppcaResponse.operationalVerticalSubjectResponseDataList = sppcaResponse.operationalVerticalSubjectResponseDataList.filter(x => x.status == 'PUBLISHED');

              sppcaResponse.operationalVerticalSubjectResponseDataList.forEach(d => {

                d.subjectType = {
                  id: d.subjectTypeId,
                  name: d.subjectTypeName
                };

                this.operationalVerticalSubjectConfigurations.forEach(v => {
                  var subjectTypeWiseOVSList = response.filter(b => b.subjectTypeId == v.subjectTypeId);
                  d.isSelectionAllowed = true;
                });

                d.isSubjectPaperCodeSelected = (sppcaResponse.operationalVerticalSubjectResponseDataList || [])
                  .filter(x => x.status == 'PUBLISHED' && x.subjectPaperCodeId == d.subjectPaperCodeId)[0]?.isSubjectPaperCodeSelected ?? false;
              });

              this.operationalVerticalSubjects = sppcaResponse.operationalVerticalSubjectResponseDataList.filter(k => k.status == "PUBLISHED");
              this.isLoading = false;
            }
          }, error: (error) => {
            this.isLoading = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
          }
        });
      }
    });
  }

  onSort() {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    this.rowGroupMetadata = {};

    if (this.operationalVerticalSubjects) {
      for (let i = 0; i < this.operationalVerticalSubjects.length; i++) {
        const rowData = this.operationalVerticalSubjects[i];
        const semRegs = rowData.subjectType?.name;
        if (!semRegs) {
          console.warn('subjectType.name is undefined for rowData:', rowData);
          continue;
        }

        if (i === 0) {
          this.rowGroupMetadata[semRegs] = { index: 0, size: 1 };
        } else {
          const previousRowData = this.operationalVerticalSubjects[i - 1];
          const previousRowGroup = previousRowData.subjectType?.name;

          if (semRegs === previousRowGroup) {
            this.rowGroupMetadata[semRegs].size++;
          } else {
            this.rowGroupMetadata[semRegs] = { index: i, size: 1 };
          }
        }
      }
    }

  }

  submit() {
    var valid = 1;
    this.studentProgramPaperCodeAllocations = [];
    const currentUserJsonString = localStorage.getItem('currentUser') ?? "";
    if (currentUserJsonString) {
      const loginResponse = JSON.parse(currentUserJsonString);

      this.operationalVerticalSubjects.forEach(k => {

        var studentProgramPaperCodeAllocation = {
          studentId: loginResponse.applicationUser.userName,
          registrationNumber: this.semesterRegistrationGroup.value.registrationNumber,
          operationalVerticalSubjectId: k.id,
          academicSessionId: k.academicSessionId,
          programId: k.programId,
          operationalVerticalId: k.operationalVerticalId,
          subjectId: k.subjectId,
          subjectTypeId: k.subjectTypeId,
          paperTypeId: k.paperTypeId,
          subjectPaperCodeId: k.subjectPaperCodeId,
          batchCode: k.batchCode,
          status: k.isSubjectPaperCodeSelected ? "PUBLISHED" : "DELETED",
          createdDate: new Date(),
          modifiedDate: new Date()
        }
        this.studentProgramPaperCodeAllocations.push(studentProgramPaperCodeAllocation);
      });


      if (this.studentProgramPaperCodeAllocations) {
        this.studentProgramPaperCodeAllocationService.studentProgramPaperCodeAllocationAddMultiple(this.studentProgramPaperCodeAllocations).subscribe({
          next: (j) => {
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'submitted successfully...' });
            this.initializeSemesterRegistrationGroup();
            this.operationalVerticalList = [];
            this.semesterRegistrationGroup.controls['programName'].reset();
            this.semesterRegistrationGroup.controls['operationalVerticalName'].reset();
            this.semesterRegistrationGroup.controls['registrationNumber'].reset();
            this.selectedOperationalVerticalSubjects = [];
            this.operationalVerticalSubjects = [];

            this.studentProgramService.getStudentProgramList().subscribe({
              next: (x) => {
                this.studentPrograms = x.filter(k => k.status == "PUBLISHED");
              }, error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
              }
            });

            this.displayAlert = false;
            this.isSubmitButtonEnabled = false;

          }, error: (error) => {
            this.displayAlert = true;
            this.isSubmitButtonEnabled = true;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
          }
        });
      }
    }
    else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: "No selected paper to submit", life: 3000 });
    }
  }

}
