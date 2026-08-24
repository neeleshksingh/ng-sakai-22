import { ChangeDetectorRef, Component, DestroyRef, OnInit, ViewChild, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AcademicHolidayService } from '@/app/cloud-bytes/services/academic-holiday.service';
import { OrganizationalHolidayService } from '@/app/cloud-bytes/services/organizational-holiday.service';
import { EmployeeDetailsService } from '@/app/global/services/smallbiz-gurus/employee-details.service';
import { ExaminationMarksEntryService } from '@/app/knowledge-stand/services/examination-marks-entry.service';
import { SharedModule } from '@/shared.module';
import { LoginResponse } from '@/app/shared/models/idp/login';
import { ExaminationMarksEntryPendingReport } from '@/app/shared/models/knowledge-stand/examination-marks-entry-pending';
import { EmployeeLeaveRequest, LeaveRequestTeachingWorkAssignment, LeaveRequestNonTeachingWorkAssignment } from '@/app/shared/models/TimeClockPlus/employee-leave-request';
import { LocalstorageService } from '@/app/shared/services/local-storage.service';
import { EmployeeLeaveRequestService } from '@/app/time-clock-plus/services/employee-leave-request.service';
import { EmployeeCalenderComponent } from '@/app/time-clock-plus/components/common-components/employee-calender/employee-calender.component';
import { Table } from 'primeng/table';
import { PublishNoticeService } from '@/app/executive-edge/services/publish-notice/publish-notice.service';
import { LayoutService } from '@/app/layout/service/layout.service';

export interface WorkAssignmentNotification {
    id: number;
    assignedBy: string;
    type: 'Teaching' | 'NonTeaching';
    startDate: Date;
    endDate: Date;
    assignmentCount: number;
    leaveRequestId: number;
    status: string;
}

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [SharedModule, EmployeeCalenderComponent]
})
export class DashboardComponent implements OnInit {
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly destroyRef = inject(DestroyRef);

    @ViewChild('studentHolidayTable') studentHolidayTable!: Table;
    @ViewChild('orgHolidayTable') orgHolidayTable!: Table;

    overviewChartData: any;
    overviewChartOptions: any;
    overviewWeeks: any;
    selectedOverviewWeek: any;
    revenueChartData: any;
    revenueChartOptions: any;

    loading: boolean = false;
    currentUserSubject: BehaviorSubject<LoginResponse | null> = new BehaviorSubject<LoginResponse | null>(null);
    lastLoginTime: Date = new Date();
    employeeDetails: any;
    isMarksEntryPendingInfoVisible: boolean = false;
    userRoleList: any[] = [];
    pendingMarksEntryReportList: ExaminationMarksEntryPendingReport[] = [];
    pendingMarksEntryReportHeaders: any[] = [];
    isStudentRole: boolean = false;
    holidayDates: Map<string, string> = new Map();
    tasks: any[] = [];
    workAssignments: any[] = [];
    teachingWorkAssignments: LeaveRequestTeachingWorkAssignment[] = [];
    nonTeachingWorkAssignments: LeaveRequestNonTeachingWorkAssignment[] = [];
    isWorkAssignmentsLoading: boolean = false;
    upcomingHoliday: { name: string, date: Date, daysAway: number, isToday: boolean } | null = null;
    workAssignmentNotifications: WorkAssignmentNotification[] = [];
    leaveRequestsWithWorkAssigned: EmployeeLeaveRequest[] = [];
    displayImage: string = '';

    quickLinks: any[] = [
        {
            label: 'Faculty Feedback',
            icon: 'pi pi-star-fill',
            description: 'Share your experience and insights',
            route: '/home/executiveedge/transactions/faculty-feedback',
            highlight: true,
            badge: 'HOT',
            color: '#8b5cf6',
            bgColor: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
            iconBg: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
            borderColor: '#a78bfa'
        }
    ];

    notices: any[] = [];
    holiday: any[] = [];
    studentHoliday: any[] = [];
    academic_Total_No_of_Holidays: number = 0;
    student_Total_No_of_Holidays: number = 0;

    constructor(
        public layoutService: LayoutService,
        private publishNoticeService: PublishNoticeService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private localstorageService: LocalstorageService,
        private employeeDetailsService: EmployeeDetailsService,
        private academicHolidayService: AcademicHolidayService,
        private organizationalHolidaysService: OrganizationalHolidayService,
        private examinationMarksEntryService: ExaminationMarksEntryService,
        private employeeLeaveRequestService: EmployeeLeaveRequestService
    ) {
        effect(() => {
            this.layoutService.layoutConfig().darkTheme;
            this.initCharts();
        });

        this.lastLoginTime = new Date();
    }

    ngOnInit(): void {
        this.initCharts();
        this.processHolidays();
        this.loadNotices();

        const data = localStorage.getItem('currentUser');
        const storedData = sessionStorage.getItem('toDoList');

        try {
            this.tasks = storedData ? JSON.parse(storedData) : [];
        } catch (error) {
            console.error('Error parsing session storage data', error);
            this.tasks = [];
        }

        try {
            if (data) {
                this.currentUserSubject.next(JSON.parse(data));
            }
        } catch (error) {
            console.error('Error parsing user storage data', error);
        }

        const employeeCode = this.currentUserSubject?.value?.applicationUser?.uniqueUserCode;
        const UserRole = this.currentUserSubject?.value?.applicationUser?.roles || [];
        this.isStudentRole = UserRole.some((role: any) => role.toUpperCase() === 'STUDENT');
        this.userRoleList = UserRole;

        if (this.isStudentRole) {
            this.router.navigateByUrl('/home/students/forbidden-access');
        }

        this.overviewWeeks = [
            { name: 'Last Week', code: '0' },
            { name: 'This Week', code: '1' }
        ];
        this.selectedOverviewWeek = this.overviewWeeks[0];

        this.lastLoginTime = this.localstorageService.getItem("lastLoginTime") || new Date();
        if (!this.isStudentRole && employeeCode != null && employeeCode !== undefined && employeeCode.trim().length > 0) {
            this.employeeDetailsService.getByEmployeeCode(employeeCode).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
                next: (data) => {
                    if (data) {
                        this.employeeDetails = Array.isArray(data) ? data[0] : data;
                        this.displayImage = this.employeeDetails?.employeePhotoUrl || '';
                    } else {
                        this.employeeDetails = null;
                    }
                    this.cdr.markForCheck();
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'Error fetching employee details', life: 3000 });
                    this.employeeDetails = null;
                    this.cdr.markForCheck();
                }
            });
            this.loadWorkAssignments(employeeCode);
        }

        if (this.userRoleList.includes('Faculty') && employeeCode != null && employeeCode !== undefined && employeeCode.trim().length > 0) {
            this.employeeDetailsService.getByEmployeeCode(employeeCode).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
                next: (data) => {
                    if (data) {
                        this.employeeDetails = Array.isArray(data) ? data[0] : data;
                        this.cdr.markForCheck();
                        this.examinationMarksEntryService.getExaminationMarksEntryPendingByFacultyCode(this.employeeDetails?.employeeCode).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
                            next: (res) => {
                                if (res && res.length > 0) {
                                    this.isMarksEntryPendingInfoVisible = true;
                                    this.pendingMarksEntryReportList = res.map(({ EmployeeId, EmployeeCode, EmployeeName, ...rest }: any) => rest);
                                    this.pendingMarksEntryReportHeaders = Object.keys(this.pendingMarksEntryReportList[0]);
                                } else {
                                    this.isMarksEntryPendingInfoVisible = false;
                                    this.pendingMarksEntryReportList = [];
                                    this.pendingMarksEntryReportHeaders = [];
                                    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'No pending marks entry found.', life: 3000 });
                                }
                                this.cdr.markForCheck();
                            },
                            error: (err) => {
                                this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'Error fetching marks entry pending', life: 3000 });
                                this.cdr.markForCheck();
                            }
                        });
                    } else {
                        this.employeeDetails = null;
                        this.cdr.markForCheck();
                    }
                },
                error: (err) => {
                    console.error('Error fetching employee details:', err);
                    this.employeeDetails = null;
                    this.cdr.markForCheck();
                }
            });
        }
    }

    navigateToMarksEntry(data: any): void {
        this.router.navigate(['/home/knowledgestand/transactions/marks-entry/section-wise'], {
            state: { data: data }
        });
    }

    initCharts(): void {
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
                    borderColor: [primaryColor],
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'transparent',
                    type: 'line',
                    fill: false
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
                            } else {
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
                        display: false
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
                    tension: 0.4
                },
                {
                    data: [11, 19, 39, 59, 69, 71],
                    borderColor: 'rgba(25, 146, 212, 0.5)',
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'transparent',
                    fill: false,
                    tension: 0.4
                },
                {
                    data: [11, 17, 21, 30, 47, 83],
                    backgroundColor: 'rgba(25, 146, 212, 0.2)',
                    borderColor: 'rgba(25, 146, 212, 0.5)',
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'transparent',
                    fill: true,
                    tension: 0.4
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

    changeOverviewWeek(): void {
        const dataSet1 = [
            [2, 1, 0.5, 0.6, 0.5, 1.3, 1],
            [4.88, 3, 6.2, 4.5, 2.1, 5.1, 4.1]
        ];
        const dataSet2 = [
            [3, 2.4, 1.5, 0.6, 4.5, 3.3, 2],
            [3.2, 4.1, 2.2, 5.5, 4.1, 3.6, 3.5]
        ];

        if (this.selectedOverviewWeek.code === '1') {
            this.overviewChartData.datasets[0].data = dataSet2[0];
            this.overviewChartData.datasets[1].data = dataSet2[1];
        } else {
            this.overviewChartData.datasets[0].data = dataSet1[0];
            this.overviewChartData.datasets[1].data = dataSet1[1];
        }

        this.overviewChartData = { ...this.overviewChartData };
    }

    get colorScheme(): string {
        return this.layoutService.isDarkTheme() ? 'dark' : 'light';
    }

    getSeverity(role: any): any {
        switch (role?.toLowerCase()) {
            case 'developers':
                return 'success';
            case 'administration':
                return 'warn';
            case 'academics':
                return 'info';
            case 'timeclockplus':
                return 'danger';
            default:
                return 'info';
        }
    }

    saveTasks(): void {
        sessionStorage.setItem('toDoList', JSON.stringify(this.tasks));
    }

    addTask(): void {
        const newId = this.tasks.length > 0
            ? Math.max(...this.tasks.map((t) => t.id)) + 1
            : 1;

        const newTask = {
            id: newId,
            description: 'New task...',
            status: 'NEW',
            createdDate: new Date().toLocaleDateString('en-GB')
        };

        this.tasks = [...this.tasks, newTask];
    }

    deleteTask(id: number): void {
        this.tasks = this.tasks.filter((t) => t.id !== id);
        this.saveTasks();
    }

    loadWorkAssignments(employeeCode: string): void {
        this.isWorkAssignmentsLoading = true;
        this.employeeLeaveRequestService.getByWorkAssignedEmployeeCode(employeeCode).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (res: EmployeeLeaveRequest[]) => {
                this.isWorkAssignmentsLoading = false;
                if (res && res.length > 0) {
                    this.leaveRequestsWithWorkAssigned = res;
                    this.processWorkAssignmentNotifications(res);
                } else {
                    this.workAssignmentNotifications = [];
                    this.leaveRequestsWithWorkAssigned = [];
                }
                this.cdr.markForCheck();
            },
            error: (err) => {
                this.isWorkAssignmentsLoading = false;
                console.error('Error loading work assignments:', err);
                this.workAssignmentNotifications = [];
                this.leaveRequestsWithWorkAssigned = [];
                this.cdr.markForCheck();
            }
        });
    }

    private processWorkAssignmentNotifications(leaveRequests: EmployeeLeaveRequest[]): void {
        this.workAssignmentNotifications = [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const currentUserCode = this.currentUserSubject?.value?.applicationUser?.uniqueUserCode?.toLowerCase() || '';
        const currentUsername = this.currentUserSubject?.value?.applicationUser?.userName?.toLowerCase() || '';

        let pendingTeachingCount = 0;
        let pendingNonTeachingCount = 0;
        const assignerNames: Set<string> = new Set();

        let teachingMinDate: Date | null = null;
        let teachingMaxDate: Date | null = null;
        let nonTeachingMinDate: Date | null = null;
        let nonTeachingMaxDate: Date | null = null;

        leaveRequests.forEach((leaveRequest) => {
            if (leaveRequest.leaveStatus?.toUpperCase() === 'CANCELLEDBYEMPLOYEE') {
                return;
            }

            const teachingAssignments = leaveRequest.leaveRequestTeachingWorkAssignments || [];
            const nonTeachingAssignments = leaveRequest.leaveRequestNonTeachingWorkAssignments || [];

            teachingAssignments.forEach((assignment) => {
                const scheduleDate = assignment.scheduleDate ? new Date(assignment.scheduleDate) : null;
                if (scheduleDate) {
                    scheduleDate.setHours(0, 0, 0, 0);

                    if (scheduleDate >= today) {
                        const modifiedBy = assignment.modifiedBy?.toLowerCase() || '';
                        const userHasActed = modifiedBy === currentUserCode || modifiedBy === currentUsername;

                        if (!userHasActed) {
                            pendingTeachingCount++;
                            if (assignment.createdBy) {
                                assignerNames.add(assignment.createdBy);
                            }
                            if (!teachingMinDate || scheduleDate < teachingMinDate) {
                                teachingMinDate = new Date(scheduleDate);
                            }
                            if (!teachingMaxDate || scheduleDate > teachingMaxDate) {
                                teachingMaxDate = new Date(scheduleDate);
                            }
                        }
                    }
                }
            });

            nonTeachingAssignments.forEach((assignment) => {
                const scheduleDate = assignment.scheduleDate ? new Date(assignment.scheduleDate) : null;
                if (scheduleDate) {
                    scheduleDate.setHours(0, 0, 0, 0);

                    if (scheduleDate >= today) {
                        const modifiedBy = assignment.modifiedBy?.toLowerCase() || '';
                        const userHasActed = modifiedBy === currentUserCode || modifiedBy === currentUsername;

                        if (!userHasActed) {
                            pendingNonTeachingCount++;
                            if (assignment.createdBy) {
                                assignerNames.add(assignment.createdBy);
                            }
                            if (!nonTeachingMinDate || scheduleDate < nonTeachingMinDate) {
                                nonTeachingMinDate = new Date(scheduleDate);
                            }
                            if (!nonTeachingMaxDate || scheduleDate > nonTeachingMaxDate) {
                                nonTeachingMaxDate = new Date(scheduleDate);
                            }
                        }
                    }
                }
            });
        });

        const assignerList = Array.from(assignerNames).slice(0, 3).join(', ');
        const assignerDisplay = assignerNames.size > 3 ? `${assignerList} +${assignerNames.size - 3} more` : assignerList || 'Colleagues';

        if (pendingTeachingCount > 0) {
            this.workAssignmentNotifications.push({
                id: 1,
                assignedBy: assignerDisplay,
                type: 'Teaching',
                startDate: teachingMinDate || new Date(),
                endDate: teachingMaxDate || new Date(),
                assignmentCount: pendingTeachingCount,
                leaveRequestId: 0,
                status: 'PENDING'
            });
        }

        if (pendingNonTeachingCount > 0) {
            this.workAssignmentNotifications.push({
                id: 2,
                assignedBy: assignerDisplay,
                type: 'NonTeaching',
                startDate: nonTeachingMinDate || new Date(),
                endDate: nonTeachingMaxDate || new Date(),
                assignmentCount: pendingNonTeachingCount,
                leaveRequestId: 0,
                status: 'PENDING'
            });
        }
    }

    navigateToWorkAssignments(): void {
        this.router.navigateByUrl('/home/timeclockplus/transactions/work-assignment-list');
    }

    navigateQuickLink(link: any): void {
        if (link?.route) {
            this.router.navigateByUrl(link.route);
        }
    }

    getPendingAssignmentsCount(): number {
        return this.workAssignmentNotifications.length;
    }

    formatDateRange(startDate: Date, endDate: Date): string {
        const formatDate = (date: Date) => {
            return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        };

        if (startDate.getTime() === endDate.getTime()) {
            return formatDate(startDate);
        }
        return `${formatDate(startDate)} to ${formatDate(endDate)}`;
    }

    getNotificationSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
        switch (status?.toUpperCase()) {
            case 'PENDING':
                return 'warn';
            case 'ACCEPTED':
                return 'success';
            case 'REJECTED':
                return 'danger';
            default:
                return 'info';
        }
    }

    viewWorkAssignment(notification: WorkAssignmentNotification): void {
        this.router.navigateByUrl('/home/timeclockplus/transactions/work-assignment-list');
    }

    getDateData(date: any): { cssClass: string; tooltip: string } {
        const dateStr = `${date.year}-${(date.month + 1).toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;

        if (this.holidayDates.has(dateStr)) {
            return {
                cssClass: 'holiday-festival-mark',
                tooltip: this.holidayDates.get(dateStr) || ''
            };
        }

        const jsDate = new Date(date.year, date.month, date.day);
        const dayOfWeek = jsDate.getDay();

        if (dayOfWeek === 0) {
            return { cssClass: 'holiday-weekend-mark', tooltip: 'Sunday' };
        }

        if (dayOfWeek === 6) {
            const dayOfMonth = date.day;
            const weekNum = Math.ceil(dayOfMonth / 7);
            if (weekNum === 2 || weekNum === 4) {
                return { cssClass: 'holiday-weekend-mark', tooltip: `${weekNum === 2 ? '2nd' : '4th'} Saturday` };
            }
        }

        return { cssClass: '', tooltip: '' };
    }

    processHolidays(): void {
        const year = new Date().getFullYear();
        this.academicHolidayService.getAcademicHolidayByYear(year.toString()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res) => {
            this.holiday = res || [];
            this.academic_Total_No_of_Holidays = this.holiday.length;
            this.holiday.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            this.cdr.markForCheck();
            setTimeout(() => {
                if (this.destroyRef.destroyed) return;
                this.paginateTableToDate(this.studentHolidayTable, this.holiday, 5);
                this.cdr.markForCheck();
            }, 100);
        });

        this.organizationalHolidaysService.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res) => {
            const organizationalHolidays = (res || []).filter((holiday: any) => {
                if (!holiday.date) return false;
                const dateObj = new Date(holiday.date);
                return dateObj.getFullYear() === year;
            });
            this.studentHoliday = organizationalHolidays;
            this.student_Total_No_of_Holidays = organizationalHolidays.length;
            this.studentHoliday.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            this.calculateUpcomingHoliday(this.studentHoliday);
            this.cdr.markForCheck();
            setTimeout(() => {
                if (this.destroyRef.destroyed) return;
                this.paginateTableToDate(this.orgHolidayTable, this.studentHoliday, 5);
                this.cdr.markForCheck();
            }, 100);
        });
    }

    calculateUpcomingHoliday(holidays: any[]): void {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingHolidays = holidays.filter((h) => {
            const hDate = new Date(h.date);
            hDate.setHours(0, 0, 0, 0);
            return hDate >= today && h.status === 'PUBLISHED';
        });

        if (upcomingHolidays.length > 0) {
            const nextHoliday = upcomingHolidays[0];
            const hDate = new Date(nextHoliday.date);
            hDate.setHours(0, 0, 0, 0);

            const diffTime = hDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            this.upcomingHoliday = {
                name: nextHoliday.name,
                date: hDate,
                daysAway: diffDays,
                isToday: diffDays === 0
            };
        }
    }

    private paginateTableToDate(table: Table, holidays: any[], rowsPerPage: number): void {
        if (!table || !holidays || holidays.length === 0) return;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let targetIndex = holidays.findIndex((holiday) => {
            const holidayDate = new Date(holiday.date);
            holidayDate.setHours(0, 0, 0, 0);
            return holidayDate >= today;
        });

        if (targetIndex === -1) {
            targetIndex = holidays.length - 1;
        }

        const targetPage = Math.floor(targetIndex / rowsPerPage);
        const firstRowIndex = targetPage * rowsPerPage;

        if (table.first && typeof (table.first as any).set === 'function') {
            (table.first as any).set(firstRowIndex);
        } else {
            (table as any).first = firstRowIndex;
        }
    }

    private paginateToCurrentDate(): void {
        if (this.holiday && this.holiday.length > 0) {
            this.paginateTableToDate(this.studentHolidayTable, this.holiday, 5);
        }
        if (this.studentHoliday && this.studentHoliday.length > 0) {
            this.paginateTableToDate(this.orgHolidayTable, this.studentHoliday, 5);
        }
    }

    isUpcomingHoliday(holidayDate: string): boolean {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const hDate = new Date(holidayDate);
        hDate.setHours(0, 0, 0, 0);

        const diffDays = Math.ceil((hDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 7;
    }

    navigateToNotice(notice: any): void {
        if (notice && notice.id) {
            this.router.navigate([`/home/executiveedge/transactions/publish-notice-view/${notice.id}`]);
        }
    }

    loadNotices(): void {
        this.publishNoticeService.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (response: any[]) => {
                this.notices = (response || [])
                    .filter((notice) => notice.noticeType?.toUpperCase() !== 'STUDENT' && notice.status?.toUpperCase() === 'PUBLISHED')
                    .map((notice) => ({
                        id: notice.id,
                        title: notice.title || notice.name,
                        refNumber: notice.refNumber,
                        source: notice.source,
                        noticeDate: notice.noticeDate ? new Date(notice.noticeDate).toISOString().split('T')[0] : '',
                        attachmentUrl: notice.attachmentUrl || ''
                    }));
                this.cdr.markForCheck();
            },
            error: (err: any) => {
                console.error('Error loading notices:', err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load notices. Please try again later.',
                    life: 3000
                });
                this.notices = [];
                this.cdr.markForCheck();
            }
        });
    }
}
