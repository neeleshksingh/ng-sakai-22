import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { tap } from 'rxjs';
import { AcademicSessionProgramService } from 'src/app/cloud-bytes/services/academic-session-program.service';
import { AcademicSessionService } from 'src/app/cloud-bytes/services/academic-session.service';
import { SharedModule } from '@/shared.module';
import { AcademicSession } from 'src/app/shared/models/cloudbytes/academic-session';
import { AcademicSessionProgram } from 'src/app/shared/models/cloudbytes/academic-session-program';
import { OperationalVertical } from 'src/app/shared/models/cloudbytes/operational-vertical';
import { Program } from 'src/app/shared/models/cloudbytes/program';

@Component({
  selector: 'app-session-program-semester-search',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './session-program-semester-search.component.html',
  styleUrl: './session-program-semester-search.component.scss'
})
export class SessionProgramSemesterSearchComponent implements OnInit, OnChanges {
  @Output() formGroupData: EventEmitter<any> = new EventEmitter();
  @Input() dropdownOptions: any;

  filterSearchFormGroup!: FormGroup;
  academicSessions: AcademicSession[] = [];
  programs: Program[] = [];
  operationalVerticals: OperationalVertical[] = [];
  academicSessionPrograms: AcademicSessionProgram[] = [];

  academicSessionSelectItemList: SelectItem[] = [];
  programSelectItemList: SelectItem[] = [];
  operationalVerticalSelectItemList: SelectItem[] = [];

  selectedAcademicSessionId = 0;
  selectedProgramId = 0;

  prefillQueue: any = null;

  constructor(
    private fb: FormBuilder,
    private academicSessionService: AcademicSessionService,
    private messageService: MessageService,
    private academicSessionProgramService: AcademicSessionProgramService
  ) { }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.getAcademicSessionList();

    this.filterSearchFormGroup.valueChanges.subscribe(value => {
      this.formGroupData.emit(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dropdownOptions']) {
      const options = changes['dropdownOptions'].currentValue;

      if (options?.academicSessionId && options?.programId && options?.semesterId) {
        this.prefillQueue = options;
        this.processPrefill();
      } else {
        this.resetPrefillState();
      }
    }
  }

  resetPrefillState() {
    this.prefillQueue = null;
    this.selectedAcademicSessionId = 0;
    this.selectedProgramId = 0;
    this.programSelectItemList = [];
    this.operationalVerticalSelectItemList = [];

    if (this.filterSearchFormGroup) {
      this.filterSearchFormGroup.reset({
        academicSessionId: null,
        programId: null,
        semesterId: null
      }, { emitEvent: false });
    }
  }

  initializeFormGroup() {
    this.filterSearchFormGroup = this.fb.group({
      academicSessionId: [null, Validators.required],
      programId: [null, Validators.required],
      semesterId: [null, Validators.required]
    });
  }

  getAcademicSessionList() {
    this.academicSessionService.getAll().subscribe({
      next: (data: AcademicSession[]) => {
        this.academicSessions = data.filter(session => session.status?.toUpperCase() === 'PUBLISHED');
        this.academicSessionSelectItemList = [];

        this.academicSessions.forEach((session) => {
          if (session.status?.toUpperCase() === 'PUBLISHED') {
            this.academicSessionSelectItemList.push({
              label: session.name,
              value: session.id
            });
          }
        });

        this.academicSessionSelectItemList = this.reduceDuplicates(this.academicSessionSelectItemList);
        this.sortSelectItemList();
        this.processPrefill();
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    });
  }

  processPrefill() {
    if (!this.prefillQueue || this.academicSessionSelectItemList.length === 0) return;

    const data = this.prefillQueue;
    this.prefillQueue = null;

    const sessionId = Number(data.academicSessionId);
    const programId = Number(data.programId);
    const semesterId = Number(data.semesterId);

    this.filterSearchFormGroup.patchValue({ academicSessionId: sessionId }, { emitEvent: false });
    this.selectedAcademicSessionId = sessionId;

    this.changeAcademicSession(sessionId).subscribe({
      next: () => {
        this.filterSearchFormGroup.patchValue({ programId: programId }, { emitEvent: false });
        this.selectedProgramId = programId;
        this.changeProgram(programId, semesterId);
      }
    });
  }

  reduceDuplicates(list: SelectItem[]): SelectItem[] {
    return list.filter((item, index, self) =>
      index === self.findIndex(t => t.label === item.label && t.value === item.value)
    );
  }

  sortSelectItemList() {
    this.academicSessionSelectItemList.sort((a, b) => {
      const yearA = parseInt((a.label?.split('-')[0] ?? ''), 10) || 0;
      const yearB = parseInt((b.label?.split('-')[0] ?? ''), 10) || 0;
      return yearB - yearA;
    });
  }

  onAcademicSessionIdChange(event: any) {
    this.selectedAcademicSessionId = event.value;

    this.filterSearchFormGroup.patchValue({ programId: null, semesterId: null }, { emitEvent: false });
    this.programSelectItemList = [];
    this.operationalVerticalSelectItemList = [];

    this.changeAcademicSession(event.value).subscribe();
  }

  changeAcademicSession(academicSessionId: number) {
    return this.academicSessionProgramService.getAcademicSessionProgramListByAcademicSessionId(academicSessionId).pipe(
      tap((data: AcademicSessionProgram[]) => {
        this.academicSessionPrograms = data.filter(program => program.status === 'PUBLISHED');
        this.programSelectItemList = this.academicSessionPrograms.map(program => ({
          label: program.programName,
          value: program.programId
        }));
        this.programSelectItemList = this.reduceDuplicates(this.programSelectItemList).sort((a, b) => a.value - b.value);
      })
    );
  }

  onProgramIdsChange(event: any) {
    this.selectedProgramId = event.value;
    this.filterSearchFormGroup.patchValue({ semesterId: null }, { emitEvent: false });
    this.operationalVerticalSelectItemList = [];

    this.changeProgram(event.value);
  }

  changeProgram(programId: number, prefilledSemesterId?: number) {
    const currentSessionId = this.filterSearchFormGroup.value.academicSessionId || this.selectedAcademicSessionId;

    const filteredPrograms = this.academicSessionPrograms.filter(program =>
      program.academicSessionId === currentSessionId && program.programId === programId
    );

    this.operationalVerticalSelectItemList = filteredPrograms.map(program => ({
      label: program.operationalVerticalName || '',
      value: program.operationalVerticalId || 0
    }));

    this.operationalVerticalSelectItemList = this.reduceDuplicates(this.operationalVerticalSelectItemList);
    this.operationalVerticalSelectItemList.sort((a, b) => {
      return a.label?.localeCompare(b.label || '') || 0;
    });

    const semesterIdToSet = prefilledSemesterId ? prefilledSemesterId : (this.operationalVerticalSelectItemList.length ? this.operationalVerticalSelectItemList[0].value : null);

    this.filterSearchFormGroup.patchValue({
      semesterId: semesterIdToSet
    });
  }
}