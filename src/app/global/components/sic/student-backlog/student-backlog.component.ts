import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ExaminationResultService } from 'src/app/global/services/knowledge-stands/examination-result.service';
import { SharedModule } from '@/shared.module';
import { BacklogHistory } from 'src/app/shared/models/knowledge-stand/backlog-history';


@Component({
  selector: 'app-student-backlog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-backlog.component.html',
  styleUrl: './student-backlog.component.scss'
})
export class StudentBacklogComponent implements OnInit, OnDestroy, OnChanges {
  backlogHistoryList: BacklogHistory[] = [];
  studentBacklogSubscription?: Subscription;
  @Input() studentId: string = '';
  @Input() forceRefresh: boolean = false;
  @Output() dataStateChange = new EventEmitter<{ hasData: boolean; isEmpty: boolean }>();
  private previousStudentId: string = '';

  constructor(
    private knowledgeStandService: ExaminationResultService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      debounceTime(300),
      distinctUntilChanged((prev, curr) => prev.get('studentId') === curr.get('studentId'))
    ).subscribe(params => {
      const newStudentId = params.get('studentId') || '';
      if (newStudentId && newStudentId !== this.previousStudentId) {
        this.clearSessionStorage();
        this.studentId = newStudentId;
        this.previousStudentId = newStudentId;
        this.loadBacklogData(newStudentId);
      }
    });
  }

  ngOnChanges(): void {
    // Handle force refresh from parent
    if (this.forceRefresh && this.studentId) {
      this.clearSessionStorage();
      this.getStudentBacklogHistory(this.studentId);
    }
  }

  private loadBacklogData(studentId: string): void {
    const cachedData = this.getCachedData(studentId);
    if (cachedData && cachedData.length > 0) {
      this.backlogHistoryList = cachedData;
      this.emitDataState();
    } else {
      // Make API call if no cached data or cached data is empty
      this.getStudentBacklogHistory(studentId);
    }
  }

  ngOnDestroy(): void {
    if (this.studentBacklogSubscription) {
      this.studentBacklogSubscription.unsubscribe();
    }
  }

  private getCachedData(studentId: string): BacklogHistory[] | null {
    const cachedBacklogHistory = sessionStorage.getItem(`studentBacklogHistory_${studentId}`);
    if (cachedBacklogHistory) {
      try {
        return JSON.parse(cachedBacklogHistory) as BacklogHistory[];
      } catch (e) {
        console.error('Error parsing cached backlog history data:', e);
        return null;
      }
    }
    return null;
  }

  private saveCachedData(studentId: string, backlogHistory: BacklogHistory[]) {
    try {
      sessionStorage.setItem(`studentBacklogHistory_${studentId}`, JSON.stringify(backlogHistory));
    } catch (e) {
      console.error('Error saving backlog history to sessionStorage:', e);
    }
  }

  private clearSessionStorage() {
    if (this.previousStudentId) {
      sessionStorage.removeItem(`studentBacklogHistory_${this.previousStudentId}`);
    }
  }

  private getStudentBacklogHistory(studentId: string) {
    this.studentBacklogSubscription = this.knowledgeStandService
      .getStudentExaminationBacklogHistoryByStudentId(studentId)
      .subscribe({
        next: (response: BacklogHistory[]) => {
          this.backlogHistoryList = response || [];
          this.saveCachedData(studentId, this.backlogHistoryList);
          this.emitDataState();

          if (this.backlogHistoryList.length === 0) {
            this.messageService.add({
              severity: 'info',
              summary: 'Info',
              detail: 'No backlog history found for this student',
              life: 3000
            });
          }
        },
        error: (err) => {
          console.error('Error fetching backlog history:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to fetch backlog history data',
            life: 3000
          });
          this.backlogHistoryList = [];
          this.emitDataState();
        }
      });
  }


  refreshData(): void {
    if (this.studentId) {
      this.clearSessionStorage();
      this.previousStudentId = this.studentId;
      this.getStudentBacklogHistory(this.studentId);
    }
  }

  private emitDataState(): void {
    this.dataStateChange.emit({
      hasData: this.backlogHistoryList.length > 0,
      isEmpty: this.backlogHistoryList.length === 0
    });
  }
}