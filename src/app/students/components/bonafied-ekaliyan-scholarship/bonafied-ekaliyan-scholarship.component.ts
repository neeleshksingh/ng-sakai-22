import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { MessageService, SelectItem } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import { OperationalVerticalExpando, ProgramExpando } from 'src/app/shared/models/commons/expandos';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { EKalyanScholarship } from 'src/app/shared/models/students/e-kalyan-bonafide';
import { StudentExamination } from 'src/app/shared/models/students/student-examination';
import { StudentExaminationResponse } from 'src/app/shared/models/students/student-examination-response';
import { CertificatesService } from '../../services/certificates.service';
import { StudentProgramService } from '../../services/student-program.service';

@Component({
  selector: 'app-bonafied-ekaliyan-scholarship',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './bonafied-ekaliyan-scholarship.component.html',
  styleUrl: './bonafied-ekaliyan-scholarship.component.scss'
})
export class BonafiedEKaliyanScholarshipComponent {
  eKalyanScholarshipFormGroup!: FormGroup;
  // programList: SelectItem[];
  programList: SelectItem[] = [];
  operationalVerticalList: SelectItem[] = [];
  studentExaminationResponse!: StudentExaminationResponse;
  studentPrograms: StudentProgram[] = [];
  studentExamination: StudentExamination[] = [];
  programExpando: ProgramExpando[] = [];
  operationalVerticalExpando: OperationalVerticalExpando[] = [];
  eKalyanScholarship!: EKalyanScholarship;
  downloadEKalyanScholarshipLink!: SafeUrl | null;
  list: any[] = [];
  list2: any[] = []
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
  partnerCode = this.currentUser.applicationUser.partnerCode;

  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private certificatesService: CertificatesService,
    private studentProgramService: StudentProgramService,
    private http: HttpClient
  ) { }


  ngOnInit(): void {
    this.initializeEKalyanScholarshipFormGroup();
    this.bindStudentPrograms();
  }
  initializeEKalyanScholarshipFormGroup() {
    this.eKalyanScholarshipFormGroup = this.fb.group({
      id: 0,
      registrationNumber: [''],
      operationalVerticalId: ['', Validators.required]
    });
  }
  bindStudentPrograms() {

    this.operationalVerticalExpando = [];
    this.studentProgramService.getStudentProgramList().subscribe({
      next: (x) => {
        this.studentPrograms = x.filter(k => k.status == "PUBLISHED");
        for (let i = 0; i < this.studentPrograms.length; i++) {
          this.list.push({ label: this.studentPrograms[i].programName, value: this.studentPrograms[i].programId });
          this.list2.push({ label: this.studentPrograms[i].operationalVerticalName, value: this.studentPrograms[i].operationalVerticalId });
        }
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
  onOperationalVerticalChanged(event: any) {
    if (event.value) {
      this.eKalyanScholarship = {};
      this.eKalyanScholarship.registrationNumber = this.studentPrograms[0].registrationNumber;
      this.eKalyanScholarship.operationalVerticalId = event.value;
    }
  }
  SearchResult() {
    if (this.eKalyanScholarship) {
      this.downloadEKalyanScholarshipLink = null
      this.certificatesService.downloadEKalyanScholarshipByStudentCertificateRequest(this.eKalyanScholarship).subscribe(data => {
        this.downloadEKalyanScholarshipLink = data.result;
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      });
    }
  }

  downLoadMandatoryForm() {
    const pdfUrlDeclarationForm = `/assets/Partner_Documents/${this.partnerCode}/DeclarationForm-EKalyan.pdf`;
    this.http.get(pdfUrlDeclarationForm, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'DeclarationForm-EKalyan.pdf';
      link.click();

      URL.revokeObjectURL(blobUrl);
    });

    const pdfUrlAffidavit = `/assets/Partner_Documents/${this.partnerCode}/AFFIDAVIT-For-E-KalyanScholarship.pdf`;
    this.http.get(pdfUrlAffidavit, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Affidavit-For-EKalyan.pdf';
      link.click();

      URL.revokeObjectURL(blobUrl);
    });
  }
}
