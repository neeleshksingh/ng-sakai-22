import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SharedModule } from '@/shared.module';
import { StudentService } from '../../services/student.service';
import { StudentProgramService } from '../../services/student-program.service';
import { filter, finalize, Subject, takeUntil } from 'rxjs';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Student } from 'src/app/shared/models/students/student';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { AcademicSessionProgramService } from '../../services/academic-session-program.service';
import { AcademicSessionProgram } from 'src/app/shared/models/cloudbytes/academic-session-program';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { StudentProgramChangeRequestService } from '../../services/student-program-change-request.service';
import { StudentProgramChangeRequestResponse } from 'src/app/shared/models/mindspark/student-program-change-request';
import { StudentProfileActions } from 'src/app/store/actions/student-profile.actions';
import { StudentProgramActions } from 'src/app/store/actions/student-program.actions';
import { selectStudentProfile } from 'src/app/store/selectors/student-profile.selectors';
import { selectStudentPrograms } from 'src/app/store/selectors/student-program.selectors';
import lottie, { AnimationItem } from 'lottie-web';

export interface ProgramChangeProgressStep {
  label: string;
  icon: string;
  completed: boolean;
  active: boolean;
  rejected: boolean;
  dateTime?: Date;
}

@Component({
  selector: 'app-student-program-change-request',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-program-change-request.component.html',
  styleUrl: './student-program-change-request.component.scss'
})
export class StudentProgramChangeRequestComponent implements OnInit, OnDestroy {
  componentName: string = 'Program Change Request';
  studentProgramChangeRequestForm: FormGroup = new FormGroup({});
  studentProfile: Student = new Student();
  private destroy$ = new Subject<void>();
  isLoading = true;
  private pendingRequests = 0;
  isProgramChangeEligible = false;
  eligibilityMessage = 'Program change is available only for 1st semester (Regular) and 3rd semester (Lateral) students.';
  private readonly eligibleSemesters = new Set<number>([1, 3]);
  studentPrograms: StudentProgram[] = [];
  currentAcademicSessionList: SelectItem[] = [];
  currentSemesterList: SelectItem[] = [];
  currentProgramList: SelectItem[] = [];
  newAcademicSessionList: SelectItem[] = [];
  newSemesterList: SelectItem[] = [];
  newProgramList: SelectItem[] = [];
  registrationNumberList: SelectItem[] = [];
  academicSessionProgramList: AcademicSessionProgram[] = [];
  studentProgramChangeRequest: StudentProgramChangeRequestResponse[] = [];
  progressSteps: ProgramChangeProgressStep[] = [];
  progressPercentage = 0;
  isWorkflowCompleted = false;
  showCompletionAnimation = false;
  showSuccessCard = false;
  private completionAnimation?: AnimationItem;
  private completionAnimationPlayed = false;

  @ViewChild('completionAnimationContainer')
  set completionAnimationContainer(container: ElementRef<HTMLDivElement> | undefined) {
    if (!container
      || !this.showCompletionAnimation
      || this.completionAnimation
      || this.completionAnimationPlayed) {
      return;
    }

    this.completionAnimationPlayed = true;
    this.completionAnimation = lottie.loadAnimation({
      container: container.nativeElement,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: 'assets/animations/success%20confetti.json',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet'
      }
    });
    this.completionAnimation.addEventListener('complete', this.onCompletionAnimationComplete);
  }

  get latestProgramChangeRequest(): StudentProgramChangeRequestResponse | null {
    return this.studentProgramChangeRequest.length
      ? this.studentProgramChangeRequest[this.studentProgramChangeRequest.length - 1]
      : null;
  }

  get hasExistingProgramChangeRequest(): boolean {
    return !!this.latestProgramChangeRequest;
  }

  get isProgramChangeRequestRejected(): boolean {
    return this.progressSteps.some(step => step.rejected);
  }

  isSubmittedRequestReadonly = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private studentProgramService: StudentProgramService,
    private messageService: MessageService,
    private academicSessionProgramService: AcademicSessionProgramService,
    private utilityService: UtilityService,
    private confirmationService: ConfirmationService,
    private studentProgramChangeRequestService: StudentProgramChangeRequestService,
    private ngZone: NgZone,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.setupEligibilityWatcher();
    this.getStudentProfile();
    this.getAcademicSessionProgramList();
  }

  private setupEligibilityWatcher(): void {
    this.studentProgramChangeRequestForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateProgramChangeEligibility();
      });
  }

  initializeForm() {
    this.studentProgramChangeRequestForm = this.fb.group({
      id: [0],
      registrationNumber: ['', Validators.required],
      currentAcademicSessionId: ['', Validators.required],
      currentProgramId: ['', Validators.required],
      currentSemesterId: ['', Validators.required],
      newAcademicSessionId: ['', Validators.required],
      newProgramId: ['', Validators.required],
      newSemesterId: ['', Validators.required],
      reasonForChange: ['', Validators.required],
      supportingDocuments: [''],
      isEligible: [true],
      isReviewed: [false],
      reviewedBy: [null],
      reviewComments: [null],
      reviewedDateTime: [null],
      isApproved: [false],
      approvedBy: [null],
      approvalComments: [null],
      approvedDateTime: [null],
      isStudentProgramUpdated: [false],
      studentProgramUpdatedBy: [null],
      studentProgramUpdatedDateTime: [null],
      isFeeMasterUpdated: [false],
      feeMasterUpdatedBy: [null],
      feeMasterUpdatedDateTime: [null],
      isFeeReceiptCancelled: [false],
      feeReceiptCancelledBy: [null],
      feeReceiptCancelledDateTime: [null],
      isFeeReceiptReissued: [false],
      feeReceiptReissuedBy: [null],
      feeReceiptReissuedDateTime: [null],
      status: ['PUBLISHED', Validators.required],

      createdBy: [''],
      createdDate: [''],
      modifiedBy: [''],
      modifiedDate: [''],
    })
  };

  /**
   * Toggle flag for NgRx Store vs Direct HTTP API Service calls.
   * Set useNgRxStore = false if you wish to rollback to direct HTTP API service calls.
   */
  private readonly useNgRxStore = true;

  getStudentProfile() {
    this.startLoading();

    if (this.useNgRxStore) {
      // ─── NgRx Store Implementation ──────────────────────────────────────
      this.store.dispatch(StudentProfileActions.loadStudentProfile());
      this.store.select(selectStudentProfile)
        .pipe(
          takeUntil(this.destroy$),
          filter((profile): profile is Student => !!profile)
        )
        .subscribe({
          next: data => {
            this.stopLoading();
            this.studentProfile = data;
            this.getStudentProgram();
          }, error: error => {
            this.stopLoading();
            this.errorMessage(error);
          }
        });
    } else {
      // ─── Original Direct API Service Call (Rollback Path) ────────────────
      this.studentService.GetStudentProfile()
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.stopLoading())
        )
        .subscribe({
          next: data => {
            this.studentProfile = data;
            this.getStudentProgram();
          }, error: error => {
            this.errorMessage(error);
          }
        });
    }
  }

  getStudentProgram() {
    this.startLoading();

    if (this.useNgRxStore) {
      // ─── NgRx Store Implementation ──────────────────────────────────────
      this.store.dispatch(StudentProgramActions.loadStudentPrograms());
      this.store.select(selectStudentPrograms)
        .pipe(
          takeUntil(this.destroy$),
          filter(programs => programs.length > 0)
        )
        .subscribe({
          next: data => {
            this.stopLoading();
            this.studentPrograms = data.filter(program =>
              program.isCurrentOperationalVertical === true &&
              this.hasValidStartingSemester(program, data)
            );

            this.registrationNumberList = this.utilityService.getFilteredSelectItems(
              this.studentPrograms,
              'registrationNumber',
              'registrationNumber'
            );
            this.currentAcademicSessionList = this.utilityService.getFilteredSelectItems(
              this.studentPrograms,
              'academicSessionName',
              'academicSessionId'
            );
            this.currentProgramList = this.utilityService.getFilteredSelectItems(
              this.studentPrograms,
              'programName',
              'programId'
            );
            this.currentSemesterList = this.utilityService.getFilteredSelectItems(
              this.studentPrograms,
              'operationalVerticalName',
              'operationalVerticalId'
            );

            this.patchCurrentProgramDetails();
          }, error: error => {
            this.stopLoading();
            this.errorMessage(error);
          }
        });
    } else {
      // ─── Original Direct API Service Call (Rollback Path) ────────────────
      this.studentProgramService.getStudentProgramList()
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.stopLoading())
        )
        .subscribe({
          next: data => {
            this.studentPrograms = data.filter(program =>
              program.isCurrentOperationalVertical === true &&
              this.hasValidStartingSemester(program, data)
            );

            this.registrationNumberList = this.utilityService.getFilteredSelectItems(
              this.studentPrograms,
              'registrationNumber',
              'registrationNumber'
            );
            this.currentAcademicSessionList = this.utilityService.getFilteredSelectItems(
              this.studentPrograms,
              'academicSessionName',
              'academicSessionId'
            );
            this.currentProgramList = this.utilityService.getFilteredSelectItems(
              this.studentPrograms,
              'programName',
              'programId'
            );
            this.currentSemesterList = this.utilityService.getFilteredSelectItems(
              this.studentPrograms,
              'operationalVerticalName',
              'operationalVerticalId'
            );

            this.patchCurrentProgramDetails();
          }, error: error => {
            this.errorMessage(error);
          }
        });
    }
  }

  private hasValidStartingSemester(currentProgram: StudentProgram, allPrograms: StudentProgram[]): boolean {
    const semesterIds = new Set(
      allPrograms
        .filter(program =>
          program.registrationNumber === currentProgram.registrationNumber &&
          program.academicSessionId === currentProgram.academicSessionId &&
          program.programId === currentProgram.programId
        )
        .map(program => program.operationalVerticalId)
        .filter((semesterId): semesterId is number => semesterId !== undefined)
    );

    const isLateral = semesterIds.has(3) && !semesterIds.has(1) && !semesterIds.has(2);
    const startingSemesterId = isLateral ? 3 : 1;

    return semesterIds.has(startingSemesterId);
  }

  private patchCurrentProgramDetails(): void {
    const currentDetails = {
      registrationNumber: '',
      currentAcademicSessionId: '',
      currentProgramId: '',
      currentSemesterId: ''
    };

    if (this.studentPrograms.length > 0) {
      const currentProgram = this.studentPrograms[0];

      Object.assign(currentDetails, {
        registrationNumber: currentProgram.registrationNumber ?? '',
        currentAcademicSessionId: currentProgram.academicSessionId ?? '',
        currentProgramId: currentProgram.programId ?? '',
        currentSemesterId: currentProgram.operationalVerticalId ?? ''
      });
    }

    this.studentProgramChangeRequestForm.patchValue(currentDetails);
    this.updateProgramChangeEligibility();
    this.getStudentProgramChangeRequestByRegistrationNumber(currentDetails.registrationNumber);

  }

  private updateProgramChangeEligibility(): void {
    const currentSemesterId = Number(this.studentProgramChangeRequestForm.get('currentSemesterId')?.value);
    this.isProgramChangeEligible = this.eligibleSemesters.has(currentSemesterId);

    if (this.isProgramChangeEligible) {
      this.eligibilityMessage = '';
      return;
    }

    const currentSemesterName = this.getCurrentSemesterName(currentSemesterId);

    if (currentSemesterName) {
      this.eligibilityMessage = `Not eligible for program change. Current semester is ${currentSemesterName}. Program change is allowed only for 1st semester (Regular) and 3rd semester (Lateral) students.`;
      return;
    }

    this.eligibilityMessage = 'Not eligible for program change. Program change is allowed only for 1st semester (Regular) and 3rd semester (Lateral) students.';
  }

  private getCurrentSemesterName(currentSemesterId: number): string {
    if (!currentSemesterId) {
      return '';
    }

    const semesterOption = this.currentSemesterList.find(option => Number(option.value) === currentSemesterId);
    return (semesterOption?.label ?? '').toString().trim();
  }

  getAcademicSessionProgramList() {
    this.startLoading();
    this.academicSessionProgramService.getAll()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.stopLoading())
      )
      .subscribe({
        next: (data) => {
          this.academicSessionProgramList = data.filter((x) => x.status === 'PUBLISHED');
          this.newAcademicSessionList = this.utilityService.getFilteredSelectItems(
            this.academicSessionProgramList,
            'academicSessionName',
            'academicSessionId'
          );
          if (this.hasExistingProgramChangeRequest) {
            this.applySubmittedRequestState();
          }
        }, error: error => {
          this.errorMessage(error);
        }
      })
  }

  private startLoading(): void {
    this.pendingRequests += 1;
    this.isLoading = true;
  }

  private stopLoading(): void {
    this.pendingRequests = Math.max(0, this.pendingRequests - 1);
    this.isLoading = this.pendingRequests > 0;
  }

  onChangeNewAcademicSession(event: { value?: number | null }): void {
    const academicSessionId = event.value;

    this.studentProgramChangeRequestForm.patchValue({
      newProgramId: '',
      newSemesterId: ''
    });
    this.newSemesterList = [];

    if (academicSessionId === undefined || academicSessionId === null) {
      this.newProgramList = [];
      return;
    }

    this.newProgramList = this.utilityService.getFilteredSelectItems(
      this.academicSessionProgramList,
      'programName',
      'programId',
      { academicSessionId }
    );
  }

  onChangeNewProgram(event: { value?: number | null }): void {
    const academicSessionId = this.studentProgramChangeRequestForm.get('newAcademicSessionId')?.value;
    const programId = event.value;

    this.studentProgramChangeRequestForm.patchValue({ newSemesterId: '' });

    if (!academicSessionId || programId === undefined || programId === null) {
      this.newSemesterList = [];
      return;
    }

    this.newSemesterList = this.utilityService.getFilteredSelectItems(
      this.academicSessionProgramList,
      'operationalVerticalName',
      'operationalVerticalId',
      { academicSessionId, programId },
      'value'
    );
  }

  getStudentProgramChangeRequestByRegistrationNumber(registrationNumber: string) {
    this.studentProgramChangeRequestService.getByRegistrationNumber(registrationNumber)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          this.studentProgramChangeRequest = data;
          this.buildProgressSteps();
          this.updateCompletionState(this.latestProgramChangeRequest);
          this.applySubmittedRequestState();
        }, error: error => {
          this.errorMessage(error);
        }
      })
  }

  private applySubmittedRequestState(): void {
    const request = this.latestProgramChangeRequest;

    // Set allowEditOnRejection = true to allow form editing when a request is rejected (status === 'DELETED').
    // Currently set to false so the form remains disabled regardless of status.
    const allowEditOnRejection = false;
    const isRejected = request?.status === 'DELETED';

    this.isSubmittedRequestReadonly = !!request
      && (request.id ?? 0) > 0
      && (request.status === 'PUBLISHED' || (isRejected && !allowEditOnRejection));

    if (this.isSubmittedRequestReadonly && request) {
      this.studentProgramChangeRequestForm.enable({ emitEvent: false });
      this.studentProgramChangeRequestForm.patchValue(request);

      // Populate the new program/semester dropdown lists so labels display correctly
      const newAcademicSessionId = request.newAcademicSessionId;
      const newProgramId = request.newProgramId;

      if (newAcademicSessionId) {
        this.newProgramList = this.utilityService.getFilteredSelectItems(
          this.academicSessionProgramList,
          'programName',
          'programId',
          { academicSessionId: newAcademicSessionId }
        );
      }

      if (newAcademicSessionId && newProgramId) {
        this.newSemesterList = this.utilityService.getFilteredSelectItems(
          this.academicSessionProgramList,
          'operationalVerticalName',
          'operationalVerticalId',
          { academicSessionId: newAcademicSessionId, programId: newProgramId },
          'value'
        );
      }

      this.studentProgramChangeRequestForm.disable({ emitEvent: false });
    } else {
      this.studentProgramChangeRequestForm.enable({ emitEvent: false });
    }
  }

  private buildProgressSteps(): void {
    const request = this.latestProgramChangeRequest;

    if (!request) {
      this.progressSteps = [];
      this.progressPercentage = 0;
      return;
    }

    const steps: ProgramChangeProgressStep[] = [
      { label: 'Initiated', icon: 'pi-send', completed: true, active: false, rejected: false, dateTime: request.createdDate },
      { label: 'Reviewed', icon: 'pi-eye', completed: !!request.isReviewed, active: false, rejected: false, dateTime: request.reviewedDateTime },
    ];

    const isRejected = request.status === 'DELETED';

    if (isRejected) {
      steps.push({ label: 'Rejected', icon: 'pi-times-circle', completed: true, active: false, rejected: true, dateTime: request.approvedDateTime });

      const completedCount = steps.length;
      this.progressSteps = steps;
      this.progressPercentage = ((completedCount - 1) / (completedCount - 1)) * 100;
      return;
    }

    steps.push(
      { label: 'Approved', icon: 'pi-verified', completed: !!request.isApproved, active: false, rejected: false, dateTime: request.approvedDateTime },
      { label: 'Program Updated', icon: 'pi-sync', completed: !!request.isStudentProgramUpdated, active: false, rejected: false, dateTime: request.studentProgramUpdatedDateTime },
      { label: 'Fee Master Updated', icon: 'pi-wallet', completed: !!request.isFeeMasterUpdated, active: false, rejected: false, dateTime: request.feeMasterUpdatedDateTime },
      { label: 'Fee Receipt Reissued', icon: 'pi-file', completed: !!request.isFeeReceiptCancelled, active: false, rejected: false, dateTime: request.feeReceiptCancelledDateTime },
      { label: 'Program Updated', icon: 'pi-check', completed: !!request.isFeeReceiptReissued, active: false, rejected: false, dateTime: request.feeReceiptReissuedDateTime },
    );

    const completedCount = steps.filter(step => step.completed).length;

    if (completedCount < steps.length) {
      steps[completedCount].active = true;
    }

    this.progressSteps = steps;
    this.progressPercentage = (completedCount / (steps.length - 1)) * 100;
  }

  private updateCompletionState(request: StudentProgramChangeRequestResponse | null): void {
    const workflowCompleted = request?.status !== 'DELETED'
      && request?.isReviewed === true
      && request.isApproved === true
      && request.isStudentProgramUpdated === true
      && request.isFeeMasterUpdated === true
      && request.isFeeReceiptCancelled === true
      && request.isFeeReceiptReissued === true;

    if (workflowCompleted && !this.isWorkflowCompleted) {
      this.destroyCompletionAnimation();
      this.isWorkflowCompleted = true;
      this.showCompletionAnimation = true;
      this.showSuccessCard = false;
      this.completionAnimationPlayed = false;
      return;
    }

    if (!workflowCompleted) {
      this.destroyCompletionAnimation();
      this.isWorkflowCompleted = false;
      this.showCompletionAnimation = false;
      this.showSuccessCard = false;
      this.completionAnimationPlayed = false;
    }
  }

  private readonly onCompletionAnimationComplete = (): void => {
    this.ngZone.run(() => {
      if (!this.isWorkflowCompleted) {
        return;
      }

      this.showCompletionAnimation = false;
      this.showSuccessCard = true;
      this.destroyCompletionAnimation();
    });
  };

  private destroyCompletionAnimation(): void {
    if (!this.completionAnimation) {
      return;
    }

    this.completionAnimation.removeEventListener('complete', this.onCompletionAnimationComplete);
    this.completionAnimation.destroy();
    this.completionAnimation = undefined;
  }

  submit() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to submit?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.studentProgramChangeRequestForm.value.createdDate = this.studentProgramChangeRequestForm.value.modifiedDate = new Date();
        const payload = this.studentProgramChangeRequestForm.value;
        this.studentProgramChangeRequestService.add(payload)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: data => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your application for program change is submitted successfully.', life: 3000 });
              this.getStudentProfile();
            }, error: error => {
              this.errorMessage(error);
            }
          })
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  onClear() {
    this.studentProgramChangeRequestForm.patchValue({
      newAcademicSessionId: '',
      newProgramId: '',
      newSemesterId: '',
      reasonForChange: '',
      supportingDocuments: ''
    });
    this.newProgramList = [];
    this.newSemesterList = [];
  }

  errorMessage(error: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
  }

  ngOnDestroy(): void {
    this.destroyCompletionAnimation();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
