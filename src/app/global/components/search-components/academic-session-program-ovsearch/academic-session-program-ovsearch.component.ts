import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  selector: 'app-academic-session-program-ovsearch',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './academic-session-program-ovsearch.component.html',
  styleUrl: './academic-session-program-ovsearch.component.scss'
})
export class AcademicSessionProgramOVSearchComponent {
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

  constructor(
    private fb: FormBuilder,
    private academicSessionService: AcademicSessionService,
    private messageService: MessageService,
    private academicSessionProgramService: AcademicSessionProgramService
  ) { }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.getAcademicSessionList();

    if (this.dropdownOptions) {
      this.filterSearchFormGroup.patchValue(this.dropdownOptions);
      this.changeAcademicSession(this.filterSearchFormGroup.value.academicSessionId).subscribe(() => {
        this.changeProgram(this.filterSearchFormGroup.value.programId);
      });
    }

    this.filterSearchFormGroup.valueChanges.subscribe(value => {
      this.formGroupData.emit(value);
    });
  }

  initializeFormGroup() {
    this.filterSearchFormGroup = this.fb.group({
      academicSessionId: [null, Validators.required],
      programId: [null, Validators.required],
      operationalVerticalId: [null, Validators.required]
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
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      },
      complete: () => { }
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
    this.changeAcademicSession(event.value).subscribe({
      next: () => {
        this.changeProgram(this.filterSearchFormGroup.value.programId);
      },
      error: (error) => {
      }
    });
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
    this.changeProgram(event.value);
  }

  changeProgram(programId: number) {
    let filteredPrograms: AcademicSessionProgram[];
    if (this.dropdownOptions) {
      filteredPrograms = this.academicSessionPrograms.filter(program =>
        program.academicSessionId === this.dropdownOptions.academicSessionId &&
        program.programId === programId
      );

      const operationalVerticalId = this.dropdownOptions.operationalVerticalId;
      this.operationalVerticalSelectItemList = filteredPrograms.map(program => ({
        label: program.operationalVerticalName || '',
        value: program.operationalVerticalId || 0
      }));
      this.operationalVerticalSelectItemList = this.reduceDuplicates(this.operationalVerticalSelectItemList);
      this.filterSearchFormGroup.patchValue({
        operationalVerticalId: operationalVerticalId || (this.operationalVerticalSelectItemList.length ? this.operationalVerticalSelectItemList[0].value : null)
      });
    } else {
      filteredPrograms = this.academicSessionPrograms.filter(program =>
        program.academicSessionId === this.selectedAcademicSessionId && program.programId === programId
      );
      this.operationalVerticalSelectItemList = filteredPrograms.map(program => ({
        label: program.operationalVerticalName || '',
        value: program.operationalVerticalId || 0
      }));

      this.operationalVerticalSelectItemList = this.reduceDuplicates(this.operationalVerticalSelectItemList);
      this.operationalVerticalSelectItemList.sort((a, b) => {
        return a.label?.localeCompare(b.label || '') || 0;
      });
      this.sortSelectItemList();

      this.filterSearchFormGroup.patchValue({
        operationalVerticalId: this.operationalVerticalSelectItemList.length ? this.operationalVerticalSelectItemList[0].value : null
      });
    }
  }
}