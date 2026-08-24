import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { BehaviorSubject, debounceTime, filter, interval, Subject, Subscription, takeUntil } from 'rxjs';
import { StudentDashboardNoticeComponent } from "src/app/global/components/student-dashboard-notice/student-dashboard-notice.component";
import { WelcomeLetterComponent } from "src/app/global/components/welcome-letter/welcome-letter.component";
import { AlertDialogItem } from 'src/app/global/components/alert-dialog/alert-dialog.component';

import { OperationalVerticalSubjectConfiguration } from 'src/app/shared/models/cloudbytes/operational-vertical-subject-configuration';
import { SubjectPaperCodeExpando } from 'src/app/shared/models/commons/expandos';
import { PartnerAppSetting } from 'src/app/shared/models/developers/partner-app-setting';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { StudentAttendanceSummary } from 'src/app/shared/models/students/student-attendance-summary';
import { StudentBatchAttendanceSummaryDataExpando, StudentDashboardAttendanceGraphData } from 'src/app/shared/models/students/student-dashboard';
import { SubjectPaperCodeSummary } from 'src/app/shared/models/students/subject-paper-code-summary';
import { StudentProgramActions } from 'src/app/store/actions/student-program.actions';
import { selectStudentPrograms, selectStudentProgramsLoaded } from 'src/app/store/selectors/student-program.selectors';
import { EmailService } from '../services/email.service';
import { OperationalVerticalSubjectConfigurationService } from '../services/operational-vertical-subject-configuration.service';
import { PartnerAppSettingService } from '../services/partner-app-setting-service.service';
import { StudentDashboardService } from '../services/student-dashboard.service';
import { StudentProgramPaperCodeAllocationService } from '../services/student-program-paper-code-allocation.service';
import { StudentService } from '../services/student.service';
import { UniversityFeedComponent } from '../components/university-feed/university-feed.component';
import { SharedModule } from '@/shared.module';
import { LayoutService } from '@/app/layout/service/layout.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [SharedModule, WelcomeLetterComponent, StudentDashboardNoticeComponent, UniversityFeedComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

    private destroy$ = new Subject<void>();
    @ViewChild('shakyImage') shakyImage!: ElementRef;
    overviewChartData: any;

    overviewChartOptions: any;

    revenueChartData: any;

    revenueChartOptions: any;
    data: any;
    options: any;
    processedAttendanceData: StudentAttendanceSummary[] = [];
    StudentBatchAttendanceSummaryResponse: any;
    overviewWeeks: any;
    selectedOverviewWeek: any;

    subscription: Subscription;
    studentDashboardAttendanceGraphData: StudentDashboardAttendanceGraphData = {};
    studentBatchAttendanceSummaryDataExpandoList: StudentBatchAttendanceSummaryDataExpando = {};

    studentAttendanceSummaryList: StudentAttendanceSummary[] = [];
    subjectPaperCodeExpando: SubjectPaperCodeExpando[] = [];
    subjectPaperCodeSummaryList: SubjectPaperCodeSummary[] = [];
    subjectPaperCodeExpandoList: SubjectPaperCodeExpando[] = [];

    studentId: string = "";
    notices: any = [];
    partnerAppSetting: PartnerAppSetting[] = [];
    isStudentInStartSemester: boolean = false;
    isWelcomeLetterDialogVisible: boolean = false;
    welcomeLetterAsHtml: string = "";
    tiles: any[] = [];
    visible: boolean = false;
    visible1: boolean = false;
    fullNotice: any[] = [];
    pdf!: SafeResourceUrl;
    studentName: string = '';
    basicOptions: any;
    studentTileInfo: StudentTileInfo = {};
    studentGroupName: string | undefined;
    studentGroupColor: string | undefined;

    // Emojis chosen to reflect each group's namesake; 🌉 honours Visvesvaraya's iconic dam & bridge engineering
    readonly studentGroupEmojiMap: Record<string, string> = {
        'Patanjali': '🧘',
        'Ramanujan': '∞',
        'Chanakya': '♟️',
        'Visvesvaraya': '🌉'
    };

    readonly studentGroupDescriptionMap: Record<string, string> = {
        'Patanjali': 'Father of Yoga & author of the Yoga Sutras',
        'Ramanujan': 'Self-taught mathematical genius',
        'Chanakya': 'Ancient strategist, economist & royal advisor',
        'Visvesvaraya': 'Pioneer engineer & architect of modern India'
    };

    // Richer display colors — raw API color names are too bright/flat
    readonly studentGroupColorOverrideMap: Record<string, string> = {
        'Green': '#15803d',
        'Blue': '#1e40af',
        'Orange': '#c2410c',
        'Purple': '#7c3aed'
    };

    // Fallback: derive color from group name if API returns no color
    readonly studentGroupNameColorMap: Record<string, string> = {
        'Patanjali': '#15803d',
        'Ramanujan': '#1e40af',
        'Chanakya': '#c2410c',
        'Visvesvaraya': '#7c3aed'
    };

    getStudentGroupEmoji(): string {
        return this.studentGroupName ? (this.studentGroupEmojiMap[this.studentGroupName] ?? '👥') : '';
    }

    getStudentGroupDescription(): string {
        return this.studentGroupName ? (this.studentGroupDescriptionMap[this.studentGroupName] ?? '') : '';
    }

    getStudentGroupDisplayColor(): string {
        if (this.studentGroupColor && this.studentGroupColorOverrideMap[this.studentGroupColor]) {
            return this.studentGroupColorOverrideMap[this.studentGroupColor];
        }
        if (this.studentGroupName && this.studentGroupNameColorMap[this.studentGroupName]) {
            return this.studentGroupNameColorMap[this.studentGroupName];
        }
        return this.studentGroupColor || '#6366f1';
    }

    operationalVerticalList: SelectItem[] = [];
    attendanceGraphOv: any = 'Attendance : Semester ';
    selectedSemester: any;

    // #region semester registration dialog related properties
    totalNumberOfPaperCodeAllowed: number = 0;
    msgSemesterAlreadyRegistred: string = '';
    msgSemesterNotRegistred: string = '';
    operationalVerticalSubjectConfigurations: OperationalVerticalSubjectConfiguration[] = [];
    isSemesterRegistrationDialogVisible: boolean = false;
    isParkingPolicyModalVisible: boolean = false;
    isScholarshipPdfVisible: boolean = false;
    private readonly CHECK_INTERVAL = 60000 * 15; // 15 minutes
    private registrationCheckTimer!: Subscription;
    // #endregion
    isAdmitCardPopupVisible: boolean = true;
    isGoogleFormVisible: boolean = true;
    isCgpaConversionCertificateVisible: boolean = false;
    private pendingWelcomeLetterDialog: boolean = false;
    isPriorityAlertBlocking: boolean = true;
    dashboardPriorityAlerts: AlertDialogItem[] = [
        {
            id: 'sbu-online-classes-2026-08-11',
            type: 'warning',
            title: 'SBU Alert',
            subtitle: 'Highest Priority',
            message: "SBU alert: Today's classes (11 Aug) will be held Online. Contact the respective Subject Faculty for class details. Semester I students, please check your email.",
            startsAt: new Date(2026, 7, 11, 0, 0, 0),
            expiresAt: new Date(2026, 7, 12, 3, 0, 0),
            priority: 100,
            actionLabel: 'I Understand'
        }
    ];

    private currentUserSubject!: BehaviorSubject<LoginResponse>;

    speedDialActions: MenuItem[] = [
        {
            icon: 'pi pi-file',
            tooltipOptions: { tooltipLabel: 'Open Google Form' },
            command: () => this.openGoogleForm()
        },
        {
            icon: 'pi pi-comments',
            tooltipOptions: { tooltipLabel: 'Parking Policy' },
            command: () => this.openParkingPolicyModal()
        },
    ];

    googleFormUrl: SafeResourceUrl;

    // #region Constructor
    constructor(public layoutService: LayoutService,
        private studentDashboardService: StudentDashboardService,
        private messageService: MessageService,
        private sanitizer: DomSanitizer,
        private partnerAppSettingService: PartnerAppSettingService,
        private emailService: EmailService,
        private operationalVerticalSubjectConfigurationService: OperationalVerticalSubjectConfigurationService,
        private studentProgramPaperCodeAllocationService: StudentProgramPaperCodeAllocationService,
        private router: Router,
        private studentService: StudentService,
        @Inject('Store') private store: Store
    ) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initCharts();
            });

        this.googleFormUrl =
            this.sanitizer.bypassSecurityTrustResourceUrl(
                'https://forms.gle/XmDDNHj1GwJ73CZG6'
            );
    }

    // #endregion

    // #region Lifecycle Hooks
    ngOnInit() {
        this.initCharts();
        this.getStudentDashboardTiles();
        this.getStudentBatchAttendanceSummary();
        var data = localStorage.getItem('currentUser');
        if (data) {
            const parsedData = JSON.parse(data);
            this.currentUserSubject = new BehaviorSubject<LoginResponse>(parsedData);
            this.studentId = this.currentUserSubject.value.applicationUser.userName ?? '';
            this.studentName = this.currentUserSubject.value.applicationUser.displayName ?? '';
        }
        this.getStudentNotice();
        this.isStudentWelcomeLetterEnabled();
        this.getStudentGroupInfo();
        // this.getStudentBatchAttendanceSummary();
        this.overviewWeeks = [
            //   {name: 'Last Week', code: '0'}, 
            //   {name: 'This Week', code: '1'}
        ];
        this.selectedOverviewWeek = this.overviewWeeks[0]
        if (sessionStorage.getItem('PDFNOTICE') == null) {
            sessionStorage.setItem('PDFNOTICE', 'true');
            this.visible1 = true
        }
        this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/Partner_Documents/P10001/Notice.pdf');

        const hasPopupBeenShown = sessionStorage.getItem('admitCardPopupShown') === 'true';
        if (hasPopupBeenShown) {
            this.isAdmitCardPopupVisible = false;
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.stopRegistrationCheckTimer();
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngAfterViewInit(): void {
        // Start the periodic shaking
        setInterval(() => {
            if (this.shakyImage) {
                this.shakyImage.nativeElement.classList.add('shaking');
                setTimeout(() => {
                    this.shakyImage.nativeElement.classList.remove('shaking');
                }, 2000); // Shake for 2 seconds
            }
        }, 5000); // Every 5 seconds
    }

    // #endregion

    onClose(): void {
        this.isAdmitCardPopupVisible = false;
        sessionStorage.setItem('admitCardPopupShown', 'true');
    }

    downloadAdmitCard(): void {
        this.router.navigateByUrl('/home/students/admit-card');
        sessionStorage.setItem('admitCardPopupShown', 'true');
    }

    onPriorityAlertsHandled(): void {
        this.isPriorityAlertBlocking = false;
        this.showWelcomeLetterDialogIfEligible();
    }

    private showWelcomeLetterDialogIfEligible(): void {
        if (this.pendingWelcomeLetterDialog && !this.isPriorityAlertBlocking) {
            this.isWelcomeLetterDialogVisible = true;
            this.pendingWelcomeLetterDialog = false;
        }
    }

    private startRegistrationCheckTimer(): void {
        this.stopRegistrationCheckTimer();

        this.registrationCheckTimer = interval(this.CHECK_INTERVAL)
            .subscribe(() => {
                this.store.dispatch(StudentProgramActions.refreshStudentPrograms());
            });
    }

    private stopRegistrationCheckTimer(): void {
        if (this.registrationCheckTimer) {
            this.registrationCheckTimer.unsubscribe();
        }
    }

    getStudentGroupInfo(): void {
        this.studentService.GetStudentProfile().subscribe({
            next: (data) => {
                this.studentGroupName = data.studentGroupName;
                this.studentGroupColor = data.studentGroupColor;
            },
            error: () => { /* non-critical — group badge simply won't show */ }
        });
    }

    getStudentDashboardTiles() {
        this.studentDashboardService.getStudentDashboardTiles().subscribe({
            next: (data) => {
                this.tiles = data;
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
            }
        })
    }

    // getStudentBatchAttendanceSummary() {
    //     const TIMEOUT_DURATION = 10000; 

    //     this.studentDashboardService.getStudentBatchAttendanceSummary()
    //         .pipe(
    //             timeout(TIMEOUT_DURATION), 
    //             catchError((error) => {
    //                 if (error.name === 'TimeoutError') {
    //                     this.messageService.add({ severity: 'error', summary: 'Timeout', detail: 'The request took too long to respond.', life: 3000 });
    //                 } else {
    //                     this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error?.message || 'An error occurred.', life: 3000 });
    //                 }
    //                 return throwError(() => error); 
    //             })
    //         )
    //         .subscribe({
    //             next: (data) => {
    //     
    //             },
    //             error: (error) => {
    //                 console.error('Error occurred:', error); 
    //             }
    //         });
    // }

    getStudentNotice() {
        this.studentDashboardService.getStudentNoticeByStudentId(this.studentId)
            .subscribe({
                next: (data) => {
                    if (data) {
                        this.notices = data.sort((a: any, b: any) => new Date(b.noticeDate).getTime() - new Date(a.noticeDate).getTime()).slice(0, Math.min(data.length, 6));
                        this.fullNotice = data.sort((a: any, b: any) => new Date(b.noticeDate).getTime() - new Date(a.noticeDate).getTime());
                    }
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
                }
            })
    }

    showDialog() {
        this.visible = true;
    }

    openParkingPolicyModal() {
        this.isParkingPolicyModalVisible = true;
    }

    openGoogleForm() {
        window.open('https://forms.gle/XmDDNHj1GwJ73CZG6', '_blank');
    }

    isStudentWelcomeLetterEnabled() {
        this.partnerAppSettingService.getByName("IsStudentWelcomeLetterEnabled").subscribe({
            next: (response) => {
                this.partnerAppSetting = response;
                if (this.partnerAppSetting[0].value) {
                    this.store.dispatch(StudentProgramActions.loadStudentPrograms());
                    this.subscribeToStudentPrograms();
                }
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
            }
        })
    }

    // #region Student Program and Welcome Letter

    /**
     * Subscribes to the student programs from the NgRx store.
     * All derived logic (tile info, welcome letter, semester registration)
     * remains unchanged — it just reads from the store-provided data.
     */
    private subscribeToStudentPrograms(): void {
        this.store.select(selectStudentPrograms).pipe(
            takeUntil(this.destroy$),
            filter((programs) => programs.length > 0)
        ).subscribe((response) => {
            this.handleStudentProgramsData(response);
        });
    }

    private handleStudentProgramsData(response: any[]): void {
        const currentSemester = response.find((program: any) => program.isCurrentOperationalVertical);
        if (currentSemester?.isCurrentOperationalVertical === true) {
            this.studentTileInfo = {
                studentId: currentSemester.studentId ?? '',
                section: currentSemester.section ?? '',
                rollNumber: currentSemester.rollNumber ?? '',
                studentName: currentSemester.studentName ?? '',
                programName: currentSemester.programName ?? ''
            }

            this.studentSemesterRegistrationCheck(currentSemester.academicSessionId ?? 0, currentSemester.programId ?? 0, currentSemester.operationalVerticalId ?? 0, currentSemester.registrationNumber ?? '');
        }
        const hasWelcomeLetterBeenShown = sessionStorage.getItem('welcomeLetterShown') === 'true';
        const isFirstSemesterCurrent = response.some(
            (program: any) => program.isCurrentOperationalVertical && program.operationalVerticalId === 1
        );
        this.isStudentInStartSemester = isFirstSemesterCurrent;
        this.pendingWelcomeLetterDialog = isFirstSemesterCurrent && !hasWelcomeLetterBeenShown;
        this.isWelcomeLetterDialogVisible = false;
        this.showWelcomeLetterDialogIfEligible();

        if (this.pendingWelcomeLetterDialog || this.isWelcomeLetterDialogVisible) {
            sessionStorage.setItem('welcomeLetterShown', 'true');

            if (sessionStorage.getItem('htmlContent') == null) {
                this.getStudentWelcomeLetterAsHtmlByRegistrationNumber();
            }
        }
    }

    getStudentWelcomeLetterAsHtmlByRegistrationNumber() {
        this.welcomeLetterAsHtml = "";
        this.emailService.getStudentWelcomeLetterAsHtmlByRegistrationNumber(this.studentId).subscribe({
            next: (html) => {
                this.welcomeLetterAsHtml = html;
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
            }
        })
    }

    sendWelcomeMail() {
        this.emailService.sendStudentWelcomeLetterByRegistrationNumber(this.studentId).subscribe({
            next: (data) => {
                this.isWelcomeLetterDialogVisible = false;
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
            }
        })

    }
    closeWelcomeLetterDialog() {
        this.isWelcomeLetterDialogVisible = false;
    }

    // #endregion

    // #region Charts Initialization
    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const primaryColor = documentStyle.getPropertyValue('--primary-color');
        const primaryColor300 = documentStyle.getPropertyValue('--primary-200');
        const borderColor = documentStyle.getPropertyValue('--surface-border');

        this.overviewChartData = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            datasets: [
                {
                    label: 'Organic',
                    data: [2, 1, 0.5, 0.6, 0.5, 1.3, 1],
                    borderColor: [
                        primaryColor
                    ],
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'transparent',
                    type: 'line',
                    fill: false,
                },
                {
                    label: 'Referral',
                    data: [4.88, 3, 6.2, 4.5, 2.1, 5.1, 4.1],
                    backgroundColor: [this.layoutService.config().colorScheme === 'dark' ? '#879AAF' : '#E4E7EB'],
                    hoverBackgroundColor: [primaryColor300],
                    fill: true,
                    borderRadius: 10,
                    borderSkipped: 'top bottom',
                    barPercentage: 0.3
                }
            ]
        };

        this.overviewChartOptions = {
            plugins: {
                legend: {
                    position: 'bottom',
                    align: 'end',
                    labels: {
                        color: textColorSecondary
                    }
                }
            },
            responsive: true,
            hover: {
                mode: 'index'
            },
            scales: {
                y: {
                    max: 7,
                    min: 0,
                    ticks: {
                        stepSize: 0,
                        callback: function (value: number, index: number) {
                            if (index === 0) {
                                return value;
                            }
                            else {
                                return value + 'k';
                            }
                        },
                        color: textColorSecondary
                    },
                    grid: {
                        borderDash: [2, 2],
                        color: borderColor,
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        beginAtZero: true,
                        color: textColorSecondary
                    }
                }
            }
        };

        this.revenueChartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    data: [11, 17, 30, 60, 88, 92],
                    borderColor: 'rgba(25, 146, 212, 0.5)',
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'transparent',
                    fill: false,
                    tension: .4
                },
                {
                    data: [11, 19, 39, 59, 69, 71],
                    borderColor: 'rgba(25, 146, 212, 0.5)',
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'transparent',
                    fill: false,
                    tension: .4
                },
                {
                    data: [11, 17, 21, 30, 47, 83],
                    backgroundColor: 'rgba(25, 146, 212, 0.2)',
                    borderColor: 'rgba(25, 146, 212, 0.5)',
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'transparent',
                    fill: true,
                    tension: .4
                }
            ]
        };

        this.revenueChartOptions = {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    grid: {
                        color: borderColor
                    },
                    max: 100,
                    min: 0,
                    ticks: {
                        color: textColorSecondary
                    }
                },
                x: {
                    grid: {
                        color: borderColor
                    },
                    ticks: {
                        color: textColorSecondary,
                        beginAtZero: true
                    }
                }
            }
        };
    }

    onSemesterChange(event: any) {
        if (event.value) {
            this.updateChartForSemester(event.value);
        }
    }

    get colorScheme(): string {
        return this.layoutService.config().colorScheme;
    }

    barBasicOptions() {
        this.basicOptions = {
            // indexAxis: 'y',
            plugins: {
                legend: {
                    labels: {
                        color: '#000000'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
    }

    // #endregion

    // #region Student Batch Attendance Summary

    getStudentBatchAttendanceSummary() {
        this.studentDashboardService.getStudentBatchAttendanceSummary()
            .subscribe(data => {
                if (data) {
                    this.studentDashboardService.onDashboardAttendanceGraphDataPageLoad(data);
                    this.StudentBatchAttendanceSummaryResponse = data;

                    this.processAttendanceData();

                    this.setupSemesterDropdown();

                    this.setupChart();
                    if (this.overviewWeeks.length > 0) {
                        this.selectedOverviewWeek = this.overviewWeeks[this.overviewWeeks.length - 1]?.id;
                        this.updateChartForSemester(this.selectedOverviewWeek);
                    }
                }
            }, error => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
            });
    }


    onLoad() {
        this.studentDashboardService.
            dashboardAttendanceGraphDataCall.subscribe(data => {
                this.studentBatchAttendanceSummaryDataExpandoList = data;
                this.studentAttendanceSummaryList = this.studentBatchAttendanceSummaryDataExpandoList.studentAttendanceSummaryList ?? [];
                this.subjectPaperCodeExpandoList = this.studentBatchAttendanceSummaryDataExpandoList.subjectPaperCodeExpando ?? [];
                this.subjectPaperCodeSummaryList = this.studentBatchAttendanceSummaryDataExpandoList.subjectPaperCodeSummaryList ?? [];
                this.subjectPaperCodeExpando = this.studentBatchAttendanceSummaryDataExpandoList.subjectPaperCodeExpando ?? [];
                this.createOperationalVerticalList(this.studentBatchAttendanceSummaryDataExpandoList.operationalVerticalExpando);
                this.selectedSemester = this.studentAttendanceSummaryList[this.studentAttendanceSummaryList.length - 1].operationalVerticalId;
                this.attendanceGraphOv += this.studentAttendanceSummaryList[this.studentAttendanceSummaryList.length - 1].operationalVerticalId;
                this.dataManupulation(this.studentAttendanceSummaryList[this.studentAttendanceSummaryList.length - 1].operationalVerticalId ?? 0);
            });
    }

    createOperationalVerticalList(OvData: any) {
        this.operationalVerticalList = OvData.reduce((accumalator: any, current: any) => {
            if (!accumalator.some((x: any) => x.label == current.name && x.value == current.id)) {
                accumalator.push({ label: current.name, value: current.id });
            }
            return accumalator;
        }, []);
        this.operationalVerticalList.sort((a, b) => { return a.value - b.value; });
    }

    onOperationalVerticalChange(event: any) {
        this.attendanceGraphOv = `Attendace : Semester ${event.value}`;
        this.dataManupulation(event.value)
    }

    dataManupulation(ovId: number) {
        const filterAcademicSessionId = this.studentAttendanceSummaryList
            .map(e => e.academicSessionId)
            .map((e, i, final) => final.indexOf(e) !== i ? i : -1)
            .filter(obj => typeof obj === 'number' && obj >= 0 && this.studentAttendanceSummaryList[obj])
            .map(e => this.studentAttendanceSummaryList[e]["academicSessionId"]);

        const filterProgramId = this.studentAttendanceSummaryList
            .map(e => e.programId)
            .map((e, i, final) => final.indexOf(e) !== i ? i : -1)
            .filter(obj => typeof obj === 'number' && obj >= 0 && this.studentAttendanceSummaryList[obj])
            .map(e => this.studentAttendanceSummaryList[e]["programId"]);

        const filterOperationalVerticalId = this.studentAttendanceSummaryList
            .map(e => e.operationalVerticalId)
            .map((e, i, final) => final.indexOf(e) !== i ? i : -1)
            .filter(obj => typeof obj === 'number' && obj >= 0 && this.studentAttendanceSummaryList[obj])
            .map(e => this.studentAttendanceSummaryList[e]["operationalVerticalId"]);

        var filterData = this.studentAttendanceSummaryList.filter(obj => filterAcademicSessionId.includes(obj.academicSessionId)
            && filterProgramId.includes(obj.programId));

        var finalFilteredData = filterData.filter(obj => obj.operationalVerticalId == ovId);

        if (finalFilteredData) {
            var subjectPaperCodeIds = [];
            this.studentDashboardAttendanceGraphData.labels = [];
            this.studentDashboardAttendanceGraphData.datasets = [];
            // var defineData = [];
            for (var i = 0; i < finalFilteredData.length; i++) {
                var data = this.subjectPaperCodeExpando.filter(x => x.id == finalFilteredData[i].subjectPaperCodeId).map(function (a) { return a.name }).toString();
                data = data + ' - ' + finalFilteredData[i].attendancePercentage?.toString() + '%';
                this.studentDashboardAttendanceGraphData.labels.push(data);

                subjectPaperCodeIds.push(this.subjectPaperCodeSummaryList.filter(x => x.subjectPaperCodeId == finalFilteredData[i].subjectPaperCodeId).map(function (a) { return a }));
            }
            //  var totalPresent = finalFilteredData.map(function (a) { return a.totalPresent });

            this.studentDashboardAttendanceGraphData.datasets.push(
                {
                    label: 'Attendance Percentage',
                    backgroundColor: '#42A5F5',
                    borderColor: '#000',
                    data: finalFilteredData
                        .map(function (a) { return a.attendancePercentage })
                        .filter((val): val is number => typeof val === 'number')
                });
            // this.studentDashboardAttendanceGraphData.datasets.push(
            //     { label: 'Total Present', backgroundColor: '#66BB6A', borderColor: '#66BB6A', data: finalFilteredData.map(function (a) { return a.totalPresent }) });
            // this.studentDashboardAttendanceGraphData.datasets.push(
            //     { label: 'Total Absent', backgroundColor: '#FFA726', borderColor: '#FFA726', data: finalFilteredData.map(function (a) { return a.totalAbsent }) });
        }
        this.barBasicOptions();
    }

    // #endregion

    // #region Semester Registration Dialog
    studentSemesterRegistrationCheck(academicSessionId: number, programId: number, operationalVerticalId: number, registrationNumber: string) {
        this.totalNumberOfPaperCodeAllowed = 0;
        this.operationalVerticalSubjectConfigurationService.getByAcademicSession(academicSessionId, programId, operationalVerticalId).subscribe({
            next: (response) => {
                if (response.length == 0) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No Operational Vertical configuration found for the AcademicSession(' + academicSessionId + '), Program(' + programId + '), OperationalVertical(' + operationalVerticalId + ')', life: 3000 });
                    return;
                }

                response.forEach(k => {
                    this.totalNumberOfPaperCodeAllowed += k.noOfPaperCodeAllowed ?? 0;
                });

                this.operationalVerticalSubjectConfigurations = response.filter(k => k.status == "PUBLISHED");

                this.studentProgramPaperCodeAllocationService.getByRegistrationNumber(registrationNumber, operationalVerticalId).subscribe({
                    next: (sppcaResponse) => {
                        if (sppcaResponse.operationalVerticalSubjectResponseDataList) {
                            var selectedPaperCodeCount = sppcaResponse.operationalVerticalSubjectResponseDataList.filter(x => x.isSubjectPaperCodeSelected).length;

                            if (selectedPaperCodeCount == 0) {
                                this.msgSemesterNotRegistred = "Semester registration is pending.";
                                this.isSemesterRegistrationDialogVisible = true;
                            } else if (selectedPaperCodeCount == this.totalNumberOfPaperCodeAllowed) {
                                this.msgSemesterAlreadyRegistred = "Semester registration has submitted already.";
                                this.isSemesterRegistrationDialogVisible = false;
                            } else {
                                this.msgSemesterNotRegistred = "Semester registration is not submitted for some paper codes.";
                                this.isSemesterRegistrationDialogVisible = true;
                            }
                        }

                    }, error: (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
                    }
                });
            }, error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
            }
        });
    }

    closeSemesterRegistrationDialog(): void {
        this.isSemesterRegistrationDialogVisible = false;
        // Restart the timer when dialog is closed
        this.startRegistrationCheckTimer();
    }

    registerNow() {
        this.router.navigateByUrl('/home/students/semester-registration');
    }

    processAttendanceData() {
        this.processedAttendanceData = this.StudentBatchAttendanceSummaryResponse.studentAttendanceSummaryList.map((attendance: any) => {
            const semester = this.StudentBatchAttendanceSummaryResponse.operationalVerticalExpando.find(
                (op: any) => op.id === attendance.operationalVerticalId
            );

            const subject = this.StudentBatchAttendanceSummaryResponse.subjectExpando.find(
                (sub: any) => sub.id === attendance.subjectId
            );

            const paperCode = this.StudentBatchAttendanceSummaryResponse.subjectPaperCodeExpando.find(
                (code: any) => code.id === attendance.subjectPaperCodeId
            );

            return {
                ...attendance,
                operationalVerticalName: semester?.name || 'Unknown Semester',
                subjectName: subject?.name || 'Unknown Subject',
                subjectPaperCodeName: paperCode?.name || 'Unknown Code'
            };
        });
    }

    setupSemesterDropdown() {
        const uniqueSemesters = new Set<number>();
        this.processedAttendanceData.forEach(item => {
            if (item.operationalVerticalId !== undefined) {
                uniqueSemesters.add(item.operationalVerticalId);
            }
        });

        this.overviewWeeks = Array.from(uniqueSemesters)
            .map(id => {
                const semester = this.StudentBatchAttendanceSummaryResponse.operationalVerticalExpando.find((op: any) => op.id === id);
                return { id, name: semester?.name || 'Unknown Semester' };
            })
            .sort((a, b) => a.id - b.id); // Sort by semester ID

    }

    updateChartForSemester(semesterId: number) {

        const semesterAttendance = this.processedAttendanceData.filter(
            item => item.operationalVerticalId === semesterId
        );


        if (semesterAttendance.length === 0) {
            this.data = {
                labels: [],
                datasets: [{
                    label: 'Attendance %',
                    backgroundColor: [],
                    borderColor: [],
                    borderWidth: 1,
                    data: []
                }]
            };
            return;
        }

        semesterAttendance.sort((a, b) =>
            (a.subjectPaperCodeName || '').localeCompare(b.subjectPaperCodeName || '')
        );

        const labels = semesterAttendance.map(item =>
            `${item.subjectPaperCodeName}`
        );
        const attendanceData = semesterAttendance.map(item => item.attendancePercentage || 0);

        const backgroundColors = attendanceData.map((percentage: any) => {
            if (percentage >= 75) return 'rgba(16, 185, 129, 0.2)';
            else if (percentage >= 60) return 'rgba(245, 158, 11, 0.2)';
            else return 'rgba(239, 68, 68, 0.2)';
        });

        const borderColors = attendanceData.map((percentage: any) => {
            if (percentage >= 75) return '#10b981';
            else if (percentage >= 60) return '#f59e0b';
            else return '#ef4444';
        });

        this.data = {
            labels: labels,
            datasets: [
                {
                    label: 'Attendance %',
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 2,
                    data: attendanceData,
                }
            ]
        };


        this.data = { ...this.data };
    }

    setupChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color') || '#000';
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary') || '#666';
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border') || '#ddd';

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: (context: any) => {
                            const index = context[0].dataIndex;
                            const semesterData = this.processedAttendanceData
                                .filter(item => item.operationalVerticalId === this.selectedOverviewWeek)
                                .sort((a, b) => (a.subjectPaperCodeName || '').localeCompare(b.subjectPaperCodeName || ''));
                            const item = semesterData[index];
                            return `${item?.subjectPaperCodeName} - ${item?.subjectName}`;
                        },
                        label: (context: any) => {
                            const index = context.dataIndex;
                            const semesterData = this.processedAttendanceData
                                .filter(item => item.operationalVerticalId === this.selectedOverviewWeek)
                                .sort((a, b) => (a.subjectPaperCodeName || '').localeCompare(b.subjectPaperCodeName || ''));
                            const item = semesterData[index];
                            return [
                                `Attendance: ${context.parsed.y}%`,
                                `Present: ${item?.totalPresent}/${item?.totalClassConducted} classes`,
                                `Credit Units: ${item?.creditUnit}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500,
                            size: 10
                        },
                        maxRotation: 45,
                        minRotation: 0
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: textColorSecondary,
                        callback: function (value: any) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
    // #endregion
}

interface StudentTileInfo {
    studentId?: string;
    section?: string;
    rollNumber?: string;
    studentName?: string;
    programName?: string;
    studentGroupName?: string;
    studentGroupColor?: string;
}