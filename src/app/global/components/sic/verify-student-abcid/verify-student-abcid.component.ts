import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AbcService } from 'src/app/global/services/knowledge-stands/abc.service';
import { SharedModule } from '@/shared.module';
import { Student } from 'src/app/shared/models/bigleads/student';
import { Abc } from 'src/app/shared/models/finance-Pro/abc';

@Component({
  selector: 'app-verify-student-abcid',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './verify-student-abcid.component.html',
  styleUrl: './verify-student-abcid.component.scss'
})
export class VerifyStudentABCIdComponent implements OnInit, OnDestroy {
  studentForm!: FormGroup;
  abcId: string = '';
  student: Student = {};
  isLoading: boolean = false;
  verificationResult: 'success' | 'error' | null = null;
  errorMessage: string = '';
  // studentDetails: { abcId: string; name: string; institution: string; course: string; status: string } | null = null;
  studentDetails: Abc | null = null;
  @Input() studentId: string = '';
  private routeSubscription!: Subscription;
  constructor(
    private messageService: MessageService,
    private abcService: AbcService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.routeSubscription = this.route.params.subscribe(params => {
      this.studentId = params['studentId']; // Update studentId from route
      this.loadStudentData(); // Load data whenever route changes
    });
  }

  initializeFormGroup() {
    this.studentForm = this.fb.group({
      abcId: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private loadStudentData(): void {
    const studentDataRaw = sessionStorage.getItem(`basic_student_${this.studentId}`) || sessionStorage.getItem(`student_${this.studentId}`);
    const studentData = studentDataRaw ? JSON.parse(studentDataRaw) : null;

    if (studentData?.abcid) {
      this.abcId = studentData.abcid;
      this.studentForm.patchValue({
        abcId: studentData.abcid
      });
    } else {
      // Clear form if no data found
      this.abcId = '';
      this.studentForm.patchValue({
        abcId: ''
      });
    }
  }

  async verifyAbcId(): Promise<void> {
    if (!this.studentForm.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please enter an ABC ID'
      });
      return;
    }

    let abcId = this.studentForm.value.abcId;

    this.isLoading = true;
    this.verificationResult = null;
    this.errorMessage = '';
    this.studentDetails = null;

    // Simulate API call
    this.abcService.verifyAbcApaarId(abcId, this.studentId).subscribe({
      next: (response) => {
        if (response) {
          this.verificationResult = 'success';
          this.studentDetails = response;
          this.isLoading = false;
        }
        else {
          this.verificationResult = 'error';
          this.isLoading = false;

        }
      },
      error: (error) => {
        // console.error('Error fetching student abc account details:', err);
        this.verificationResult = error;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch student ABC account details' + error, life: 3000 });
        this.isLoading = false;
      }
    });

  }

  clearForm(): void {
    this.initializeFormGroup();
    this.verificationResult = null;
    this.errorMessage = '';
    this.studentDetails = null;
  }
}

