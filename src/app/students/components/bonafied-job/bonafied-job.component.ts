import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { MessageService, SelectItem } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import { ProgramExpando } from 'src/app/shared/models/commons/expandos';
import { OperationalVerticalExpando } from 'src/app/shared/models/finance-Pro/student-concession-category-fee-setup-search-response';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { EKalyanBonafide } from 'src/app/shared/models/students/e-kalyan-bonafide';
import { StudentExamination } from 'src/app/shared/models/students/student-examination';
import { StudentExaminationResponse } from 'src/app/shared/models/students/student-examination-response';
import { CertificatesService } from '../../services/certificates.service';
import { StudentProgramService } from '../../services/student-program.service';

@Component({
  selector: 'app-bonafied-job',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './bonafied-job.component.html',
  styleUrl: './bonafied-job.component.scss'
})
export class BonafiedJobComponent {
  eKalyanBonafideFormGroup!: FormGroup;
  programList: SelectItem[] = [];
  operationalVerticalList: SelectItem[] = [];
  studentExaminationResponse!: StudentExaminationResponse;
  studentPrograms: StudentProgram[] = [];
  studentExamination: StudentExamination[] = [];
  programExpando: ProgramExpando[] = [];
  operationalVerticalExpando: OperationalVerticalExpando[] = [];
  eKalyanBonafide!: EKalyanBonafide;
  downloadEKalyanBonafideLink!: SafeUrl | null;
  list: any[] = []
  list2: any[] = []
  isLoading: boolean = false;
  skeletonValue: number[] = Array(4).fill(1);


  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private certificatesService: CertificatesService,
    private studentProgramService: StudentProgramService) { }

  ngOnInit(): void {
    this.initializeEKalyanBonafideFormGroup();
    this.bindStudentPrograms();
  }
  initializeEKalyanBonafideFormGroup() {
    this.eKalyanBonafideFormGroup = this.fb.group({
      id: 0,
      registrationNumber: [''],
      programId: ['', Validators.required],
      operationalVerticalId: ['', Validators.required]
    });
  }
  bindStudentPrograms() {
    this.programList = [];
    this.operationalVerticalExpando = [];
    this.studentProgramService.getStudentProgramList().subscribe({
      next: (x) => {
        this.studentPrograms = x.filter(k => k.status == "PUBLISHED");

        // Populate the lists
        for (let i = 0; i < this.studentPrograms.length; i++) {
          this.list.push({ label: this.studentPrograms[i].programName, value: this.studentPrograms[i].programId });
          this.list2.push({ label: this.studentPrograms[i].operationalVerticalName, value: this.studentPrograms[i].operationalVerticalId });
        }

        // Process programList
        this.programList = this.list.reduce((accumulator, current) => {
          if (!accumulator.some((x: { label: any; value: any; }) => x.label == current.label && x.value == current.value)) {
            accumulator.push(current);
          }
          return accumulator;
        }, []);

        // Process operationalVerticalList
        this.operationalVerticalList = this.list2.reduce((accumulator, current) => {
          if (!accumulator.some((x: { label: any; value: any; }) => x.label == current.label && x.value == current.value)) {
            accumulator.push(current);
          }
          return accumulator;
        }, []);

        // Sort operationalVerticalList
        this.operationalVerticalList.sort((a, b) => {
          return a.value as number - (b.value as number); // Ensure the type is compatible for subtraction
        });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    });
  }
  onProgamChanged(event: any) {
    if (event.value) {
      this.eKalyanBonafide = {};
      this.eKalyanBonafide.registrationNumber = this.studentPrograms[0].registrationNumber;
      this.eKalyanBonafide.programId = event.value;
    }
  }
  onOperationalVerticalChanged(event: any) {
    if (event.value) {
      this.eKalyanBonafide.operationalVerticalId = event.value;
    }
  }
  SearchResult() {
    this.isLoading = true;
    if (this.eKalyanBonafide) {
      this.downloadEKalyanBonafideLink = null
      this.certificatesService.downloadStudentBonafideJobByStudentCertificateRequest(this.eKalyanBonafide).subscribe(data => {
        this.downloadEKalyanBonafideLink = data.result;
        this.isLoading = false
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      });
    }
  }

}
