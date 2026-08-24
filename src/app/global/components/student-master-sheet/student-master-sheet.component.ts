import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { StudentService } from 'src/app/global/services/big-leads/student.service';
import { CsvFileProcessService } from 'src/app/global/services/file-process/csv-file-process.service';
import { ExcelFileProcessService } from 'src/app/global/services/file-process/excel-file-process.service';
import { PdfFileProcessService } from 'src/app/global/services/file-process/pdf-file-process.service';
import { SharedModule } from '@/shared.module';
type StudentMasterSheetKeys = 'studentId' | 'studentName' | 'abcid' | 'academicSessionName' | 'programName' | 'operationalVerticalName' | 'programSpecializationName' | 'cgpa'

@Component({
  selector: 'app-student-master-sheet',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-master-sheet.component.html',
  styleUrl: './student-master-sheet.component.scss'
})
export class StudentMasterSheetComponent {
  @ViewChild('searchInput', { static: false }) searchInput: any;
  @Input() icon!: string;
  cols = [
    { field: 'studentId', header: 'Student Id', filterType: 'text' },
    { field: 'rollNumber', header: 'Roll Number', filterType: 'text' },
    { field: 'abcid', header: 'ABC Id', filterType: 'text' },
    { field: 'studentName', header: 'Student Name', filterType: 'text' },
    { field: 'academicSessionName', header: 'Academic Session', filterType: 'Number' },
    { field: 'programName', header: 'Program Id', filterType: 'Number' },
    { field: 'operationalVerticalName', header: 'Operational Vertical', filterType: 'Number' },
    { field: 'programSpecializationName', header: 'Program Specialization', filterType: 'Number' },
    { field: 'cgpa', header: 'CGPA', filterType: 'Number' },
  ];
  operationalVerticalExpandoList: any[] = [];
  programExpandoList: any[] = [];
  academicSessionExpandoList: any[] = [];
  programSpecializationExpandoList: any[] = []
  studentMasterSheet: any[] = []
  isLoading: boolean = true;
  skeletonValue: number[] = Array(4).fill(1);

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private excelFileProcessService: ExcelFileProcessService,
    private studentService: StudentService,
    private csvFileProcessService: CsvFileProcessService,
    private pdfFileProcessService: PdfFileProcessService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }
  clear(table: Table) {
    table.clear();
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
    }
  }
  getProgramName(id: number) {
    let programName = ''
    this.programExpandoList.map(item => {
      if (item.id == id) {
        programName = item.name ?? '';
      }
    })
    return programName;
  }
  getAcademicSessionName(id: number) {
    let academicSessionName = ''
    this.academicSessionExpandoList.map(item => {
      if (item.id == id) {
        academicSessionName = item.name ?? '';
      }
    })
    return academicSessionName;
  }
  getProgramSpecializationName(id: Number) {
    let programSpecializationName = '';
    this.programSpecializationExpandoList.map(item => {
      if (item.id == id) {
        programSpecializationName = item.name ?? ''
      }
    })
    return programSpecializationName;
  }
  getOvName(id: number) {
    let ovName = ''
    this.operationalVerticalExpandoList.map(item => {
      if (item.id == id) {
        ovName = item.name ?? '';
      }
    })
    return ovName;
  }

  getAll() {
    this.studentService.GetStudentMasterSheetData().subscribe(x => {
      this.studentMasterSheet = (x as unknown as { studentList: any[] }).studentList || [];
      this.operationalVerticalExpandoList = (x as unknown as { operationalVerticalExpandoList: any[] }).operationalVerticalExpandoList || [];
      this.academicSessionExpandoList = (x as unknown as { academicSessionExpandoList: any[] }).academicSessionExpandoList || [];
      this.programExpandoList = (x as unknown as { programExpandoList: any[] }).programExpandoList || [];
      this.programSpecializationExpandoList = (x as unknown as { programSpecializationExpandoList: any[] }).programSpecializationExpandoList || [];
      this.isLoading = false;
      this.studentMasterSheet.forEach(item => {
        item.programName = this.getProgramName(item.programId ?? 0);
        item.operationalVerticalName = this.getOvName(item.operationalVerticalId ?? 0);
        item.academicSessionName = this.getAcademicSessionName(item.academicSessionId ?? 0);
        item.programSpecializationName = this.getProgramSpecializationName(item.programSpecializationId ?? 0);
        item.cgpa = item.cgpa ? parseFloat(item.cgpa).toFixed(2) : "0.00";
      })
      // this.ovFeeComponent.forEach(item => {
      //   item.feeComponentName = this.getFeeComponentName(item.feeComponentId ?? 0);
      //   item.programName = this.getProgramName(item.programId ?? 0);
      //   item.operationalVerticalName = this.getOvName(item.operationalVerticalId ?? 0);
      //   item.effectiveFrom = new Date(item.effectiveFrom);
      // })
    })
  }


  exportExcel() {
    this.excelFileProcessService.exportAsExcelFile<any[]>(this.studentMasterSheet, "Student Master Sheet");
  }

  exportCSV() {
    this.csvFileProcessService.exportAsCsvFile<any[]>(this.studentMasterSheet, "Student Master Sheet");
  }

  exportPdf() {
    const columns: { header: string; dataKey: StudentMasterSheetKeys }[] = [
      { header: 'Student Id', dataKey: 'studentId' },
      { header: 'Student Name', dataKey: 'studentName' },
      { header: 'abcid', dataKey: 'abcid' },
      { header: 'Academic Session', dataKey: 'academicSessionName' },
      { header: 'Program', dataKey: 'programName' },
      { header: 'Operational Vertical', dataKey: 'operationalVerticalName' },
      { header: 'Program Specialization', dataKey: 'programSpecializationName' },
      { header: 'CGPA', dataKey: 'cgpa' }
    ];

    const data = this.studentMasterSheet.map(item => ({
      studentId: item.studentId ?? '',
      studentName: item.studentName ?? '',
      abcid: item.abcid ?? '',
      academicSessionName: item.academicSessionName ?? '',
      programName: item.programName ?? '',
      operationalVerticalName: item.operationalVerticalName ?? '',
      programSpecializationName: item.programSpecializationName ?? '',
      cgpa: item.cgpa?.toFixed(2) ?? ''
    }));

    this.pdfFileProcessService.exportAsPdfFile(data, this.cols, 'Student Master Sheet', 'landscape');
  }
}
