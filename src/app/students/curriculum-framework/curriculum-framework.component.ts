import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { SubjectPaperCodeModuleSubModuleExpando } from 'src/app/shared/models/students/curriculam-framework';
import { OperationalVerticalSubject } from 'src/app/shared/models/students/operational-vertical-subject';
import { CurriculumFrameworkService } from '../services/curriculum-framework.service';
import { StudentProgramService } from '../services/student-program.service';

@Component({
  selector: 'app-curriculum-framework',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './curriculum-framework.component.html',
  styleUrl: './curriculum-framework.component.scss'
})
export class CurriculumFrameworkComponent {
  curriculumFrameworkFormGroup!: FormGroup;
  studentPrograms: StudentProgram[] = [];
  studentProgramList: StudentProgram = {}
  academicSessionList: SelectItem[] = [];
  filteredSubjectPapers: any[] = []
  SubjectModule: any[] = []
  programName?: any;
  programList: SelectItem[] = [];
  subjectList: SelectItem[] = [];
  operationalVerticalList: SelectItem[] = [];
  operationalVerticalSubjects: OperationalVerticalSubject[] = [];
  selectedOperationalVerticalSubjects: OperationalVerticalSubject[] = [];
  dataKey = 'id';
  subjectName: any = []
  isLoading: boolean = false;
  isDisplay: boolean = true;
  skeletonValue: number[] = Array(4).fill(1);
  fileterdStudentProgram: any = [];
  operationalVerticalSubject: any[] = [];
  version: string = '';
  subjectPaperCodeName: string = '';
  subjectPaperCodeModuleSubModuleExpando: SubjectPaperCodeModuleSubModuleExpando[] = [];
  emptyResponse: boolean = true;
  activeSubjectId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private studentProgramService: StudentProgramService,
    private curriculamFrameworkService: CurriculumFrameworkService
  ) { }

  ngOnInit(): void {


    this.initializeSemesterRegistrationGroup();
    this.GetStudentProgramDetails();
    this.bindStudentPrograms();
  }

  initializeSemesterRegistrationGroup() {
    this.curriculumFrameworkFormGroup = this.fb.group({
      id: 0,
      academicSessionId: ['', Validators.required],
      programName: ['', Validators.required],
      operationalVerticalName: ['', Validators.required],
      registrationNumber: ['', Validators.required],
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
    this.curriculumFrameworkFormGroup.controls['operationalVerticalName'].reset();
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
    this.fileterdStudentProgram = this.studentPrograms.filter(k => k.programId == this.curriculumFrameworkFormGroup.value.programName
      && k.operationalVerticalId == event.value);
    this.curriculumFrameworkFormGroup.value.registrationNumber = this.fileterdStudentProgram[0].registrationNumber;
  }
  getOperationalVerticalSubjects(academicSessionId: number, programId: number, operationalVerticalId: number) {
    this.isLoading = true
    this.curriculamFrameworkService.getOperationalVerticalSubject(academicSessionId, programId, operationalVerticalId).subscribe({
      next: (response) => {
        this.operationalVerticalSubject = response;
        this.filteredSubjectPapers = response;
        this.onViewRequest(response[0].subjectPaperCodeId, response[0].subjectName)
        this.isLoading = false;
      }, error: (error) => {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    });

  }
  onViewRequest(subjectPaperCodeId: number, subjectName: string) {
    if (subjectPaperCodeId) {
      this.activeSubjectId = subjectPaperCodeId;
      this.version = 'v1.0';
      this.curriculamFrameworkService.getModuleSubModule(subjectPaperCodeId, this.version).subscribe({
        next: (response) => {
          this.subjectPaperCodeName = subjectName;
          if (response && Array.isArray(response) && response.length === 0) {
            this.emptyResponse = true;
            this.SubjectModule = [];
            this.operationalVerticalSubject = [];
            this.subjectPaperCodeModuleSubModuleExpando = [];
          } else {
            this.emptyResponse = false;
            this.SubjectModule = response;
            this.operationalVerticalSubject = response;
            this.subjectPaperCodeModuleSubModuleExpando = response;
            this.subjectPaperCodeName = subjectName;
          }
          this.isLoading = false;
          this.isDisplay = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
            life: 3000,
          });
        },
      });
    }
  }

}
