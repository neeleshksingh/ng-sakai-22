import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { SharedModule } from '@/shared.module';
import { StudentProfileActions } from 'src/app/store/actions/student-profile.actions';
import { selectStudentId } from 'src/app/store/selectors/student-profile.selectors';
import { OrganisationStudentSurveyInternalService } from '../../services/organisation-student-survey-internal.service';
import { FeedbackSurveyPendingService } from 'src/app/shared/services/feedback-survey-pending.service';
import { UserFeedbackSurveyTrackingStudentsService } from '../../services/user-feedback-survey-tracking.service';

interface FeedbackOption {
  label: string;
  value: number;
  engLabel: string;
  hinLabel: string;
}

interface FacultyFeedbackQuestion {
  id: number;
  feedbackQuestionId: number;
  text: string;
  type: string;
  answer: number | null;
  remarks: string;
  options: FeedbackOption[];
}

@Component({
  selector: 'app-student-satisfaction-survey',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-satisfaction-survey.component.html',
  styleUrl: './student-satisfaction-survey.component.scss'
})
export class StudentSatisfactionSurveyComponent implements OnInit, OnDestroy {
  componentName: string = 'Student Satisfaction Survey';
  showConfirmDialog: boolean = false;
  private destroy$ = new Subject<void>();
  isFeedbackSubmitted: boolean = false;
  searchPerformed: boolean = false;
  feedbackAnnouncementsLoaded: boolean = false;
  studentId: string = '';
  feedbackAnnouncementId: number = 0;
  questions: FacultyFeedbackQuestion[] = [];

  constructor(
    private messageService: MessageService,
    private store: Store,
    private organisationStudentSurveyInternalService: OrganisationStudentSurveyInternalService,
    private feedbackSurveyPendingService: FeedbackSurveyPendingService,
    private userFeedbackSurveyTrackingStudentsService: UserFeedbackSurveyTrackingStudentsService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(StudentProfileActions.loadStudentProfile());
    this.store.select(selectStudentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((id) => { this.studentId = id ?? ''; });
    this.getSurvey();
  }

  getSurvey() {
    this.organisationStudentSurveyInternalService.getSurvey()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          const tracking = res?.organisationStudentSurveyInternalTracking;
          const feedbackAnnouncement = res?.feedbackAnnouncementResponse;
          this.feedbackAnnouncementId = feedbackAnnouncement?.id ?? 0;
          this.isFeedbackSubmitted = tracking?.isSubmitted ?? false;

          const questionResponses = res?.feedbackQuestionResponses?.filter((a: any) => a.status !== 'DELETED') ?? [];
          this.questions = [...questionResponses]
            .map((item: any, index: number) => ({ item, index }))
            .sort((left: any, right: any) => {
              const leftOrder = typeof left.item.displayOrder === 'number' ? left.item.displayOrder : left.index;
              const rightOrder = typeof right.item.displayOrder === 'number' ? right.item.displayOrder : right.index;
              return leftOrder - rightOrder;
            })
            .map(({ item }: any, index: number) => ({
              id: index + 1,
              feedbackQuestionId: item.feedbackQuestionId ?? item.id,
              text: item.feedbackQuestionName ?? item.name ?? item.title ?? item.description ?? '',
              type: item.type ?? 'Objective',
              answer: null,
              remarks: '',
              options: this.buildQuestionOptions(item.optionLabels, item.optionValues)
            }));

          this.searchPerformed = this.questions.length > 0 || this.isFeedbackSubmitted;
          this.feedbackAnnouncementsLoaded = true;
        }, error: error => {
          this.feedbackAnnouncementsLoaded = true;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
        }
      });
  }

  buildQuestionOptions(optionLabels: string, optionValues: string): FeedbackOption[] {
    const labels = (optionLabels ?? '')
      .split(',')
      .map((label: string) => label.trim())
      .filter((label: string) => !!label);
    const values = (optionValues ?? '')
      .split(',')
      .map((value: string) => Number(value.trim()))
      .filter((value: number) => !Number.isNaN(value));

    return labels
      .map((label: string, index: number) => {
        const value = values[index];
        if (value === undefined) {
          return null;
        }

        const splitText = this.formatBilingualLabel(label);
        return {
          label,
          value,
          engLabel: splitText.eng,
          hinLabel: splitText.hin
        };
      })
      .filter((option: FeedbackOption | null): option is FeedbackOption => option !== null);
  }

  formatBilingualLabel(text: string): { eng: string, hin: string } {
    if (!text) return { eng: '', hin: '' };
    const parts = text.split('/').map(part => part.trim());
    return {
      eng: parts[0] || '',
      hin: parts[1] || ''
    };
  }

  getCardColor(selectedValue: number | null, optionValue: number): string {
    if (selectedValue !== optionValue) {
      return 'option-card-default';
    }

    return `option-card-active rating-${optionValue}`;
  }

  isFormValid(): boolean {
    return this.questions.every(question => this.isQuestionAnswered(question));
  }

  isSubjectiveQuestion(question: FacultyFeedbackQuestion): boolean {
    return question.type?.toLowerCase() === 'subjective';
  }

  isQuestionAnswered(question: FacultyFeedbackQuestion): boolean {
    if (this.isSubjectiveQuestion(question)) {
      return true;
    }

    return question.answer !== null;
  }

  getQuestionResponseLabel(question: FacultyFeedbackQuestion): string {
    if (this.isSubjectiveQuestion(question)) {
      return question.remarks.trim() || '-';
    }

    if (question.answer === null) {
      return '-';
    }

    const option = question.options.find(item => item.value === question.answer);
    return option ? `${option.engLabel} / ${option.hinLabel}` : '-';
  }

  submitFeedback() {
    if (this.isFormValid()) {
      this.showConfirmDialog = true;
    }
  }

  confirmSubmit() {
    const now = new Date();
    const announcementId = this.feedbackAnnouncementId;
    const payload = this.questions.map(q => ({
      id: 0,
      feedbackAnnouncementId: announcementId,
      feedbackSubmittedBy: this.studentId,
      feedbackQuestionId: q.feedbackQuestionId,
      rating: this.isSubjectiveQuestion(q) ? 0 : q.answer as number,
      remarks: this.isSubjectiveQuestion(q) ? (q.remarks.trim() || 'NA(Not Applicable)') : '',
      status: 'PUBLISHED',
      createdBy: '',
      modifiedBy: '',
      createdDate: now,
      modifiedDate: now
    }));

    this.organisationStudentSurveyInternalService.addMultiple(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Feedback submitted successfully.', life: 3000 });
          this.showConfirmDialog = false;
          this.isFeedbackSubmitted = true;
          this.getSurvey();
          this.userFeedbackSurveyTrackingStudentsService.getFeedbackSurveyTracking()
            .pipe(takeUntil(this.destroy$))
            .subscribe({ next: data => { if (data) this.feedbackSurveyPendingService.recheck(data); }, error: () => { } });
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
          this.showConfirmDialog = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}