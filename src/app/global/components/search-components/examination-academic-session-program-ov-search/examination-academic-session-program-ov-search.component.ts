import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { lastValueFrom, Subscription } from 'rxjs';
import { ExaminationProgramService } from 'src/app/knowledge-stand/services/examination-program.service';
import { ExaminationService } from 'src/app/knowledge-stand/services/examination.service';
import { SharedModule } from '@/shared.module';
import { ConstantData } from 'src/app/shared/models/knowledge-stand/constant';
import { ExaminationProgram } from 'src/app/shared/models/knowledge-stand/examination-program';

@Component({
  selector: 'app-examination-academic-session-program-ov-search',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './examination-academic-session-program-ov-search.component.html',
  styleUrl: './examination-academic-session-program-ov-search.component.scss'
})
export class ExaminationAcademicSessionProgramOvSearchComponent implements OnInit, OnDestroy {
  @Output() formGroupData: EventEmitter<any> = new EventEmitter();
  @Input() filterMode: 'default' | 'endOnly' | 'excludeMidEnd' = 'default';
  @Input() examinationTypeId: number | null = null;
  filterSearchFormGroup!: FormGroup;
  academicSessionSelectItemList: SelectItem[] = [];
  programSelectItemList: SelectItem[] = [];
  operationalVerticalSelectItemList: SelectItem[] = [];
  examinationSelectItemList: SelectItem[] = [];
  examinationProgramList: ExaminationProgram[] = [];
  private routeSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private examinationService: ExaminationService,
    private examinationProgramService: ExaminationProgramService,
    private constantsData: ConstantData,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.getExaminationList();

    // Subscribe to route parameters to patch values after navigation
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const examinationId = Number.parseInt(params.get('examinationId') ?? '0');
      const academicSessionId = Number.parseInt(params.get('academicSessionId') ?? '0');
      const programId = Number.parseInt(params.get('programId') ?? '0');
      const operationalVerticalId = Number.parseInt(params.get('operationalVerticalId') ?? '0');

      if (examinationId > 0) {
        this.patchFormValues({
          examinationId,
          academicSessionId,
          programId,
          operationalVerticalId
        });
      }
    });

    this.filterSearchFormGroup.valueChanges.subscribe(value => {
      this.formGroupData.emit(value);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  initializeFormGroup() {
    this.filterSearchFormGroup = this.fb.group({
      examinationId: [null, Validators.required],
      academicSessionId: [null, Validators.required],
      programId: [null, Validators.required],
      operationalVerticalId: [null, Validators.required]
    });
  }

  async patchFormValues(data: any) {
    // Patch examinationId and wait for the examination list to load
    if (data.examinationId) {
      await this.waitForExaminationList();
      this.filterSearchFormGroup.patchValue({ examinationId: data.examinationId }, { emitEvent: false });

      // Trigger academic session population
      await this.bindingAcademicBatch(data.examinationId);

      // Patch academicSessionId if provided
      if (data.academicSessionId) {
        await this.waitForAcademicSessionList();
        this.filterSearchFormGroup.patchValue({ academicSessionId: data.academicSessionId }, { emitEvent: false });

        // Trigger program population
        this.bindingPrograms(data.academicSessionId);

        // Patch programId if provided
        if (data.programId) {
          await this.waitForProgramList();
          this.filterSearchFormGroup.patchValue({ programId: data.programId }, { emitEvent: false });

          // Trigger operational vertical population
          this.bindingOperationsVertical(data.programId);

          // Patch operationalVerticalId if provided
          if (data.operationalVerticalId) {
            await this.waitForOperationalVerticalList();
            this.filterSearchFormGroup.patchValue({ operationalVerticalId: data.operationalVerticalId }, { emitEvent: false });
          }
        }
      }
    }

    // Emit the patched form values to the parent
    this.formGroupData.emit(this.filterSearchFormGroup.value);
  }

  // Utility to wait for examination list to be populated
  private async waitForExaminationList(): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkInterval = setInterval(() => {
        if (this.examinationSelectItemList.length > 0) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  }

  // Utility to wait for academic session list to be populated
  private async waitForAcademicSessionList(): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkInterval = setInterval(() => {
        if (this.academicSessionSelectItemList.length > 0) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  }

  // Utility to wait for program list to be populated
  private async waitForProgramList(): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkInterval = setInterval(() => {
        if (this.programSelectItemList.length > 0) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  }

  // Utility to wait for operational vertical list to be populated
  private async waitForOperationalVerticalList(): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkInterval = setInterval(() => {
        if (this.operationalVerticalSelectItemList.length > 0) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  }

  getExaminationList() {
    this.examinationSelectItemList = [];
    this.examinationService.getAll().subscribe({
      next: (p) => {
        let filteredList;
        if (this.filterMode === 'endOnly') {
          filteredList = p.filter(x =>
            x.status?.toUpperCase() === this.constantsData.published &&
            x.name?.toUpperCase().includes("END")
          );
        } else if (this.filterMode === 'excludeMidEnd') {
          filteredList = p.filter(x =>
            x.status?.toUpperCase() === this.constantsData.published &&
            !(x.name?.toUpperCase().includes("MID") || x.name?.toUpperCase().includes("END"))
          );
        } else {
          filteredList = p.filter(x =>
            x.status?.toUpperCase() === this.constantsData.published
          );
        }

        if (this.examinationTypeId === 2) {
          filteredList = filteredList.filter(x => x.examinationTypeId === 2);
        }

        this.examinationSelectItemList = filteredList
          .map(item => ({ label: item.name, value: item.id }))
          .filter((item, index, self) =>
            index === self.findIndex(x => x.label === item.label && x.value === item.value)
          ).sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
      }
    });
  }

  async onExaminationIdChange(event: any) {
    if (event.value != null) {
      this.academicSessionSelectItemList = [];
      this.programSelectItemList = [];
      this.operationalVerticalSelectItemList = [];
      this.filterSearchFormGroup.patchValue({
        academicSessionId: null,
        programId: null,
        operationalVerticalId: null
      }, { emitEvent: false });
      await this.bindingAcademicBatch(event.value);
    }
  }

  async bindingAcademicBatch(examinationId: number) {
    this.academicSessionSelectItemList = [];
    try {
      const p = await lastValueFrom(this.examinationProgramService.getByExaminationId(examinationId));
      if (p) {
        this.examinationProgramList = p.filter(x => x.status && x.status.toUpperCase() === this.constantsData.published);
        const lists = this.examinationProgramList.map(item => ({
          label: item.academicSessionName,
          value: item.academicSessionId
        }));

        this.academicSessionSelectItemList = lists.filter((item, index, self) =>
          index === self.findIndex(x => x.label === item.label && x.value === item.value)
        ).sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
      }
    } catch (err: any) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
    }
  }

  onAcademicSessionIdChange(event: any) {
    if (event.value != null) {
      this.programSelectItemList = [];
      this.operationalVerticalSelectItemList = [];
      this.filterSearchFormGroup.patchValue({
        programId: null,
        operationalVerticalId: null
      }, { emitEvent: false });
      this.bindingPrograms(event.value);
    }
  }

  bindingPrograms(academicSessionId: number) {
    this.programSelectItemList = [];
    const examinationProgramListByAcademicSessionId = this.examinationProgramList.filter(x => x.academicSessionId == academicSessionId);

    const lists = examinationProgramListByAcademicSessionId.map(item => ({
      label: item.programName,
      value: item.programId
    }));

    this.programSelectItemList = lists.filter((item, index, self) =>
      index === self.findIndex(x => x.label === item.label && x.value === item.value)
    ).sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
  }

  onProgramIdsChange(event: any) {
    if (event.value != null) {
      this.operationalVerticalSelectItemList = [];
      this.filterSearchFormGroup.patchValue({
        operationalVerticalId: null
      }, { emitEvent: false });
      this.bindingOperationsVertical(event.value);
    }
  }

  bindingOperationsVertical(programId: number) {
    this.operationalVerticalSelectItemList = [];
    const examinationProgramListByProgramId = this.examinationProgramList.filter(x => x.programId == programId);

    const lists = examinationProgramListByProgramId.map(item => ({
      label: item.operationalVerticalName,
      value: item.operationalVerticalId
    }));

    this.operationalVerticalSelectItemList = lists.filter((item, index, self) =>
      index === self.findIndex(x => x.label === item.label && x.value === item.value)
    ).sort((a, b) => (a.value ?? 0) - (b.value ?? 0));
  }
}