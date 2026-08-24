import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { Student } from 'src/app/shared/models/students/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-verify-apaar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './verify-apaar.component.html',
  styleUrl: './verify-apaar.component.scss'
})
export class VerifyApaarComponent implements OnInit {
  readonly verifyForm = this.formBuilder.nonNullable.group({
    abcId: ['', [Validators.required]],
    studentId: ['', [Validators.required]]
  });

  isLoading = false;
  verificationResponse: unknown = null;
  verificationSucceeded: boolean | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const { studentId, abcId } = this.getCurrentStudentContext();

    this.verifyForm.patchValue({
      studentId,
      abcId
    });

    if (!studentId || !abcId) {
      this.studentService.GetStudentProfile().subscribe({
        next: (profile: Student) => {
          this.verifyForm.patchValue({
            studentId: this.verifyForm.controls.studentId.value || profile.studentId || '',
            abcId: this.verifyForm.controls.abcId.value || profile.abcid || ''
          });
        },
        error: () => {
          // Keep login-based values if profile lookup fails.
        }
      });
    }
  }

  verifyApaar(): void {
    if (this.verifyForm.invalid) {
      this.verifyForm.markAllAsTouched();
      return;
    }

    const abcId = this.verifyForm.controls.abcId.value.trim();
    const studentId = this.verifyForm.controls.studentId.value.trim();
    this.isLoading = true;
    this.verificationResponse = null;
    this.verificationSucceeded = null;

    this.studentService.VerifyApaar(abcId, studentId).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.verificationResponse = response;
        this.verificationSucceeded = this.inferVerificationState(response);

        if (this.verificationSucceeded === false) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Verification Result',
            detail: 'ABC ID verification returned a non-verified response.',
            life: 3000
          });
          return;
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Verification Complete',
          detail: 'ABC ID verification request completed successfully.',
          life: 3000
        });
      },
      error: (error: { error?: { message?: string } }) => {
        this.isLoading = false;
        this.verificationResponse = null;
        this.verificationSucceeded = null;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error?.message ?? 'Failed to verify ABC ID.',
          life: 3000
        });
      }
    });
  }

  private getCurrentStudentContext(): { studentId: string; abcId: string } {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      return { studentId: '', abcId: '' };
    }

    try {
      const parsedUser = JSON.parse(storedUser) as LoginResponse & Record<string, unknown>;
      const applicationUser = parsedUser.applicationUser as Record<string, unknown> | undefined;
      const studentDetails = parsedUser['studentDetails'] as Record<string, unknown> | undefined;

      const studentId = (parsedUser.applicationUser?.userName ?? '').toString();
      const abcId = this.pickStringValue(
        [
          parsedUser,
          applicationUser,
          studentDetails
        ],
        ['abcid', 'abcId', 'ABCID', 'ABCId']
      );

      return { studentId, abcId };
    } catch {
      return { studentId: '', abcId: '' };
    }
  }

  private pickStringValue(
    sources: Array<Record<string, unknown> | undefined>,
    keys: string[]
  ): string {
    for (const source of sources) {
      if (!source) {
        continue;
      }

      for (const key of keys) {
        const value = source[key];
        if (typeof value === 'string' && value.trim()) {
          return value.trim();
        }
      }
    }

    return '';
  }

  private inferVerificationState(response: unknown): boolean | null {
    if (typeof response === 'boolean') {
      return response;
    }

    if (typeof response === 'string') {
      const normalized = response.trim().toLowerCase();
      if (normalized === 'true' || normalized.includes('verified')) {
        return true;
      }
      if (normalized === 'false' || normalized.includes('not verified')) {
        return false;
      }
      return null;
    }

    if (response && typeof response === 'object') {
      const data = response as Record<string, unknown>;
      const candidateKeys = ['isVerified', 'verified', 'isSuccess', 'success'];
      for (const key of candidateKeys) {
        const value = data[key];
        if (typeof value === 'boolean') {
          return value;
        }
      }
    }

    return null;
  }
}