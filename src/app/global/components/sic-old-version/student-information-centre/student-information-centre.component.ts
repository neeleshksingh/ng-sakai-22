import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentAddressService } from 'src/app/big-leads/services/student-address.service';
import { StudentFamilyService } from 'src/app/big-leads/services/student-family.service';
import { BatchAttendanceService } from 'src/app/mind-spark/services/batch-attendance.service';
import { Student } from 'src/app/shared/models/bigleads/student';
import { StudentService } from '../../../services/big-leads/student.service';
import { ReportsService } from '../../../services/finance-pro/reports.service';
import { ExaminationResultService } from '../../../services/knowledge-stands/examination-result.service';
import { StudentProgramService } from '../../../services/mindspark/student-program.service';
import { StudentStatusService } from '../../../services/mindspark/student-status.service';

@Component({
  selector: 'app-student-information-centre',
  standalone: false,
  templateUrl: './student-information-centre.component.html',
  styleUrl: './student-information-centre.component.scss'
})
export class StudentInformationCentreComponent implements OnInit {
  studentGeneralDetails: Student = {};
  @Input() currentModuleNameToStudentInfoCentre!: string;
  currentModuleNameFromStudentInfoCentre!: string;

  studentId!: string;
  activeIndex!: number;
  isSearchPanelVisible: boolean = false;

  constructor(private studentService: StudentService,
    private studentStatusService: StudentStatusService,
    private studentFamilyService: StudentFamilyService,
    private studentAddressService: StudentAddressService,
    private studentProgramServiceService: StudentProgramService,
    private batchAttendanceService: BatchAttendanceService,
    private knowledgeStandService: ExaminationResultService,
    private accountsRepotsService: ReportsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.currentModuleNameFromStudentInfoCentre = this.currentModuleNameToStudentInfoCentre;
    this.route.paramMap.subscribe(params => {
      this.activeIndex = Number(params.get('activeTab'));
      this.studentId = params.get('studentId') ?? '';
    });
    if (!this.studentId && this.studentId == '') {
      this.isSearchPanelVisible = true;
    }
  }
  showSearchPanel() {
    this.isSearchPanelVisible = true;
    this.router.navigateByUrl("/home/" + this.currentModuleNameFromStudentInfoCentre + "/reports/students/student-information/");
  }
  studentIdSearch(studentId: string): void {
    this.isSearchPanelVisible = false;
    this.studentId = studentId;
    if (this.currentModuleNameToStudentInfoCentre == "mindspark") {
      this.activeIndex = 1;
    }
    else if (this.currentModuleNameToStudentInfoCentre == "knowledgestand") {
      this.activeIndex = 2;
    }
    else {
      this.activeIndex = 0;
    }
    if (studentId) {
      this.getStudentDetailsByStudentId(this.studentId);
    }
  }
  activeTab(activeTab: number) {
    this.activeIndex = activeTab;
    if (this.studentId && this.activeIndex >= 0) {
      this.getStudentDetailsByStudentId(this.studentId);
    }
  }
  getStudentDetailsByStudentId(studentId: string) {
    if (studentId) {
      if (this.activeIndex == 0 && this.studentService.studentId != this.studentId) {
        this.studentService.getByStudentId(studentId);
        this.studentStatusService.getByStudentId(studentId);
        this.studentAddressService.GetStudentAddressByStudentId(studentId);
        this.studentFamilyService.GetStudentFamilyByStudentId(studentId);
        this.studentService.studentId = studentId;

        if (this.studentProgramServiceService.studentId != this.studentId) {
          this.studentProgramServiceService.getStudentProgramByStudentId(studentId);
          this.studentProgramServiceService.studentId = studentId;

          if (this.studentService.studentId != this.studentId) {
            this.studentService.getByStudentId(studentId);
            this.studentStatusService.getByStudentId(studentId);
          }
        }
      }
      // if (this.activeIndex == 1 && this.batchAttendanceService.studentId != this.studentId) {
      //   this.batchAttendanceService.getStudentBatchAttendanceSummaryDataExpandoByStudentId(studentId);
      //   this.batchAttendanceService.getBatchAttendanceByStudentId(studentId, 5);
      //   this.batchAttendanceService.studentId = studentId;

      //   if (this.studentService.studentId != this.studentId) {
      //     this.studentService.getByStudentId(studentId);
      //     this.studentStatusService.getStudentStatusByStudentId(studentId);
      //   }
      // }
      if (this.activeIndex == 2 && this.knowledgeStandService.studentId != this.studentId) {
        this.knowledgeStandService.getStudentFullExaminationResultExpandoByStudentId(studentId);
        this.knowledgeStandService.getStudentExaminationResultExpandoByStudentId(studentId); // new code
        this.knowledgeStandService.studentId = studentId;

        if (this.studentService.studentId != this.studentId) {
          this.studentService.getByStudentId(studentId);
          this.studentStatusService.getByStudentId(studentId);
        }
      }
      if (this.activeIndex == 3 && this.knowledgeStandService.studentIdBacklogHistory != this.studentId) {
        this.knowledgeStandService.getStudentExaminationBacklogHistoryByStudentId(studentId);
        this.knowledgeStandService.studentIdBacklogHistory = studentId;

        if (this.studentService.studentId != this.studentId) {
          this.studentService.getByStudentId(studentId);
          this.studentStatusService.getByStudentId(studentId);
        }
      }
      if (this.activeIndex == 4 && this.studentProgramServiceService.studentId != this.studentId) {
        this.accountsRepotsService.getStudentFeeLedgerExpandoByRegistrationNumber(studentId);
        this.accountsRepotsService.studentId = studentId;
      }
      if (this.activeIndex == 5 && this.studentProgramServiceService.studentId != this.studentId) {
        this.studentProgramServiceService.getStudentProgramByStudentId(studentId);
        this.studentProgramServiceService.studentId = studentId;
      }
    }
  }
}
