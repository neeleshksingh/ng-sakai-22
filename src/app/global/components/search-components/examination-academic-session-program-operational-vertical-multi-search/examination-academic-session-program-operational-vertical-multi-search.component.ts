import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ExaminationProgramConfigurationSearch, ExaminationProgramConfigurationSearchResponse } from 'src/app/shared/models/knowledge-stand/examination-program-configuration';

@Component({
  selector: 'app-examination-academic-session-program-operational-vertical-multi-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DropdownModule, MultiSelectModule],
  templateUrl: './examination-academic-session-program-operational-vertical-multi-search.component.html',
  styleUrl: './examination-academic-session-program-operational-vertical-multi-search.component.scss'
})
export class ExaminationAcademicSessionProgramOperationalVerticalMultiSearchComponent {


  examinationProgramConfigurationSearch!: ExaminationProgramConfigurationSearch;
  examinationProgramConfigurationSearchResponse!: ExaminationProgramConfigurationSearchResponse;
  // selectedExaminationProgramConfiguration: ExaminationProgramConfigurationData[];
  // examinationProgramConfigurationPagedData: ExaminationProgramConfigurationPagedData;
  // examinationProgramConfigurationResponses: ExaminationProgramConfigurationResponse[];

  // examinationExpandos: ExaminationExpandos[];
  // academicSessionExpandos: AcademicSessionExpandos[];
  // programExpandos: ProgramExpandos[];
  // operationalVerticalExpandos: OperationalVerticalExpandos[];
  // paperTypeExpandos: PaperTypeExpandos[];
  // subjectPaperCodeExpandos: SubjectPaperCodeExpandos[];


  examinationSelectItemList!: SelectItem[];
  academicSessionSelectItemList!: SelectItem[];
  programNameSelectItemList!: SelectItem[];
  operationalVerticalSelectItemList!: SelectItem[];

  // selectfilteracademicSession: string = ""
  // examinationList: ExaminationResponse[];
  // academicSessionList: AcademicSession[];
  // programList: Program[];
  // operationalVerticals: OperationalVertical[];

  examinationProgramSearchFormGroup!: FormGroup;

  @Input() pageTabName = '';
  // @Input() show: boolean = false;
  @Output() searchEvent = new EventEmitter<ExaminationProgramConfigurationSearch>();

  constructor(
    private fb: FormBuilder,
    // private breadcrumbService: BreadcrumbService,
    // private examinationProgramService: ExaminationProgramService,
    // private academicSessionProgramService: AcademicSessionProgramService,
    // private constantsData: ConstantData,
    // private messageService: MessageService,
    // private examinationService: ExaminationService,
    // private programService: ProgramService,
    // private operationalVerticalService: OperationalVerticalService,
    // private examinationProgramConfigurationService: ExaminationProgramConfigurationService,
  ) { }

  ngOnInit(): void {
    this.initializeExaminationProgramSearchFormGroup();
    this.onLoadDataInitialization();
    this.bindExamination();
    this.examinationProgramConfigurationSearch = new ExaminationProgramConfigurationSearch;
  }

  initializeExaminationProgramSearchFormGroup() {
    this.examinationProgramSearchFormGroup = this.fb.group({
      examinationIds: ['', Validators.required],
      academicSessionIds: ['', Validators.required],
      programIds: ['', Validators.required],
      operationalVerticalIds: ['', Validators.required],
    });
  }
  onExaminationChanged(event: any) {

    if ((event.target as HTMLSelectElement).value != null) {
      this.examinationProgramConfigurationSearch.examinationIds = [];
      this.examinationProgramConfigurationSearch.academicSessionIds = [];
      this.examinationProgramConfigurationSearch.programIds = [];
      this.examinationProgramConfigurationSearch.operationalVerticalIds = [];
      this.examinationProgramSearchFormGroup.value.academicSessionIds = [];
      this.examinationProgramSearchFormGroup.value.programIds = [];
      this.examinationProgramSearchFormGroup.value.operationalVerticalIds = [];
      // this.academicSessionSelectItemList = [];
      // this.programNameSelectItemList = [];
      // this.operationalVerticalSelectItemList = [];
      this.examinationProgramConfigurationSearch.examinationIds.push(Number((event.target as HTMLSelectElement).value));
      this.bindingAcademicBatch(Number((event.target as HTMLSelectElement).value));
    }
    // this.programNameSelectItemList = [];
    // this.operationalVerticalSelectItemList = [];
  }
  onMultiExaminationChanged(event:any){
    
  }
  async bindingAcademicBatch(examinationId: number) {
    // this.academicSessionSelectItemList = [];
    // await this.examinationProgramService.getByExaminationId(examinationId).toPromise().then(p => {
    //   var v = p.filter(x => x.status.toUpperCase() == this.constantsData.published);
    //   var lists = [];
    //   for (var i = 0; i < v.length; i++) {
    //     lists.push({ label: v[i].academicSessionName, value: v[i].academicSessionId });
    //   }
    //   this.academicSessionSelectItemList = lists.reduce((accumalator, current) => {
    //     if (!accumalator.some(x => x.label == current.label && x.value == current.value)) {
    //       accumalator.push(current);
    //     }
    //     return accumalator;
    //   }, []);
    // }, err => {
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
    // });
  }
  bindExamination() {
    // this.examinationSelectItemList = [];
    // var p = this.examinationService.getExaminationList()
    //   var v = p.filter(x => x.status.toUpperCase() == this.constantsData.published);
    //   this.examinationList = v;
    //   var lists = [];
    //   for (var i = 0; i < v.length; i++) {
    //     lists.push({ label: v[i].name, value: v[i].id });
    //   }
    //   this.examinationSelectItemList = lists.reduce((accumalator, current) => {
    //     if (!accumalator.some(x => x.label == current.label && x.value == current.value)) {
    //       accumalator.push(current);
    //     }
    //     return accumalator;
    //   }, []);
  }
  onMultiAcademicSessionIdChanged(event: any) {
    if ((event.target as HTMLSelectElement).value != null && (event.target as HTMLSelectElement).value.length > 0) {
      this.examinationProgramConfigurationSearch.academicSessionIds = [];
      this.examinationProgramConfigurationSearch.programIds = [];
      this.examinationProgramConfigurationSearch.operationalVerticalIds = [];
      // this.programNameSelectItemList = [];
      this.examinationProgramSearchFormGroup.value.programIds = [];
      this.examinationProgramSearchFormGroup.value.operationalVerticalIds = [];
      // this.operationalVerticalSelectItemList = [];

      // event.value.forEach(element => {
      //   this.examinationProgramConfigurationSearch.academicSessionIds.push(element.value);

      // });

      this.bindingPrograms(this.examinationProgramConfigurationSearch.academicSessionIds);

    }
  }
  onAcademicSessionIdChanged(event:any){

  }
  bindingPrograms(academicSessionIds: number[]) {
    // var list = [];
    // this.programNameSelectItemList = [];
    // for (var j = 0; j < this.examinationProgramConfigurationSearch.academicSessionIds.length; j++) {

    //   this.academicSessionProgramService.getByAcademicSessionIds(academicSessionIds[j]).subscribe(items => {
    //     for (var i = 0; i < items[`length`]; i++) {
    //       list.push({ label: items[i].programName, value: items[i].programId });
    //     }
    //     this.programNameSelectItemList = list.reduce((accumalator, current) => {
    //       if (!accumalator.some(x => x.label == current.label && x.value == current.value)) {
    //         accumalator.push(current);
    //       }

    //       return accumalator;
    //     }, []);
    //   });
    // }
  }
  onMultiProgramChanged(event: any) {
    if ((event.target as HTMLSelectElement).value != null && (event.target as HTMLSelectElement).value.length > 0) {
      this.examinationProgramConfigurationSearch.programIds = [];
      this.examinationProgramSearchFormGroup.value.operationalVerticalIds = [];
      // event.value.forEach(element => {
      //   this.examinationProgramConfigurationSearch.programIds.push(element.value);
      // });
      this.getOperationsVerticalExpandos();
    }
  }
  onProgramChanged(event:any){

  }
  getOperationsVerticalExpandos() {
    // var lists = [];
    // for (var j = 0; j < this.examinationProgramConfigurationSearch.academicSessionIds.length; j++) {
    //   for (var k = 0; k < this.examinationProgramConfigurationSearch.programIds.length; k++) {
    //     this.academicSessionProgramService.getOperationVerticalList(this.examinationProgramConfigurationSearch.academicSessionIds[j], this.examinationProgramConfigurationSearch.programIds[k]).subscribe(items => {
    //       this.operationalVerticals = items.filter(x => x.status.toUpperCase() == this.constantsData.published);
    //      
    //       for (var i = 0; i < this.operationalVerticals.length; i++) {
    //         lists.push({ label: this.operationalVerticals[i][`operationalVerticalName`], value: this.operationalVerticals[i][`operationalVerticalId`] });
    //       }
    //       this.operationalVerticalSelectItemList = lists.reduce((accumalator, current) => {
    //         if (!accumalator.some(x => x.label == current.label && x.value == current.value)) {
    //           accumalator.push(current);
    //         }
    //        
    //         return accumalator;
    //       }, []);
    //     })
    //   }
    // }

  }

  onMultiOperationalVerticalChanged(event:any) {
    if ((event.target as HTMLSelectElement).value != null && (event.target as HTMLSelectElement).value.length > 0) {
      this.examinationProgramConfigurationSearch.operationalVerticalIds = [];
      // event.value.forEach(element => {
      //   this.examinationProgramConfigurationSearch.operationalVerticalIds.push(element.value);
      // });
    }
  }
  onOperationalVerticalChanged(event:any){
    
  }

  async searchList() {

    this.searchEvent.emit(this.examinationProgramConfigurationSearch);
  }
  onLoadDataInitialization() {
    // this.breadcrumbService.setItems([
    //   { label: 'Masters' },
    //   { label: 'Examination Program Configuration' }
    // ]);
    // this.academicSessionSelectItemList = [];
    // this.programNameSelectItemList = [];
    // this.operationalVerticalSelectItemList = [];
  }
}
