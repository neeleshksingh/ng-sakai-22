import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { MessageService, SelectItem } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import { OperationalVerticalExpando, ProgramExpando } from 'src/app/shared/models/commons/expandos';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { EKalyanBonafide } from 'src/app/shared/models/students/e-kalyan-bonafide';
import { StudentExamination } from 'src/app/shared/models/students/student-examination';
import { StudentExaminationResponse } from 'src/app/shared/models/students/student-examination-response';
import { CertificatesService } from '../../services/certificates.service';
import { StudentProgramService } from '../../services/student-program.service';

@Component({
  selector: 'app-bonafied-fees',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './bonafied-fees.component.html',
  styleUrl: './bonafied-fees.component.scss'
})
export class BonafiedFeesComponent {
  bonafideFeesFormGroup!: FormGroup;
  programList: SelectItem[] = [];
  operationalVerticalList: SelectItem[] = [];
  studentExaminationResponse!: StudentExaminationResponse;
  studentPrograms: StudentProgram[] = [];
  studentExamination: StudentExamination[] = [];
  programExpando: ProgramExpando[] = [];
  operationalVerticalExpando: OperationalVerticalExpando[] = [];
  eKalyanBonafide!: EKalyanBonafide;
  downloadEKalyanBonafideLink!: SafeUrl | null;
  list: any[] = [];
  list2: any[] = []

  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private certificatesService: CertificatesService,
    private studentProgramService: StudentProgramService) { }

  ngOnInit(): void {
    this.initializebonafideFeesFormGroup();
    this.bindStudentPrograms();
  }
  initializebonafideFeesFormGroup() {
    this.bonafideFeesFormGroup = this.fb.group({
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
        for (let i = 0; i < this.studentPrograms.length; i++) {
          this.list.push({ label: this.studentPrograms[i].programName, value: this.studentPrograms[i].programId });
          this.list2.push({ label: this.studentPrograms[i].operationalVerticalName, value: this.studentPrograms[i].operationalVerticalId });
        }
        this.programList = this.list.reduce((accumulator, current) => {
          if (!accumulator.some((x: { label: any; value: any; }) => x.label == current.label && x.value == current.value)) {
            accumulator.push(current);
          }
          return accumulator;
        }, []);
        this.operationalVerticalList = this.list2.reduce((accumulator, current) => {
          if (!accumulator.some((x: { label: any; value: any; }) => x.label == current.label && x.value == current.value)) {
            accumulator.push(current);
          }
          return accumulator;
        }, []);
        this.operationalVerticalList.sort((a, b) => {
          return a.value as number - (b.value as number);
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
    if (this.eKalyanBonafide) {
      this.downloadEKalyanBonafideLink = null
      this.certificatesService.downloadStudentBonafideFeesByStudentCertificateRequest(this.eKalyanBonafide).subscribe(data => {
        this.downloadEKalyanBonafideLink = data.result;
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      });
    }
  }

}
