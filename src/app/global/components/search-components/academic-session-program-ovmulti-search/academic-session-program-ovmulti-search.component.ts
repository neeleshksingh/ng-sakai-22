import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core'; import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { AcademicSessionService } from 'src/app/cloud-bytes/services/academic-session.service';
import { OperationalVerticalService } from 'src/app/cloud-bytes/services/operational-vertical.service';
import { ProgramService } from 'src/app/cloud-bytes/services/program.service';
import { SharedModule } from '@/shared.module';
import { AcademicSession } from 'src/app/shared/models/cloudbytes/academic-session';
import { OperationalVertical } from 'src/app/shared/models/cloudbytes/operational-vertical';
import { Program } from 'src/app/shared/models/cloudbytes/program';


@Component({
  selector: 'app-academic-session-program-ovmulti-search',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './academic-session-program-ovmulti-search.component.html',
  styleUrl: './academic-session-program-ovmulti-search.component.scss'
})
export class AcademicSessionProgramOVMultiSearchComponent implements OnInit {
  @Output() formGroupData: EventEmitter<any> = new EventEmitter();

  @Input() initialData: any;

  filterSearchFormGroup: FormGroup = new FormGroup({});

  academicSessions: AcademicSession[] = [];
  programs: Program[] = [];
  operationalVerticals: OperationalVertical[] = [];

  academicSessionSelectItemList: SelectItem[] = [];
  programSelectItemList: SelectItem[] = [];
  operationalVerticalSelectItemList: SelectItem[] = [];


  constructor(private fb: FormBuilder,
    private academicSessionService: AcademicSessionService,
    private programService: ProgramService,
    private operationalVerticalService: OperationalVerticalService,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.getAcademicSessionList();

    this.filterSearchFormGroup.valueChanges.subscribe(value => {
      this.formGroupData.emit(this.filterSearchFormGroup.value);
    });
  }

  initializeFormGroup() {
    this.filterSearchFormGroup = this.fb.group({
      academicSessionIds: ['', Validators.required],
      programIds: ['', Validators.required],
      operationalVerticalIds: ['', Validators.required]
    });
  }

  getAcademicSessionList() {
    this.academicSessionService.getAll().subscribe({
      next: (data: AcademicSession[]) => {
        this.academicSessions = data;
        this.academicSessionSelectItemList = [];
        for (var i = 0; i < this.academicSessions.length; i++) {
          if (this.academicSessions[i]?.status?.toUpperCase() === "PUBLISHED") {
            this.academicSessionSelectItemList.push({ label: this.academicSessions[i].name, value: this.academicSessions[i].id });
          }
        }
        this.academicSessionSelectItemList.sort((a, b) => b.value - a.value);
        if (this.initialData) {
          this.restoreState();
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      },
      complete: () => { }
    })
  }

  restoreState() {
    // A. Patch Academic Sessions
    const sessionIds = this.initialData.academicSessionIds;
    this.filterSearchFormGroup.patchValue({ academicSessionIds: sessionIds });

    // B. Manually Load Programs (Simulating the user selection)
    if (sessionIds && sessionIds.length > 0) {
      this.programService.getByAcademicSessionIds(sessionIds).subscribe({
        next: (items) => {
          let filterData = items.programResponses?.filter(x =>
            sessionIds.includes(x.academicSessionId) &&
            x?.status?.toUpperCase() == "PUBLISHED"
          );

          let lists = [];
          if (filterData) {
            for (let i = 0; i < filterData.length; i++) {
              lists.push({ label: filterData[i].name, value: filterData[i].id });
            }
          }
          this.programSelectItemList = lists;

          // C. Patch Programs
          const progIds = this.initialData.programIds;
          this.filterSearchFormGroup.patchValue({ programIds: progIds });

          // D. Manually Load Operational Verticals
          if (progIds && progIds.length > 0) {
            this.restoreOperationalVerticals();
          }
        }
      });
    }
  }

  restoreOperationalVerticals() {
    this.operationalVerticalService.getAll().subscribe({
      next: (items) => {
        let filterData = items?.filter(x =>
          x?.status?.toUpperCase() == "PUBLISHED"
        );
        let lists = [];
        if (filterData) {
          for (let i = 0; i < filterData.length; i++) {
            lists.push({ label: filterData[i].name, value: filterData[i].id });
          }
        }
        this.operationalVerticalSelectItemList = lists;

        // E. Patch Operational Verticals
        this.filterSearchFormGroup.patchValue({
          operationalVerticalIds: this.initialData.operationalVerticalIds
        });
      }
    });
  }

  onAcademicSessionIdChange(event: any) {
    let academicSessionIds: any[] = [];
    this.filterSearchFormGroup.patchValue({ programIds: [] })
    academicSessionIds = event.value || [];
    this.programService.getByAcademicSessionIds(academicSessionIds).subscribe({
      next: (items) => {
        let filterData = items.programResponses?.filter(x =>
          academicSessionIds.includes(x.academicSessionId) &&
          x?.status?.toUpperCase() == "PUBLISHED"
        );

        let lists = [];
        if (filterData) {
          for (let i = 0; i < filterData.length; i++) {
            lists.push({ label: filterData[i].name, value: filterData[i].id });
          }
        }
        this.programSelectItemList = lists;
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
      }
    });
  }

  onProgramIdsChange() {
    this.operationalVerticalService.getAll().subscribe({
      next: (items) => {
        let filterData = items?.filter(x =>
          x?.status?.toUpperCase() == "PUBLISHED"
        );
        let lists = [];
        if (filterData) {
          for (let i = 0; i < filterData.length; i++) {
            lists.push({ label: filterData[i].name, value: filterData[i].id });
          }
        }
        this.operationalVerticalSelectItemList = lists;
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
      }
    });
  }
}
