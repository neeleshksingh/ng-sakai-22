import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { StudentProgramService } from 'src/app/global/services/mindspark/student-program.service';
import { SharedModule } from '@/shared.module';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';

@Component({
  selector: 'app-bus-hostel-opt-in-opt-out',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './bus-hostel-opt-in-opt-out.component.html',
  styleUrl: './bus-hostel-opt-in-opt-out.component.scss'
})
export class BusHostelOptInOptOutComponent implements OnInit, OnDestroy, OnChanges {
  studentPrograms: StudentProgram[] = [];
  studentProgramSubscription?: Subscription;
  @Input() studentId: string = '';
  @Input() forceRefresh: boolean = false;
  @Output() dataStateChange = new EventEmitter<{ hasData: boolean; isEmpty: boolean }>();
  private previousStudentId: string = '';

  constructor(
    private studentProgramService: StudentProgramService,
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
        this.loadStudentProgramData(newStudentId);
      }
    });
  }

  ngOnChanges(): void {
    // Handle force refresh from parent
    if (this.forceRefresh && this.studentId) {
      this.clearSessionStorage();
      this.getStudentPrograms(this.studentId);
    }
  }

  private loadStudentProgramData(studentId: string): void {
    const cachedData = this.getCachedData(studentId);
    if (cachedData && cachedData.length > 0) {
      this.studentPrograms = cachedData;
      this.emitDataState();
    } else {
      // Make API call if no cached data or cached data is empty
      this.getStudentPrograms(studentId);
    }
  }

  ngOnDestroy(): void {
    if (this.studentProgramSubscription) {
      this.studentProgramSubscription.unsubscribe();
    }
  }

  private getCachedData(studentId: string): StudentProgram[] | null {
    const cachedStudentPrograms = sessionStorage.getItem(`studentPrograms_${studentId}`);
    if (cachedStudentPrograms) {
      try {
        return JSON.parse(cachedStudentPrograms) as StudentProgram[];
      } catch (e) {
        console.error('Error parsing cached student programs data:', e);
        return null;
      }
    }
    return null;
  }

  private saveCachedData(studentId: string, studentPrograms: StudentProgram[]) {
    try {
      sessionStorage.setItem(`studentPrograms_${studentId}`, JSON.stringify(studentPrograms));
    } catch (e) {
      console.error('Error saving student programs to sessionStorage:', e);
    }
  }

  private clearSessionStorage() {
    if (this.previousStudentId) {
      sessionStorage.removeItem(`studentPrograms_${this.previousStudentId}`);
    }
  }

  private getStudentPrograms(studentId: string) {
    this.studentProgramSubscription = this.studentProgramService
      .studentProgramByRegistrationNumber(studentId)
      .subscribe({
        next: (response) => {
          this.studentPrograms = response?.studentPrograms ?? [];
          if (this.studentPrograms?.length > 0) {
            this.studentPrograms.sort((a: any, b: any) =>
              (a.operationalVerticalId ?? 0) - (b.operationalVerticalId ?? 0)
            );
          }
          this.saveCachedData(studentId, this.studentPrograms);
          this.emitDataState();

          if (this.studentPrograms.length === 0) {
            this.messageService.add({
              severity: 'info',
              summary: 'Info',
              detail: 'No student programs found for this student',
              life: 3000
            });
          }
        },
        error: (err) => {
          console.error('Error fetching student programs:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to fetch student programs data',
            life: 3000
          });
          this.studentPrograms = [];
          this.emitDataState();
        }
      });
  }

  private emitDataState(): void {
    this.dataStateChange.emit({
      hasData: this.studentPrograms.length > 0,
      isEmpty: this.studentPrograms.length === 0
    });
  }
}