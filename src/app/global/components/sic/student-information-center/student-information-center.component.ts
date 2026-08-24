import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { StudentService } from 'src/app/global/services/big-leads/student.service';
import { SharedModule } from '@/shared.module';
import { BusHostelOptInOptOutComponent } from '../bus-hostel-opt-in-opt-out/bus-hostel-opt-in-opt-out.component';
import { RecentStudentSearchComponent } from "../recent-student-search/recent-student-search.component";
import { StudentAcademicReportComponent } from '../student-academic-report/student-academic-report.component';
import { StudentBacklogComponent } from "../student-backlog/student-backlog.component";
import { StudentBasicInformationComponent } from '../student-basic-information/student-basic-information.component';
import { StudentExaminationReportComponent } from '../student-examination-report/student-examination-report.component';
import { StudentFeeLedgerComponent } from '../student-fee-ledger/student-fee-ledger.component';
import { StudentGeneralInformationComponent } from '../student-general-information/student-general-information.component';
import { VerifyStudentABCIdComponent } from "../verify-student-abcid/verify-student-abcid.component";

@Component({
  selector: 'app-student-information-center',
  standalone: true,
  imports: [
    SharedModule,
    StudentGeneralInformationComponent,
    StudentAcademicReportComponent,
    StudentExaminationReportComponent,
    StudentBacklogComponent,
    VerifyStudentABCIdComponent,
    StudentBasicInformationComponent,
    BusHostelOptInOptOutComponent,
    RecentStudentSearchComponent,
    StudentFeeLedgerComponent
  ],
  templateUrl: './student-information-center.component.html',
  styleUrl: './student-information-center.component.scss'
})
export class StudentInformationCenterComponent implements OnInit, OnDestroy {
  componentName: string = 'Student Information Center';
  studentId: string = '';
  activeComponent: string = 'general';
  items: any[] = [];
  currentModule: string = '';
  showMenu: boolean = false;
  iconClass: string = '';
  renderComponent: boolean = false;
  displayRecent: boolean = false;
  recentStudents: { studentId: string; imageUrl: string; studentName: string }[] = [];

  // Backlog data state tracking
  backlogDataState: { hasData: boolean; isEmpty: boolean } = { hasData: true, isEmpty: false };
  forceRefreshBacklog: boolean = false;
  hasSearchInputChanged: boolean = false;

  private previousStudentId: string = '';
  private routeSub: Subscription | undefined;
  private searchSub: Subscription | undefined;
  private studentIdSubject = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private globalService: StudentService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof Scroll) {
        this.setIconClassBasedOnRoute(event.routerEvent.url);
      }
    });
  }

  ngOnInit(): void {
    this.recentStudents = this.getStudentsIdAndImageSession(); // Initialize recentStudents
    this.studentIdSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(newStudentId => {
      this.handleStudentIdChange(newStudentId);
    });

    this.routeSub = this.route.paramMap.pipe(
      debounceTime(300),
      distinctUntilChanged((prev, curr) => prev.get('studentId') === curr.get('studentId'))
    ).subscribe(params => {
      const newStudentId = params.get('studentId') || '';
      const reportType = params.get('reportType') || 'general';
      const moduleIndex = params.get('moduleIndex') || '0';
      this.currentModule = this.determineModule(this.router.url);

      if (newStudentId) {
        this.studentIdSubject.next(newStudentId);
        this.setActiveComponent(reportType, moduleIndex, false);
      } else {
        this.showMenu = false;
        this.renderComponent = false;
      }
    });

    this.items = [
      {
        label: 'Details',
        icon: 'fas fa-user-graduate',
        items: [
          { label: 'Personal Info', icon: 'pi pi-user', command: () => this.setActiveComponent('general', '0') }
        ]
      },
      {
        label: 'MindSpark',
        icon: 'fas fa-brain',
        items: [
          { label: 'Batch Attendance', icon: 'pi pi-book', command: () => this.setActiveComponent('academic', '1') }
        ]
      },
      {
        label: 'KnowledgeStand',
        icon: 'fas fa-book-open',
        items: [
          { label: 'Examination Report', icon: 'pi pi-file', command: () => this.setActiveComponent('examination', '2') },
          { label: 'Backlog', icon: 'pi pi-exclamation-triangle', command: () => this.setActiveComponent('backlog', '2') },
          { label: 'Verify Student ABC ID', icon: 'pi pi-verified', command: () => this.setActiveComponent('verify', '2') }
        ]
      },
      {
        label: 'FinPro',
        icon: 'fas fa-wallet',
        items: [
          { label: 'Fee Ledger', icon: 'pi pi-file', command: () => this.setActiveComponent('fee-ledger', '3') },
        ]
      },
      {
        label: 'Services',
        icon: 'fas fa-concierge-bell',
        items: [
          { label: 'Bus/Hostel Opt-In-Out', icon: 'pi pi-ticket', command: () => this.setActiveComponent('bus-hostel-opt-in-out', '4') },
        ]
      }
    ];
  }

  ngOnDestroy(): void {
    if (this.routeSub) this.routeSub.unsubscribe();
    if (this.searchSub) this.searchSub.unsubscribe();
    this.studentIdSubject.complete();
  }

  private handleStudentIdChange(newStudentId: string): void {
    if (newStudentId !== this.previousStudentId) {
      this.clearSessionStorage();
      this.studentId = newStudentId;
      this.previousStudentId = newStudentId;
      this.showMenu = true;
      this.renderComponent = true;
      // Reset backlog data state for new student
      this.backlogDataState = { hasData: true, isEmpty: false };
      // Update recentStudents from sessionStorage after student change
      this.recentStudents = this.getStudentsIdAndImageSession();
    }
    this.studentId = newStudentId;
    this.showMenu = true;
    this.renderComponent = true;
  }

  private getStudentsIdAndImageSession(): { studentId: string; imageUrl: string; studentName: string }[] {
    return JSON.parse(sessionStorage.getItem('studentIdAndImage') || '[]');
  }

  private determineModule(url: string): string {
    if (url.toLowerCase().includes('mindspark')) return 'mindspark';
    if (url.toLowerCase().includes('knowledgestand')) return 'knowledgestand';
    if (url.toLowerCase().includes('finpro')) return 'finpro';
    if (url.toLowerCase().includes('bigleads')) return 'bigleads';
    return 'default';
  }

  private clearSessionStorage() {
    if (this.previousStudentId) {
      sessionStorage.removeItem(`basic_student_${this.previousStudentId}`);
      sessionStorage.removeItem(`basic_studentProgram_${this.previousStudentId}`);
      sessionStorage.removeItem(`student_${this.previousStudentId}`);
      sessionStorage.removeItem(`studentFamily_${this.previousStudentId}`);
      sessionStorage.removeItem(`studentAddress_${this.previousStudentId}`);
      sessionStorage.removeItem(`studentBatchAttendanceSummary_${this.previousStudentId}`);
      sessionStorage.removeItem(`studentBatchAttendance_${this.previousStudentId}`);
      sessionStorage.removeItem(`studentBacklogHistory_${this.previousStudentId}`);
      // Preserve studentIdAndImage
    }
  }

  setActiveComponent(reportType: string, moduleIndex: string | null, navigate: boolean = true): void {
    let newComponent: string;

    switch (reportType.toLowerCase()) {
      case 'general':
        newComponent = 'general';
        break;
      case 'academic':
        newComponent = 'academic';
        break;
      case 'examination':
        newComponent = 'examination';
        break;
      case 'backlog':
        newComponent = 'backlog';
        break;
      case 'verify':
        newComponent = 'verify';
        break;
      case 'bus-hostel-opt-in-out':
        newComponent = 'bus-hostel-opt-in-out';
        break;
      case 'fee-ledger':
        newComponent = 'fee-ledger';
        break;
      default:
        newComponent = 'general';
        break;
    }

    if (this.activeComponent !== newComponent) {
      this.activeComponent = newComponent;
    }

    if (navigate && this.studentId) {
      const routePath = `/home/${this.currentModule}/reports/students/student-information-center/${reportType}/${this.studentId}/${moduleIndex || '0'}`;
      this.router.navigate([routePath], { replaceUrl: true, state: { reportType } });
    }
  }

  onStudentSearch(): void {
    if (this.studentId) {
      const isRetryClick = this.activeComponent === 'backlog' && this.backlogDataState.isEmpty && !this.hasSearchInputChanged;

      // Trigger API call only when retry button is clicked
      if (isRetryClick) {
        this.forceRefreshBacklog = !this.forceRefreshBacklog; // Toggle to trigger ngOnChanges for retry
        return;
      }

      this.hasSearchInputChanged = false;
      const moduleConfig: { [key: string]: { reportType: string; moduleIndex: string } } = {
        mindspark: { reportType: 'academic', moduleIndex: '1' },
        knowledgestand: {
          reportType: this.activeComponent === 'examination' || this.activeComponent === 'backlog' || this.activeComponent === 'verify'
            ? this.activeComponent
            : 'examination',
          moduleIndex: '2'
        },
        finpro: { reportType: 'fee-ledger', moduleIndex: '3' },
        bigleads: { reportType: 'general', moduleIndex: '0' },
      };

      const { reportType, moduleIndex } = moduleConfig[this.currentModule] || {
        reportType: 'general',
        moduleIndex: '0',
      };

      if (this.searchSub) this.searchSub.unsubscribe();
      this.searchSub = this.studentIdSubject.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(() => {
        this.router.navigate(
          [
            `/home/${this.currentModule}/reports/students/student-information-center/${reportType}/${this.studentId}/${moduleIndex}`,
          ],
          { replaceUrl: true }
        );
        this.showMenu = true;
        this.renderComponent = true;
      });
      this.studentIdSubject.next(this.studentId);
    }
  }

  onRecentSearch(): void {
    this.recentStudents = this.getStudentsIdAndImageSession(); // Ensure latest data before opening dialog
    this.displayRecent = true;
  }

  // Event handler for backlog data state changes
  onBacklogDataStateChange(dataState: { hasData: boolean; isEmpty: boolean }): void {
    this.backlogDataState = dataState;
  }

  onSearchInputChange(): void {
    this.hasSearchInputChanged = true;
  }

  getSearchButtonClass(): boolean {
    return this.activeComponent === 'backlog' && this.backlogDataState.isEmpty && !this.hasSearchInputChanged;
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