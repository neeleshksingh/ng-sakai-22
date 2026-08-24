import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { AcademicSessionService } from 'src/app/cloud-bytes/services/academic-session.service';
import { OperationalVerticalService } from 'src/app/cloud-bytes/services/operational-vertical.service';
import { ProgramService } from 'src/app/cloud-bytes/services/program.service';
import { SharedModule } from '@/shared.module';
import { AcademicSession } from 'src/app/shared/models/cloudbytes/academic-session';
import { OperationalVertical } from 'src/app/shared/models/cloudbytes/operational-vertical';
import { Program } from 'src/app/shared/models/cloudbytes/program';
import { StudentProgramPaperCodeAllocationSearch } from 'src/app/shared/models/mindspark/student-program-paper-code-allocation';


@Component({
  selector: 'app-academic-session-program-operational-vertical-search',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './academic-session-program-operational-vertical-search.component.html',
  styleUrl: './academic-session-program-operational-vertical-search.component.scss'
})
export class AcademicSessionProgramOperationalVerticalSearchComponent {
  @Output() formGroupData: EventEmitter<any> = new EventEmitter();

  filterSearchFormGroup!: FormGroup;
  studentProgramPaperCodeAllocationSearch!: StudentProgramPaperCodeAllocationSearch

  academicSessions: AcademicSession[] = [];
  programs: Program[] = [];
  operationalVerticals: OperationalVertical[] = [];

  academicSessionSelectItemList: SelectItem[] = [];
  programSelectItemList: SelectItem[] = [];
  operationalVerticalSelectItemList: SelectItem[] = [];
  @Output() searchEvent = new EventEmitter<StudentProgramPaperCodeAllocationSearch>();
  @Input() pageTabName = '';



  constructor(private fb: FormBuilder,
    private academicSessionService: AcademicSessionService,
    private programService: ProgramService,
    private operationalVerticalService: OperationalVerticalService,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this.onLoadDataInitialization();
    this.initializeFormGroup();
    this.getAcademicSessionList();

    this.studentProgramPaperCodeAllocationSearch = new StudentProgramPaperCodeAllocationSearch;

  }

  initializeFormGroup() {
    this.filterSearchFormGroup = this.fb.group({
      academicSessionIds: [],
      programIds: [],
      operationalVerticalIds: [],
      registrationNumber: []
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
        this.sortAcademicSessionSelectItemList();
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      },
      complete: () => { }
    })
  }

  sortAcademicSessionSelectItemList() {
    this.academicSessionSelectItemList.sort((a, b) => b.value - a.value);
  }

  onAcademicSessionIdChange(event: any) {
    let academicSessionIds: any[] = [];
    academicSessionIds = [event.value];
    this.filterSearchFormGroup.patchValue({ programIds: [] })

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

  searchList() {
    this.studentProgramPaperCodeAllocationSearch = {
      academicSessionIds: [this.filterSearchFormGroup.value.academicSessionIds],
      programIds: [this.filterSearchFormGroup.value.programIds],
      operationalVerticalIds: this.filterSearchFormGroup.value.operationalVerticalIds,
      registrationNumbers: []
    };
    if (this.filterSearchFormGroup.value.registrationNumber) {
      this.studentProgramPaperCodeAllocationSearch.registrationNumbers =
        this.filterSearchFormGroup.value.registrationNumber.split(",");
    }
    const form = this.filterSearchFormGroup.value;
    if (!form.academicSessionIds && !form.programIds && !form.operationalVerticalIds && form.registrationNumber != "") {
      this.studentProgramPaperCodeAllocationSearch.academicSessionIds = [];
      this.studentProgramPaperCodeAllocationSearch.programIds = [];
      this.studentProgramPaperCodeAllocationSearch.operationalVerticalIds = [];
    }
    this.searchEvent.emit(this.studentProgramPaperCodeAllocationSearch);

  }

  onLoadDataInitialization() {
    this.academicSessionSelectItemList = [];
    this.programSelectItemList = [];
    this.operationalVerticalSelectItemList = [];
  }
}




