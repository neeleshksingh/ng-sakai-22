import { LayoutService } from '@/app/layout/service/layout.service';
import { SharedModule } from '@/shared.module';
import { ChangeDetectorRef, Component, effect, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, debounceTime, interval, Subscription } from 'rxjs';
import { ExaminationMarksEntryService } from 'src/app/knowledge-stand/services/examination-marks-entry.service';
import { ExaminationProgramConfigurationService } from 'src/app/knowledge-stand/services/examination-program-configuration.service';
import { ExaminationService } from 'src/app/knowledge-stand/services/examination.service';
import { StudentExaminationRegistrationService } from 'src/app/knowledge-stand/services/student-examination-registration.service';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { ExaminationResponse } from 'src/app/shared/models/knowledge-stand/examination';
import { ExaminationMarksEntryPendingReport } from 'src/app/shared/models/knowledge-stand/examination-marks-entry-pending';
import { DateFormatterService } from 'src/app/shared/services/date-formatter.service';
import { EmployeeDetailsService } from 'src/app/smallbiz-gurus/services/employee-details.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [SharedModule]
})
export class DashboardComponent implements OnInit, OnDestroy {

    overviewChartData: any;

    overviewChartOptions: any;

    overviewWeeks: any;

    selectedOverviewWeek: any;

    revenueChartData: any;

    revenueChartOptions: any;

    subscription!: Subscription;
    notification: boolean = true;

    notificationList: any[] = [];

    activeExaminations: ExaminationResponse[] = [];
    activeExaminationId: number = 0;
    activeExaminationProgramConfigurations: any[] = [];
    totalExaminationScheduledToday: number = 0;
    totalStudentExaminationRegistrations: number = 0;
    hideTable: boolean = true;

    currentUserSubject: any;
    userRoleList: any[] = [];
    isMarksEntryPendingInfoVisible: boolean = false;
    employeeDetails: any;
    pendingMarksEntryReportList: ExaminationMarksEntryPendingReport[] = [];
    pendingMarksEntryReportHeaders: any[] = [];
    cols: any[] = [];
    exportColumns: any[] = [];

    liveExaminationConfigurations: any[] = [];
    isLoading: boolean = true;

    skeletonValue: number[] = Array(3).fill(1);

    cols2: any[] = [
        { header: 'Session', field: '0' },
        { header: 'Program', field: '1' },
        { header: 'Semester', field: '2' },
        { header: 'Subject', field: '3' },
        { header: 'Start Time', field: '4' },
        { header: 'End Time', field: '5' },
    ]

    private countdownSubscription: Subscription | undefined;
    countdownTimers: { [key: string]: string } = {};

    constructor(public layoutService: LayoutService,
        private messageService: MessageService,
        private examinationService: ExaminationService,
        private examinationProgramConfigurationService: ExaminationProgramConfigurationService,
        private dateFormatterService: DateFormatterService,
        private studentExaminationRegistrationService: StudentExaminationRegistrationService,
        private employeeDetailsService: EmployeeDetailsService,
        private examinationMarksEntryService: ExaminationMarksEntryService,
        private router: Router,
        private cdr: ChangeDetectorRef,
    ) {
        effect(() => {
            this.layoutService.layoutConfig().darkTheme;
            this.initCharts();
        });
    }

    ngOnInit() {
        this.initCharts();

        this.overviewWeeks = [
            { name: 'Last Week', code: '0' },
            { name: 'This Week', code: '1' }
        ];
        this.selectedOverviewWeek = this.overviewWeeks[0]

        this.getActiveExaminations();
        this.startCountdownTimer();

        var data = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(data ?? ''));
        const employeeCode = this.currentUserSubject?.value?.applicationUser?.uniqueUserCode;
        const UserRole = this.currentUserSubject?.value?.applicationUser?.roles?.[0];
        this.userRoleList = this.currentUserSubject?.value?.applicationUser?.roles || [];

        if (UserRole?.toUpperCase() !== 'STUDENT') {
            this.employeeDetailsService.getByEmployeeCode(employeeCode).subscribe({
                next: data => {
                    if (data) {
                        this.employeeDetails = Array.isArray(data) ? data[0] : data;
                        this.cdr.markForCheck();
                    } else {
                        this.employeeDetails = null;
                        this.cdr.markForCheck();
                    }
                },
                error: err => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
                    this.employeeDetails = null;
                    this.cdr.markForCheck();
                }
            })
        }

        if (this.userRoleList.includes('Faculty')) {
            this.employeeDetailsService.getByEmployeeCode(employeeCode).subscribe({
                next: data => {
                    if (data) {
                        this.employeeDetails = Array.isArray(data) ? data[0] : data;
                        this.examinationMarksEntryService.getExaminationMarksEntryPendingByFacultyCode(this.employeeDetails?.employeeCode).subscribe({
                            next: (res) => {
                                if (res && res.length > 0) {
                                    this.isMarksEntryPendingInfoVisible = true;
                                    this.pendingMarksEntryReportList = res.map(({ EmployeeId, EmployeeCode, EmployeeName, ...rest }) => rest);
                                    this.pendingMarksEntryReportHeaders = Object.keys(this.pendingMarksEntryReportList[0]);
                                    this.cdr.markForCheck();
                                } else {
                                    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'No pending marks entry found.', life: 3000 });
                                    this.cdr.markForCheck();
                                }
                            },
                            error: (err) => {
                                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
                                this.cdr.markForCheck();
                            }
                        });
                    } else {
                        this.employeeDetails = null;
                        this.cdr.markForCheck();
                    }
                },
                error: err => {
                    console.error('Error fetching employee details:', err);
                    this.employeeDetails = null;
                    this.cdr.markForCheck();
                }
            })
        }
    }

    getActiveExaminations() {
        this.isLoading = true;
        this.examinationService.getActiveExaminations().subscribe({
            next: (data: ExaminationResponse[]) => {
                this.activeExaminations = data || [];
                if (this.activeExaminations && this.activeExaminations.length > 0) {
                    this.activeExaminationId = this.activeExaminations[this.activeExaminations.length - 1].id ?? 0;
                    this.getExaminationProgramConfigurationsByExaminationId(this.activeExaminationId);
                    this.getStudentExaminationRegistrationByExaminationId(this.activeExaminationId);
                } else {
                    console.error('No active examinations found.');
                    this.isLoading = false;
                    this.cdr.markForCheck();
                }
            },
            error: (err) => {
                console.error('Error fetching active examinations:', err);
                this.isLoading = false;
                this.cdr.markForCheck();
            }
        });
    }

    getExaminationProgramConfigurationsByExaminationId(id: number) {
        this.examinationProgramConfigurationService.getByExaminationId(id).subscribe({
            next: (data) => {
                const list = data || [];
                this.activeExaminationProgramConfigurations = list.filter(x => new Date(x.examinationStartDateTime ?? '') >= new Date()).sort((a: any, b: any) =>
                    new Date(a.examinationStartDateTime).getTime() - new Date(b.examinationStartDateTime).getTime()
                );
                this.liveExaminationConfigurations = list.filter(x => new Date(x.examinationStartDateTime ?? '') <= new Date() && new Date(x.examinationEndDateTime ?? '') >= new Date());
                this.hideTable = this.activeExaminationProgramConfigurations.length > 0 ? false : true;
                this.totalExaminationScheduledToday = list.length;
                this.isLoading = false;

                this.liveExaminationConfigurations.forEach(exam => {
                    if (exam && exam.examinationEndDateTime) {
                        this.calculateTimeRemaining(exam.examinationEndDateTime, exam.examinationEndDateTime);
                    }
                });

                this.cdr.markForCheck();

                this.examinationService.getById(id).subscribe({
                    next: (examination: ExaminationResponse) => {
                        if (examination) {
                            var n = {
                                MessageSenderImageUrl: 'assets/layout/images/icon-profile.png',
                                SendingAuthority: 'Examination',
                                SendingDate: this.dateFormatterService.ConvertLocalDateStringOnlyDate(new Date(examination.createdDate ?? '')),
                                SendingMessage: examination.name + ': Marks entry open from ' + examination.marksEntryOpenDateTime + ' to ' + examination.marksEntryCloseDateTime
                            };
                            this.notificationList.push(n);
                        }
                        this.cdr.markForCheck();
                    },
                    error: () => {
                        this.cdr.markForCheck();
                    }
                });
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.message || 'Error loading examination program configurations' });
                this.isLoading = false;
                this.cdr.markForCheck();
            }
        });
    }

    getStudentExaminationRegistrationByExaminationId(examinationId: number) {
        this.studentExaminationRegistrationService.getStudentExaminationRegistrationCountByExaminationId(examinationId).subscribe({
            next: (data) => {
                this.totalStudentExaminationRegistrations = data?.count ?? 0;
                this.cdr.markForCheck();
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.message || 'Error loading examination registrations' });
                this.cdr.markForCheck();
            }
        });
    }

    update() {
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }
    delete() {
        // this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
    }
    NotificationReload() {

    }

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
                    backgroundColor: [this.layoutService.isDarkTheme() ? '#879AAF' : '#E4E7EB'],
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

        this.cdr.markForCheck();
    }

    changeOverviewWeek() {
        const dataSet1 = [
            [2, 1, 0.5, 0.6, 0.5, 1.3, 1],
            [4.88, 3, 6.2, 4.5, 2.1, 5.1, 4.1]
        ];
        const dataSet2 = [
            [3, 2.4, 1.5, 0.6, 4.5, 3.3, 2],
            [3.2, 4.1, 2.2, 5.5, 4.1, 3.6, 3.5],
        ];

        if (this.selectedOverviewWeek.code === '1') {
            this.overviewChartData.datasets[0].data = dataSet2[parseInt('0')];
            this.overviewChartData.datasets[1].data = dataSet2[parseInt('1')];
        }
        else {
            this.overviewChartData.datasets[0].data = dataSet1[parseInt('0')];
            this.overviewChartData.datasets[1].data = dataSet1[parseInt('1')];
        }

        this.overviewChartData = { ...this.overviewChartData };
    }

    get colorScheme(): string {
        return this.layoutService.isDarkTheme() ? 'dark' : 'light';
    }

    private startCountdownTimer() {
        this.countdownSubscription = interval(1000).subscribe(() => {
            if (this.liveExaminationConfigurations && this.liveExaminationConfigurations.length > 0) {
                this.liveExaminationConfigurations.forEach(exam => {
                    if (exam && exam.examinationEndDateTime) {
                        this.calculateTimeRemaining(exam.examinationEndDateTime, exam.examinationEndDateTime);
                        this.cdr.markForCheck();
                    }
                });
            }
        });
    }

    private calculateTimeRemaining(examId: string | number, endDateTime: string): void {
        try {
            const end = new Date(endDateTime).getTime();
            const now = new Date().getTime();

            if (isNaN(end)) {
                console.error('Invalid date format for endDateTime:', endDateTime);
                this.countdownTimers[examId] = 'Invalid date';
                return;
            }

            const diff = end - now;

            if (diff <= 0) {
                this.countdownTimers[examId] = 'Ended';
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            this.countdownTimers[examId] = `${hours}h ${minutes}m ${seconds}s`;
        } catch (error) {
            console.error('Error calculating time remaining:', error);
            this.countdownTimers[examId] = 'Error';
        }
    }

    // Method to be called from the template
    getTimeRemaining(endDateTime: string): string {
        try {
            const timerKey = endDateTime;

            if (!this.countdownTimers[timerKey]) {
                this.calculateTimeRemaining(timerKey, endDateTime);
            }

            return this.countdownTimers[timerKey] || this.calculateStaticTimeRemaining(endDateTime);
        } catch (error) {
            console.error('Error in getTimeRemaining:', error);
            return 'Error';
        }
    }

    // Static version for backward compatibility or initial rendering
    private calculateStaticTimeRemaining(endDateTime: string): string {
        try {
            const end = new Date(endDateTime).getTime();
            const now = new Date().getTime();

            if (isNaN(end)) {
                console.error('Invalid date format in static calculation:', endDateTime);
                return 'Invalid date';
            }

            const diff = end - now;

            if (diff <= 0) {
                return 'Ended';
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            return `${hours} : ${minutes} : ${seconds}`;
        } catch (error) {
            console.error('Error in static time calculation:', error);
            return 'Error';
        }
    }

    navigateToMarksEntry(data: any) {
        this.router.navigate(['/home/knowledgestand/transactions/marks-entry/section-wise'], {
            state: { data: data }
        });
    }

    ngOnDestroy(): void {
        if (this.countdownSubscription) {
            this.countdownSubscription.unsubscribe();
        }
    }
}
