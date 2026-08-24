import { DecimalPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import FileSaver from 'file-saver';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { SharedModule } from '@/shared.module';
import { viewType } from 'src/app/shared/models/commons/selectItems';
import { StudentExaminationRegistration } from 'src/app/shared/models/knowledge-stand/student-examination-registration';
import { StudentExaminationTopper, TopperStudent, TopperStudentRequest } from 'src/app/shared/models/knowledge-stand/topper-list';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AcademicSessionProgramService } from '../../services/cloudbytes/academic-session-program.service';
import { PdfFileProcessService } from '../../services/file-process/pdf-file-process.service';
import { OperationalVerticalService } from '../../services/finance-pro/operational-vertical.service';
import { ExaminationProgramService } from '../../services/knowledge-stands/examination-program.service';
import { ExaminationService } from '../../services/knowledge-stands/examination.service';
import { TopperListConfigurationService } from '../../services/knowledge-stands/topper-list-configuration.service';

@Component({
  selector: 'app-student-topper-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-topper-list.component.html',
  styleUrl: './student-topper-list.component.scss',
  providers: [DecimalPipe]
})
export class StudentTopperListComponent {
  componentName: string = 'Student Topper List';
  iconClass: string = '';
  @ViewChild('searchInput', { static: false }) searchInput: any;
  skeletonValue: number[] = Array(4).fill(1);
  cols: any[] = [];

  annualCols: any[] = [
    { header: 'StudentId', field: 'studentId', filterType: 'text', class: 'text-center' },
    { header: 'StudentName', field: 'studentName', filterType: 'text', class: 'text-center' },
    { header: 'AcademicSession', field: 'academicSessionName', filterType: 'text', class: 'text-center' },
    { header: 'Program', field: 'programName', filterType: 'text', class: 'text-center' },
    { header: 'SemesterRange', field: 'operationalVerticalName', filterType: 'text', class: 'text-center' },
    { header: 'TotalMarksObtained', field: 'totalMarksObtained', filterType: 'text', class: 'text-center' },
    { header: 'Percentage', field: 'percentage', filterType: 'text', class: 'text-center' },
    { header: 'Rank', field: 'rank', filterType: 'text', class: 'text-center' },
  ]

  semesterCols: any[] = [
    { header: 'StudentId', field: 'studentId', filterType: 'text', class: 'text-center' },
    { header: 'StudentName', field: 'studentName', filterType: 'text', class: 'text-center' },
    { header: 'AcademicSession', field: 'academicSessionName', filterType: 'text', class: 'text-center' },
    { header: 'Program', field: 'programName', filterType: 'text', class: 'text-center' },
    { header: 'SemesterRange', field: 'operationalVerticalName', filterType: 'text', class: 'text-center' },
    { header: 'SGPA', field: 'sgpa', filterType: 'text', class: 'text-center' },
    { header: 'CGPA', field: 'cgpa', filterType: 'text', class: 'text-center' },
    { header: 'TotalMarksObtained', field: 'totalMarksObtained', filterType: 'text', class: 'text-center' },
  ]
  globalFilterFields = this.cols.map(col => col.field);
  studentExaminationRegistrationList: StudentExaminationRegistration[] = [];
  ovsSearchFormGroupData: any;
  isLoading: boolean = false;
  displayTable: boolean = false;

  topperStudentSearchFormGroup!: FormGroup;
  examinationSelectItemList: SelectItem[] = [];
  academicSessionSelectItemList: SelectItem[] = [];
  programSelectItemList: SelectItem[] = [];
  operationalVerticalSelectItemList: SelectItem[] = [];

  isHiddenStudentPrograms: boolean = true;

  studentExaminationTopper?: StudentExaminationTopper;
  topperStudentRequest: TopperStudentRequest = {};
  topperStudents: TopperStudent[] = [];
  programName?: string;
  operationalVerticalName?: string;
  examinationName?: string;
  academicSessionName?: string;
  tableView: Boolean = false;
  topRank: number = 20;
  totalRecordCount: number = 0;
  totalSearchResultCount: number = 0;
  rowsToDisplay: number = 10;
  isFirst = 1;
  viewTypeList: SelectItem[] = viewType;

  operationalVerticalRange?: string;
  examinationList: any = [];
  viewType?: string;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private examinationService: ExaminationService,
    private examinationProgramService: ExaminationProgramService,
    private academicSessionProgramService: AcademicSessionProgramService,
    private operationalVerticalService: OperationalVerticalService,
    private topperListConfigurationService: TopperListConfigurationService,
    public decimalPipe: DecimalPipe,
    private utilitySerice: UtilityService,
    private pdfFileProcessService: PdfFileProcessService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof Scroll) {
        this.setIconClassBasedOnRoute(event.routerEvent.url);
      }
    });
  }



  ngOnInit(): void {
    this.initializeTopperStudentSearchFormGroup();
    this.getExaminationList();
  }

  initializeTopperStudentSearchFormGroup() {
    this.topperStudentSearchFormGroup = this.fb.group({
      id: 0,
      examinationId: [''],
      academicSessionId: [''],
      programId: [''],
      operationalVerticalId: [''],
    });
  }

  clear(table: Table) {
    table.clear();
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
    }
  }

  onChangeViewType(event: any) {
    this.viewType = event.value;
    this.examinationSelectItemList = [];
    this.academicSessionSelectItemList = [];
    this.programSelectItemList = [];
    this.operationalVerticalSelectItemList = [];
    this.topperStudentSearchFormGroup.reset();
    this.studentExaminationTopper = {};
    this.topperStudents = [];
    this.displayTable = false;
    var list = [];
    for (var i = 0; i < this.examinationList.length; i++) {
      list.push({ label: this.examinationList[i].name, value: this.examinationList[i].id });
    }

    this.examinationSelectItemList = this.utilitySerice.reduceDuplicates(list);
    this.examinationSelectItemList = this.examinationSelectItemList.sort((a, b) => (b.label ?? '').localeCompare(a.label ?? ''));

    let arr: any = [];
    if (this.viewType === "Annual") {
      this.cols = this.annualCols;
      this.examinationSelectItemList.filter((items) => {
        if (items.label?.includes("END SEM") && items.label.includes("EVEN")) {
          arr.push(items)
        }
      })
    } else {
      this.cols = this.semesterCols;
      this.examinationSelectItemList.filter((items) => {
        if (items.label?.includes("END SEM")) {
          arr.push(items)
        }
      })
    }
    this.initializeTopperStudentSearchFormGroup();
    this.examinationSelectItemList = arr;

  }

  getExaminationList() {
    this.examinationService.getAll().subscribe({
      next: x => {
        this.examinationList = x
      },
      error: e => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error.message, life: 3000 });
      }
    })
  }

  onChangeExamination(event: any) {
    this.academicSessionSelectItemList = [];
    this.programSelectItemList = [];
    this.operationalVerticalSelectItemList = [];
    this.isHiddenStudentPrograms = true;
    this.displayTable = false;
    this.getAcademicSessionListByExaminationId(event.value);
  }

  onChangeAcademicSession(event: any) {
    this.programSelectItemList = [];
    this.operationalVerticalSelectItemList = [];
    this.isHiddenStudentPrograms = true;
    this.displayTable = false;
    this.getProgramListByAcademicSessionId(event.value);
  }

  onChangeProgram(event: any) {
    this.operationalVerticalSelectItemList = [];
    this.isHiddenStudentPrograms = true;
    this.displayTable = false;
    this.getOperationalVerticalListByProgramId(event.value);
  }

  getAcademicSessionListByExaminationId(examinationId: number) {
    this.academicSessionSelectItemList = [];

    this.examinationProgramService.getByExaminationId(examinationId).subscribe(x => {
      var list: any = [];
      for (var i = 0; i < x.length; i++) {
        list.push({ label: x[i].academicSessionName, value: x[i].academicSessionId });
      }

      this.academicSessionSelectItemList = this.utilitySerice.reduceDuplicates(list);

      this.academicSessionSelectItemList = this.academicSessionSelectItemList.sort((a, b) => (a.label ?? '').localeCompare(b.label ?? ''));
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
    });
  }


  getProgramListByAcademicSessionId(academicSessionId: number) {
    this.programSelectItemList = [];
    var academicSessionIds = [];
    academicSessionIds.push(academicSessionId);

    this.academicSessionProgramService.getByAcademicSessionIds(academicSessionIds).subscribe({
      next: (x: any) => {
        this.programSelectItemList = x;

        this.programSelectItemList = this.programSelectItemList.sort((a, b) => (a.label ?? '').localeCompare(b.label ?? ''));
      }, error: error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    });
  }

  getOperationalVerticalListByProgramId(programId: number) {
    this.operationalVerticalSelectItemList = [];
    this.operationalVerticalService.getByProgramId(programId).subscribe((x: any[]) => {
      var list: any = [];
      let filteredX = x;
      if (this.viewType === "Annual") {
        filteredX = x.filter(item => (item.id ?? 0) % 2 == 0);
      }
      for (var i = 0; i < filteredX.length; i++) {
        list.push({ label: filteredX[i].name, value: filteredX[i].id });
      }

      this.operationalVerticalSelectItemList = this.utilitySerice.reduceDuplicates(list);
      this.operationalVerticalSelectItemList = this.operationalVerticalSelectItemList.sort((a, b) => (a.label ?? '').localeCompare(b.label ?? ''));
    });
  }

  getOperationalVerticalRange(id: number) {
    if (id >= 1 && id <= 2) {
      return 'Semester I & Semester II';
    } else if (id >= 3 && id <= 4) {
      return 'Semester III & Semester IV';
    } else if (id >= 5 && id <= 6) {
      return 'Semester V & Semester VI';
    } else if (id >= 7 && id <= 8) {
      return 'Semester VII & Semester VIII';
    } else if (id >= 9 && id <= 10) {
      return 'Semester IX & Semester X';
    } else {
      return 'Unknown';
    }
  }

  SearchTopper() {
    this.displayTable = true;
    this.isLoading = true;
    this.topperStudentRequest.examinationId = this.topperStudentSearchFormGroup.value.examinationId;
    this.topperStudentRequest.academicSessionId = this.topperStudentSearchFormGroup.value.academicSessionId;
    this.topperStudentRequest.programId = this.topperStudentSearchFormGroup.value.programId;
    this.topperStudentRequest.operationalVerticalId = this.topperStudentSearchFormGroup.value.operationalVerticalId;
    this.topperStudentRequest.topRank = this.topRank;

    this.topperListConfigurationService.GetStudentExaminationTopperByStudentExaminationTopperSearchRequest(this.topperStudentRequest, (this.viewType ?? 'Annual')).subscribe({
      next: x => {
        this.operationalVerticalName = x.operationalVerticalName;
        this.academicSessionName = x.academicSessionName;
        this.programName = x.programName;
        this.studentExaminationTopper = x;
        this.topperStudents = x.topperStudents ?? [];
        this.totalRecordCount = this.studentExaminationTopper.topperStudents?.length ?? 0;
        this.totalSearchResultCount = this.studentExaminationTopper.topperStudents?.length ?? 0;
        if (this.studentExaminationTopper.topperStudents && this.studentExaminationTopper.topperStudents.length > 0) {
          this.displayTable = true;
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.displayTable = false;
        }
        this.operationalVerticalRange = this.getOperationalVerticalRange(this.topperStudentRequest.operationalVerticalId ?? 0);
      }, error: error => {
        this.isLoading = false;
        this.displayTable = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    });

  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      let dataToExport = this.studentExaminationTopper?.topperStudents;
      let filename: string;
      if (this.viewType === "Annual") {
        filename = "Topper List (Annual) - " + this.programName + "(" + this.academicSessionName + ")" + " - " + this.operationalVerticalName + ".xlsx";
        dataToExport = dataToExport?.map(student => {
          const loweredStudent = Object.keys(student).reduce((acc, key) => {
            acc[key.toLowerCase()] = (student as any)[key];
            return acc;
          }, {} as Record<string, any>);

          const studentWithPercentageAndRank = {
            studentId: loweredStudent['studentid'],
            studentName: loweredStudent['studentname'],
            academicSessionName: this.academicSessionName,
            program: this.programName,
            semesterRange: this.operationalVerticalRange,
            totalMarksObtained: loweredStudent['totalmarksobtained'],
            percentage: loweredStudent['percentage'] ? loweredStudent['percentage'].toFixed(2) : '0.00',
            rank: loweredStudent['rank']
          };

          return studentWithPercentageAndRank as TopperStudent;
        });
      } else {
        filename = "Topper List (semester)- " + this.programName + "(" + this.academicSessionName + ")" + " - " + this.operationalVerticalName + ".xlsx";
        dataToExport = dataToExport?.map(student => {
          const loweredStudent = Object.keys(student).reduce((acc, key) => {
            acc[key.toLowerCase()] = (student as any)[key];
            return acc;
          }, {} as Record<string, any>);

          const studentWithAllFields = {
            studentId: loweredStudent['studentid'],
            studentName: loweredStudent['studentname'],
            academicSessionName: this.academicSessionName,
            program: this.programName,
            semesterRange: this.operationalVerticalRange,
            sgpa: loweredStudent['sgpa'],
            cgpa: loweredStudent['cgpa'],
            totalMarksObtained: loweredStudent['totalmarksobtained']
          };

          return studentWithAllFields as TopperStudent;
        });
      }

      const worksheet = xlsx.utils.json_to_sheet(dataToExport || []);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, filename);
    });
  }
  exportPdf() {
    if (this.viewType == 'Annual') {
      const annualData = this.topperStudents.map(item => ({
        studentId: item.studentId ?? '',
        studentName: item.studentName ?? '',
        academicSessionName: this.academicSessionName ?? '',
        program: this.programName ?? '',
        semesterRange: this.operationalVerticalRange ?? '',
        totalMarksObtained: item.totalMarksObtained ?? '',
        percentage: item.percentage ?? '',
        rank: item.rank ?? ''
      }));

      this.pdfFileProcessService.exportAsPdfFile(annualData, this.annualCols, 'Student Examination Topper', 'landscape');
    } else {
      const semesterData = this.topperStudents.map(item => ({
        studentId: item.studentId ?? '',
        studentName: item.studentName ?? '',
        academicSessionName: this.academicSessionName ?? '',
        program: this.programName ?? '',
        semesterRange: this.operationalVerticalRange ?? '',
        sgpa: item.sgpa ?? '',
        cgpa: item.cgpa ?? '',
        totalMarksObtained: item.totalMarksObtained ?? ''
      }));

      this.pdfFileProcessService.exportAsPdfFile(semesterData, this.semesterCols, 'Student Examination Topper', 'landscape');
    }
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  setIconClassBasedOnRoute(url: string) {
    if (url.includes('home/smallbizgurus')) {
      this.iconClass = 'fas fa-handshake';
    } else if (url.includes('home/cloudbytes')) {
      this.iconClass = 'fas fa-cloud';
    } else if (url.includes('home/dashboard')) {
      this.iconClass = 'fas fa-home';
    } else if (url.includes('home/bigleads')) {
      this.iconClass = 'fas fa-briefcase';
    } else if (url.includes('home/mindspark')) {
      this.iconClass = 'fas fa-brain';
    } else if (url.includes('home/knowledgestand')) {
      this.iconClass = 'fas fa-book-open';
    } else if (url.includes('home/finpro')) {
      this.iconClass = 'fas fa-indian-rupee-sign';
    } else if (url.includes('home/executiveedge')) {
      this.iconClass = 'fas fa-user-tie';
    } else if (url.includes('home/digitalfingers')) {
      this.iconClass = 'fas fa-user-gear';
    } else if (url.includes('home/timeclockplus')) {
      this.iconClass = 'fas fa-calendar-days';
    } else if (url.includes('home/virtuallearn')) {
      this.iconClass = 'fas fa-atlas';
    } else if (url.includes('home/inventorymatrix')) {
      this.iconClass = 'fas fa-warehouse';
    } else if (url.includes('home/faq')) {
      this.iconClass = 'fas fa-person-circle-question';
    } else {
      this.iconClass = 'fas fa-cog';
    }
  }
}