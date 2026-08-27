import { LayoutService } from '@/app/layout/service/layout.service';
import { SharedModule } from '@/shared.module';
import { ChangeDetectorRef, Component, effect, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AcademicSessionProgramService } from 'src/app/global/services/cloudbytes/academic-session-program.service';
import { ProgramService } from 'src/app/global/services/cloudbytes/program.service';
import { EmployeeDetailsService } from 'src/app/global/services/smallbiz-gurus/employee-details.service';
import { AcademicScheduleService } from 'src/app/mind-spark/services/academic-schedule.service';
import { BatchAttendanceService } from 'src/app/mind-spark/services/batch-attendance.service';
import { BatchService } from 'src/app/mind-spark/services/batch.service';
import { FacultySubjectAllocationService } from 'src/app/mind-spark/services/faculty-subject-allocation.service';
import { AcademicSessionProgram } from 'src/app/shared/models/cloudbytes/academic-session-program';
import { ProgramShortCodesModel } from 'src/app/shared/models/cloudbytes/program-short-codes';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { FacultyBatchAttendance } from 'src/app/shared/models/mindspark/faculty-batch-attendance';
import { UniversityTimeTable } from 'src/app/shared/models/mindspark/university-time-table';

interface ColumnDefinition {
    field: string;
    header: string;
    filterType: string;
    icon?: string;
    style?: any;
}

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [SharedModule]
})
export class DashboardComponent implements OnInit, OnDestroy {
    @ViewChild('dt') dt?: Table;
    overviewChartData: any;
    overviewChartOptions: any;
    overviewWeeks: any;
    selectedOverviewWeek: any;
    revenueChartData: any;
    revenueChartOptions: any;
    batchChartData: any;
    batchChartOptions: any;
    capacityChartData: any;
    capacityChartOptions: any;
    sessionChartData: any;
    sessionChartOptions: any;
    subjectChartData: any;
    subjectChartOptions: any;
    batchLoading: boolean = false;
    batchChartError: boolean = false;
    batchList: any;
    programCount: number = 0;
    academicSessionPrograms: AcademicSessionProgram[] = [];
    subscription!: Subscription;
    employeeDetails: any;
    currentUserSubject: any;
    private originalFacultyBatchAttendanceCols: ColumnDefinition[] = [
        { field: 'employeeCode', header: 'Employee Code', filterType: 'text', icon: 'pi pi-id-card', style: { 'min-width': '120px' } },
        { field: 'employeeName', header: 'Faculty Name', filterType: 'text', icon: 'pi pi-user', style: { 'min-width': '150px' } },
        { field: 'academicSessionName', header: 'Academic Session', filterType: 'text', icon: 'pi pi-calendar', style: { 'min-width': '150px' } },
        { field: 'programName', header: 'Program', filterType: 'text', icon: 'pi pi-book', style: { 'min-width': '100px' } },
        { field: 'operationalVerticalName', header: 'Operational Vertical', filterType: 'text', icon: 'pi pi-sitemap', style: { 'min-width': '150px' } },
        { field: 'section', header: 'Section', filterType: 'text', icon: 'pi pi-tag', style: { 'min-width': '80px', 'text-align': 'center' } },
        { field: 'subjectName', header: 'Subject Name', filterType: 'text', icon: 'pi pi-pencil', style: { 'min-width': '200px' } },
        { field: 'subjectPaperCodeName', header: 'Subject Paper Code', filterType: 'text', icon: 'pi pi-code', style: { 'min-width': '200px' } }
    ];
    facultyBatchAttendanceCols: ColumnDefinition[] = [];
    facultyBatchAttendanceList: FacultyBatchAttendance[] = [];
    facultyBatchAttendanceLoading: boolean = false;
    facultyBatchAttendanceError: boolean = false;
    showDetailedAttendance: boolean = false;
    detailedAttendanceData: any[] = [];
    detailedAttendanceCols: any[] = [];
    detailedAttendanceLoading: boolean = false;
    detailedAttendanceError: boolean = false;
    attendanceFilter: 'ALL' | 'CurrentEmployee' = 'CurrentEmployee';

    academicSchedule: UniversityTimeTable[] = [];
    days: { dayId: number, dayName: string }[] = [];
    periods: { timeTablePeriodId: number, timeTablePeriodName: string, periodTime: string }[] = [];
    programInfo: { programName: string, operationalVerticalName: string, section: string } | null = null;
    timetableData: any = null;
    hasValidTimetableAllocations: boolean = false;
    private currentTimeInterval: any;
    currentDayId: number = 0;
    currentPeriodId: number = 0;
    isCurrentTimeInSession: boolean = false;

    private subjectIconMap: { [subjectId: number]: string } = {};
    private availableIcons: string[] = [
        'pi pi-calculator', 'pi pi-flask', 'pi pi-bolt', 'pi pi-leaf', 'pi pi-code',
        'pi pi-book', 'pi pi-globe', 'pi pi-pencil', 'pi pi-chart-line', 'pi pi-users',
        'pi pi-palette', 'pi pi-volume-up', 'pi pi-flag', 'pi pi-lightbulb'
    ];

    private employeeColorMap: { [employeeCode: string]: string } = {};
    private availableColors: string[] = [
        '#FFEBEE', '#FCE4EC', '#F3E5F5', '#EDE7F6', '#E8EAF6',
        '#E3F2FD', '#E0F7FA', '#E0F2F1', '#E8F5E9', '#F1F8E9',
        '#F9FBE7', '#FFFDE7', '#FFF8E1', '#FFF3E0', '#FBE9E7',
        '#EFEBE9', '#FAFAFA', '#F5F5F5', '#ECEFF1', '#F0F4C3'
    ];

    isLoading: boolean = false;

    hasBatchData: boolean = false;
    hasCapacityData: boolean = false;
    hasSessionData: boolean = false;
    hasSubjectData: boolean = false;
    hasOverviewData: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private batchService: BatchService,
        private programService: ProgramService,
        private academicSessionProgramService: AcademicSessionProgramService,
        private facultySubjectAllocationService: FacultySubjectAllocationService,
        public employeeDetailsService: EmployeeDetailsService,
        private batchAttendanceService: BatchAttendanceService,
        private messageService: MessageService,
        private router: Router,
        private academicScheduleService: AcademicScheduleService,
        private cdr: ChangeDetectorRef
    ) {
        effect(() => {
            this.layoutService.layoutConfig().darkTheme;
            this.initCharts();
        });
    }

    ngOnInit() {
        var data = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(data ?? ''));
        const employeeCode = this.currentUserSubject?.value?.applicationUser?.uniqueUserCode;
        const userRoles = this.currentUserSubject?.value?.applicationUser?.roles ?? [];
        const hasFacultyRole = userRoles.some((role: string) => role?.toLowerCase().includes('faculty'));
        this.overviewWeeks = [
            { name: 'Last Week', code: '0' },
            { name: 'This Week', code: '1' }
        ];
        this.selectedOverviewWeek = this.overviewWeeks[0];
        this.startTimeTracking();

        this.employeeDetailsService.getByEmployeeCode(employeeCode).subscribe({
            next: (data) => {
                if (data) {
                    this.employeeDetails = Array.isArray(data) ? data[0] : data;
                    if (this.employeeDetails && this.employeeDetails.employeeCode !== undefined && this.employeeDetails.employeeCode !== null) {
                        this.getBatchByFacultyCode(this.employeeDetails.employeeCode);
                        this.attendanceFilter = 'CurrentEmployee';
                        this.getFacultyBatchAttendance();
                        if (hasFacultyRole) {
                            this.fetchAcademicSchedule(this.employeeDetails.employeeCode);
                        }
                    }
                } else {
                    this.employeeDetails = null;
                    this.attendanceFilter = 'ALL';
                    this.getFacultyBatchAttendance();
                }
            }
        })

        this.academicSessionProgramService.getAll().subscribe(data => {
            if (data) {
                this.getTopSubjectsByFaculty();
                this.getProgramList();
                this.academicSessionPrograms = data;
            }
        });
    }

    initCharts() {
        if (this.batchList && this.batchList.length > 0) {
            this.buildBatchCharts(this.batchList);
        }
        if (this.employeeDetails?.employeeCode) {
            this.getTopSubjectsByFaculty();
        }
        this.cdr.markForCheck();
    }

    getBatchByFacultyCode(facultyCode: string) {
        this.batchLoading = true;
        this.batchChartError = false;
        this.hasBatchData = false;
        this.hasCapacityData = false;
        this.hasSessionData = false;
        this.hasSubjectData = false;

        const programShortCodes: { [key: string]: { shortCode: string, fullName: string } } = ProgramShortCodesModel;

        this.batchService.getByFacultyCode(facultyCode, true).subscribe({
            next: (data) => {
                this.batchList = data ?? [];
                this.batchLoading = false;
                this.buildBatchCharts(this.batchList, programShortCodes);
                this.cdr.markForCheck();
            },
            error: () => {
                this.batchLoading = false;
                this.batchChartError = true;
                this.batchList = [];
                this.cdr.markForCheck();
            }
        });
    }

    private buildBatchCharts(batchList: any[], programShortCodes: any = ProgramShortCodesModel) {
        const isDark = this.layoutService.isDarkTheme();
        const textColor = isDark ? '#cbd5e1' : '#475569';
        const borderColor = isDark ? '#334155' : '#e2e8f0';

        const publishedBatches = (batchList || []).filter((batch: any) => batch.status === "PUBLISHED");

        if (publishedBatches.length === 0) {
            this.hasBatchData = false;
            this.hasCapacityData = false;
            this.hasSessionData = false;
            this.hasSubjectData = false;
            return;
        }

        // 1. Batches by Program
        const programCounts: { [key: string]: { count: number, fullName: string } } = {};
        publishedBatches.forEach((batch: any) => {
            const programInfo = programShortCodes[batch.programName] || { shortCode: batch.programName, fullName: batch.programName };
            const shortCode = programInfo.shortCode;
            if (!programCounts[shortCode]) {
                programCounts[shortCode] = { count: 0, fullName: programInfo.fullName };
            }
            programCounts[shortCode].count += 1;
        });

        const progLabels = Object.keys(programCounts);
        const progValues = progLabels.map(k => programCounts[k].count);
        const progFullNames = progLabels.map(k => programCounts[k].fullName);

        if (progLabels.length > 0) {
            this.batchChartOptions = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' },
                    formatter: (params: any[]) => {
                        const item = params[0];
                        const fullName = progFullNames[item.dataIndex] || item.name;
                        return `<b>${fullName}</b><br/>Batches: <b>${item.value}</b>`;
                    }
                },
                grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
                xAxis: {
                    type: 'category',
                    data: progLabels,
                    axisLabel: { interval: 0, rotate: 30, color: textColor, fontSize: 11 },
                    axisLine: { lineStyle: { color: borderColor } }
                },
                yAxis: {
                    type: 'value',
                    name: 'Batches',
                    minInterval: 1,
                    axisLabel: { color: textColor },
                    splitLine: { lineStyle: { color: borderColor, type: 'dashed' } }
                },
                series: [{
                    name: 'Batches',
                    type: 'bar',
                    barWidth: '40%',
                    data: progValues,
                    itemStyle: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                                { offset: 0, color: '#3b82f6' },
                                { offset: 1, color: '#1d4ed8' }
                            ]
                        },
                        borderRadius: [6, 6, 0, 0]
                    }
                }]
            };
            this.hasBatchData = true;
        }

        // 2. Capacity by Program (Horizontal Bar)
        const programCapacities: { [key: string]: { capacity: number, fullName: string } } = {};
        publishedBatches.forEach((batch: any) => {
            const programInfo = programShortCodes[batch.programName] || { shortCode: batch.programName, fullName: batch.programName };
            const shortCode = programInfo.shortCode;
            if (!programCapacities[shortCode]) {
                programCapacities[shortCode] = { capacity: 0, fullName: programInfo.fullName };
            }
            programCapacities[shortCode].capacity += (batch.batchCapacity || 0);
        });

        const capLabels = Object.keys(programCapacities);
        const capValues = capLabels.map(k => programCapacities[k].capacity);
        const capFullNames = capLabels.map(k => programCapacities[k].fullName);

        if (capLabels.length > 0) {
            this.capacityChartOptions = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' },
                    formatter: (params: any[]) => {
                        const item = params[0];
                        const fullName = capFullNames[item.dataIndex] || item.name;
                        return `<b>${fullName}</b><br/>Capacity: <b>${item.value} students</b>`;
                    }
                },
                grid: { left: '3%', right: '6%', bottom: '5%', top: '5%', containLabel: true },
                xAxis: {
                    type: 'value',
                    axisLabel: { color: textColor },
                    splitLine: { lineStyle: { color: borderColor, type: 'dashed' } }
                },
                yAxis: {
                    type: 'category',
                    data: capLabels,
                    axisLabel: { color: textColor, fontSize: 11 },
                    axisLine: { lineStyle: { color: borderColor } }
                },
                series: [{
                    name: 'Capacity',
                    type: 'bar',
                    barWidth: '45%',
                    data: capValues,
                    itemStyle: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
                            colorStops: [
                                { offset: 0, color: '#10b981' },
                                { offset: 1, color: '#059669' }
                            ]
                        },
                        borderRadius: [0, 6, 6, 0]
                    }
                }]
            };
            this.hasCapacityData = true;
        }

        // 3. Batches by Session (Pie/Donut Chart)
        const sessionCounts: { [key: string]: number } = {};
        publishedBatches.forEach((batch: any) => {
            sessionCounts[batch.academicSessionName] = (sessionCounts[batch.academicSessionName] || 0) + 1;
        });

        const sessPieData = Object.keys(sessionCounts).map(k => ({ name: k, value: sessionCounts[k] }));

        if (sessPieData.length > 0) {
            this.sessionChartOptions = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: <b>{c}</b> batches ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    right: 10,
                    top: 'center',
                    textStyle: { color: textColor, fontSize: 11 }
                },
                series: [{
                    name: 'Session',
                    type: 'pie',
                    radius: ['45%', '75%'],
                    center: ['35%', '50%'],
                    avoidLabelOverlap: false,
                    label: { show: false },
                    emphasis: {
                        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.3)' }
                    },
                    data: sessPieData
                }]
            };
            this.hasSessionData = true;
        }

        // 4. Batches by Subject
        const subjectCounts: { [key: string]: number } = {};
        publishedBatches.forEach((batch: any) => {
            if (batch.subjectName) {
                subjectCounts[batch.subjectName] = (subjectCounts[batch.subjectName] || 0) + 1;
            }
        });

        const subjLabels = Object.keys(subjectCounts);
        const subjValues = Object.values(subjectCounts);

        if (subjLabels.length > 0) {
            this.subjectChartOptions = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' },
                    formatter: (params: any[]) => {
                        const item = params[0];
                        return `<b>${item.name}</b><br/>Batches: <b>${item.value}</b>`;
                    }
                },
                grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
                xAxis: {
                    type: 'category',
                    data: subjLabels,
                    axisLabel: {
                        interval: 0, rotate: 30, color: textColor, fontSize: 10,
                        formatter: (val: string) => val.length > 15 ? val.substring(0, 15) + '...' : val
                    },
                    axisLine: { lineStyle: { color: borderColor } }
                },
                yAxis: {
                    type: 'value',
                    minInterval: 1,
                    axisLabel: { color: textColor },
                    splitLine: { lineStyle: { color: borderColor, type: 'dashed' } }
                },
                series: [{
                    name: 'Batches',
                    type: 'bar',
                    barWidth: '40%',
                    data: subjValues,
                    itemStyle: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                                { offset: 0, color: '#f59e0b' },
                                { offset: 1, color: '#d97706' }
                            ]
                        },
                        borderRadius: [6, 6, 0, 0]
                    }
                }]
            };
            this.hasSubjectData = true;
        }
    }

    getTopSubjectsByFaculty() {
        const isDark = this.layoutService.isDarkTheme();
        const textColor = isDark ? '#cbd5e1' : '#475569';
        const borderColor = isDark ? '#334155' : '#e2e8f0';

        this.facultySubjectAllocationService.getAll().subscribe({
            next: (facultyData) => {
                if (facultyData) {
                    const subjectCountMap: { [key: string]: number } = {};
                    facultyData.forEach((item: any) => {
                        const status = item.status;
                        const subjectName = item.subjectName;
                        if (subjectName && status === "PUBLISHED") {
                            subjectCountMap[subjectName] = (subjectCountMap[subjectName] || 0) + 1;
                        }
                    });

                    const sortedSubjects = Object.keys(subjectCountMap)
                        .map(subjectName => ({
                            subjectName: subjectName,
                            facultyCount: subjectCountMap[subjectName]
                        }))
                        .sort((a, b) => b.facultyCount - a.facultyCount)
                        .slice(0, 10);

                    if (sortedSubjects.length > 0) {
                        const labels = sortedSubjects.map(s => s.subjectName);
                        const values = sortedSubjects.map(s => s.facultyCount);

                        this.overviewChartOptions = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: { type: 'shadow' },
                                formatter: (params: any[]) => {
                                    const item = params[0];
                                    return `<b>${item.name}</b><br/>Faculty Count: <b>${item.value}</b>`;
                                }
                            },
                            grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
                            xAxis: {
                                type: 'category',
                                data: labels,
                                axisLabel: {
                                    interval: 0,
                                    rotate: 30,
                                    color: textColor,
                                    fontSize: 11,
                                    formatter: (val: string) => val.length > 15 ? val.substring(0, 15) + '...' : val
                                },
                                axisLine: { lineStyle: { color: borderColor } }
                            },
                            yAxis: {
                                type: 'value',
                                name: 'Faculty Count',
                                minInterval: 1,
                                axisLabel: { color: textColor },
                                splitLine: { lineStyle: { color: borderColor, type: 'dashed' } }
                            },
                            series: [{
                                name: 'Faculty Count',
                                type: 'bar',
                                barWidth: '40%',
                                data: values,
                                itemStyle: {
                                    color: {
                                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                                        colorStops: [
                                            { offset: 0, color: '#8b5cf6' },
                                            { offset: 1, color: '#6d28d9' }
                                        ]
                                    },
                                    borderRadius: [6, 6, 0, 0]
                                }
                            }]
                        };
                        this.hasOverviewData = true;
                    } else {
                        this.hasOverviewData = false;
                    }
                    this.cdr.markForCheck();
                }
            },
            error: () => {
                this.hasOverviewData = false;
                this.cdr.markForCheck();
            }
        });
    }

    getProgramList() {
        this.programService.getAll().subscribe(data => {
            this.programCount = data.filter(x => x.status === "PUBLISHED").length;
        });
    }

    onProgramClick() {
        this.router.navigateByUrl('/home/cloudbytes/masters/academics/program-list');
    }

    // #region Faculty Subject Allocation
    getFacultyBatchAttendance() {
        this.facultyBatchAttendanceLoading = true;
        this.facultyBatchAttendanceError = false;
        this.facultyBatchAttendanceList = [];
        this.cdr.markForCheck();

        const facultyCode = this.attendanceFilter === 'CurrentEmployee' && this.employeeDetails?.employeeCode
            ? this.employeeDetails.employeeCode
            : 'ALL';

        this.batchAttendanceService.getFacultySubjectAllocationByFacultyCodeActive(facultyCode).subscribe({
            next: (data) => {
                if (data && data.length > 0) {
                    this.processAllocationData(data);
                } else {
                    this.facultyBatchAttendanceLoading = false;
                    this.facultyBatchAttendanceError = false;
                    this.facultyBatchAttendanceList = [];
                    this.cdr.markForCheck();
                }
            },
            error: (error) => {
                this.facultyBatchAttendanceLoading = false;
                this.facultyBatchAttendanceError = true;
                this.facultyBatchAttendanceList = [];
                this.cdr.markForCheck();
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load attendance data.',
                    life: 3000
                });
            }
        });
    }

    private processAllocationData(data: any[]) {
        this.facultyBatchAttendanceList = data;
        this.facultyBatchAttendanceCols = this.originalFacultyBatchAttendanceCols.map(col => ({ ...col }));
        if (this.attendanceFilter === 'CurrentEmployee' && this.employeeDetails?.employeeCode) {
            this.facultyBatchAttendanceCols = this.facultyBatchAttendanceCols.filter(
                (col: any) => col.field !== 'employeeCode' && col.field !== 'employeeName'
            );
        }
        this.facultyBatchAttendanceLoading = false;
        this.facultyBatchAttendanceError = false;
        this.cdr.markForCheck();
    }

    onGlobalFilter(event: Event) {
        if (this.dt) {
            this.dt.filterGlobal((event.target as HTMLInputElement).value, 'contains');
        }
    }

    markAttendance(rowData: any) {
        const academicSessionId = rowData.academicSessionId;
        const programId = rowData.programId;
        const operationalVerticalId = rowData.operationalVerticalId;
        const section = rowData.section;
        const subjectId = rowData.subjectId;
        const subjectPaperCodeId = rowData.subjectPaperCodeId;
        const now = new Date();
        const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString();
        const paperTypeId = rowData.paperTypeId;
        const attendanceType = rowData.attendanceType || 0;

        this.router.navigateByUrl(`/home/mindspark/transactions/batch-attendance-v2/academicSession/${academicSessionId}/program/${programId}/operationalVertical/${operationalVerticalId}/section/${section}/subject/${subjectId}/subjectPaperCode/${subjectPaperCodeId}/date/${date}/paperType/${paperTypeId}/attendanceType/${attendanceType}`);
    }

    private colStyleMap: { [key: string]: any } = {
        'employeeCode': { 'min-width': '120px' },
        'employeeName': { 'min-width': '150px' },
        'academicSessionName': { 'min-width': '150px' },
        'programName': { 'min-width': '100px' },
        'operationalVerticalName': { 'min-width': '150px' },
        'section': { 'min-width': '80px', 'text-align': 'center' },
        'subjectName': { 'min-width': '200px' },
        'subjectPaperCodeName': { 'min-width': '200px' }
    };
    private defaultColStyle = { 'min-width': '150px' };

    public getColStyle(field: string): any {
        return this.colStyleMap[field] || this.defaultColStyle;
    }

    formatDate(date: string): string {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    }

    getAttendanceDisplay(value: number | null): string {
        if (value === null) return 'Not Marked';
        return value === 0 ? 'A' : 'P'.repeat(value);
    }

    toggleBack() {
        this.showDetailedAttendance = false;
        this.detailedAttendanceData = [];
        this.detailedAttendanceCols = [];
        this.detailedAttendanceError = false;
    }

    public getStatusStyle(status: number): any {
        return status === 1 ?
            { 'background-color': 'var(--green-500)', 'color': 'var(--green-50)' } :
            { 'background-color': 'var(--orange-500)', 'color': 'var(--orange-50)' };
    }

    private sectionStyleMap: { [key: string]: any } = {
        'A': { 'background-color': 'var(--blue-500)', 'color': 'var(--blue-50)' },
        'B': { 'background-color': 'var(--green-500)', 'color': 'var(--green-50)' },
        'C': { 'background-color': 'var(--orange-500)', 'color': 'var(--orange-50)' },
        'D': { 'background-color': 'var(--purple-500)', 'color': 'var(--purple-50)' },
        'E': { 'background-color': 'var(--pink-500)', 'color': 'var(--pink-50)' },
        'F': { 'background-color': 'var(--cyan-500)', 'color': 'var(--cyan-50)' },
        'G': { 'background-color': 'var(--yellow-500)', 'color': 'var(--yellow-50)' },
        'H': { 'background-color': 'var(--indigo-500)', 'color': 'var(--indigo-50)' },
        'I': { 'background-color': 'var(--teal-500)', 'color': 'var(--teal-50)' },
        'J': { 'background-color': 'var(--lime-500)', 'color': 'var(--lime-50)' },
    };
    private defaultSectionStyle = { 'background-color': 'var(--gray-500)', 'color': 'var(--gray-50)' };

    public getSectionStyle(section: string): any {
        return this.sectionStyleMap[section] || this.defaultSectionStyle;
    }

    toggleAttendanceFilter() {
        this.attendanceFilter = this.attendanceFilter === 'CurrentEmployee' ? 'ALL' : 'CurrentEmployee';
        this.getFacultyBatchAttendance();
    }

    get colorScheme(): string {
        return this.layoutService.isDarkTheme() ? 'dark' : 'light';
    }

    // #region timetable
    private buildSubjectIconMap() {
        if (!this.timetableData || !Array.isArray(this.timetableData.days)) return;
        const uniqueSubjects: { [key: number]: boolean } = {};
        let iconIndex = 0;

        this.timetableData.days.forEach((day: any) => {
            if (Array.isArray(day.periods)) {
                day.periods.forEach((period: any) => {
                    if (period.subjectId && period.subjectId !== 0 && !uniqueSubjects[period.subjectId]) {
                        uniqueSubjects[period.subjectId] = true;
                        this.subjectIconMap[period.subjectId] = this.availableIcons[iconIndex % this.availableIcons.length];
                        iconIndex++;
                    }
                });
            }
        });
    }

    startTimeTracking() {
        this.updateCurrentTimeHighlight();
        this.currentTimeInterval = setInterval(() => {
            this.updateCurrentTimeHighlight();
        }, 30000);
    }

    private getPeriodIdentifier(period: any): number {
        const timeTablePeriodId = Number(period?.timeTablePeriodId);
        if (timeTablePeriodId > 0) {
            return timeTablePeriodId;
        }

        const fallbackId = Number(period?.id);
        if (fallbackId > 0) {
            return fallbackId;
        }

        return 0;
    }

    updateCurrentTimeHighlight() {
        const now = new Date();
        const currentDayOfWeek = now.getDay();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        let dayId = currentDayOfWeek === 0 ? 7 : currentDayOfWeek;

        const dayExists = this.days.some(d => d.dayId === dayId);

        if (!dayExists || dayId === 7) {
            this.currentDayId = 0;
            this.currentPeriodId = 0;
            this.isCurrentTimeInSession = false;
            return;
        }

        let foundPeriod = 0;
        let isInSession = false;

        for (const period of this.periods) {
            if (!period.periodTime) continue;
            try {
                const [startTime, endTime] = period.periodTime.split(' - ');
                const [startHour, startMinute] = startTime.split(':').map(Number);
                const [endHour, endMinute] = endTime.split(':').map(Number);

                const periodStartMinutes = startHour * 60 + startMinute;
                const periodEndMinutes = endHour * 60 + endMinute;

                if (currentTimeInMinutes >= periodStartMinutes && currentTimeInMinutes < periodEndMinutes) {
                    foundPeriod = this.getPeriodIdentifier(period);
                    isInSession = true;
                    break;
                }
            } catch (error) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: `Error parsing period time for period ID ${period.timeTablePeriodId}` });
            }
        }

        this.currentDayId = dayId;
        this.currentPeriodId = foundPeriod;
        this.isCurrentTimeInSession = isInSession;
    }

    fetchAcademicSchedule(facultyCode: string) {
        this.isLoading = true;
        this.hasValidTimetableAllocations = false;

        this.academicScheduleService.getUniversityTimeTableByFacultyCode(facultyCode, true).subscribe({
            next: data => {
                if (data.days?.length === 0) {
                    this.isLoading = false;
                    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'No timetable found for the selected criteria. Please click on Add button to add a new timetable' });
                    return;
                }
                this.timetableData = data;
                this.hasValidTimetableAllocations = this.hasAnyValidTimetableAllocation(data);
                this.programInfo = {
                    programName: data.programName ?? '',
                    operationalVerticalName: data.operationalVerticalName ?? '',
                    section: data.section ?? ''
                };

                this.days = Array.isArray(data.days)
                    ? data.days.filter((d: any) => d.dayName !== 'Unknown')
                        .map((d: any) => ({ dayId: d.dayId, dayName: d.dayName }))
                    : [];

                this.periods = Array.isArray(data.days) && data.days.length > 0
                    ? (Array.isArray(data.days[0].periods)
                        ? data.days[0].periods.map((p: any) => ({
                            timeTablePeriodId: this.getPeriodIdentifier(p),
                            timeTablePeriodName: p.periodName,
                            periodTime: p.periodTime
                        }))
                        : [])
                    : [];

                this.buildSubjectIconMap();
                this.buildEmployeeColorMap();
                this.updateCurrentTimeHighlight();
                this.isLoading = false;
            },
            error: error => {
                this.isLoading = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
            }
        });
    }

    private hasAnyValidTimetableAllocation(data: any): boolean {
        if (!data || !Array.isArray(data.days)) {
            return false;
        }

        return data.days.some((day: any) =>
            Array.isArray(day.periods) && day.periods.some((period: any) => {
                const hasSubjectId = Number(period?.subjectId) > 0;
                const hasSubjectPaperCodeId = Number(period?.subjectPaperCodeId) > 0;
                const hasEmployeeCode = typeof period?.employeeCode === 'string' && period.employeeCode.trim().length > 0;

                return hasSubjectId && hasSubjectPaperCodeId && hasEmployeeCode;
            })
        );
    }

    private escapeTooltipValue(value: any): string {
        const text = value == null || value === '' ? 'N/A' : String(value);
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    getCellTooltip(dayId: number, periodId: number): string {
        if (!this.timetableData) {
            return `
        <div class="tooltip-grid">
          <div class="tooltip-label">Session:</div><div class="tooltip-value">N/A</div>
          <div class="tooltip-label">Program:</div><div class="tooltip-value">N/A</div>
          <div class="tooltip-label">Semester:</div><div class="tooltip-value">N/A</div>
          <div class="tooltip-label">Subject Code:</div><div class="tooltip-value">N/A</div>
          <div class="tooltip-label">Subject Name:</div><div class="tooltip-value">N/A</div>
        </div>
      `;
        }

        const day = this.timetableData.days?.find((d: any) => d.dayId === dayId);
        const period = day?.periods?.find((p: any) => this.getPeriodIdentifier(p) === periodId);

        const session = period?.academicSessionName || this.timetableData?.academicSessionName || 'N/A';
        const program = period?.programName || this.timetableData?.programName || this.programInfo?.programName || 'N/A';
        const semester = period?.operationalVerticalName || this.timetableData?.operationalVerticalName || this.programInfo?.operationalVerticalName || 'N/A';
        const subjectCode = period?.subjectPaperCodeName || 'N/A';
        const subjectName = period?.subjectName || 'N/A';

        return `
      <div class="tooltip-grid">
        <div class="tooltip-label">Session:</div><div class="tooltip-value">${this.escapeTooltipValue(session)}</div>
        <div class="tooltip-label">Program:</div><div class="tooltip-value">${this.escapeTooltipValue(program)}</div>
        <div class="tooltip-label">Semester:</div><div class="tooltip-value">${this.escapeTooltipValue(semester)}</div>
        <div class="tooltip-label">Subject Code:</div><div class="tooltip-value">${this.escapeTooltipValue(subjectCode)}</div>
        <div class="tooltip-label">Subject Name:</div><div class="tooltip-value">${this.escapeTooltipValue(subjectName)}</div>
      </div>
    `;
    }

    getSubjectForDayAndPeriod(dayId: number, periodId: number): any {
        if (!this.timetableData) return null;
        const day = this.timetableData.days.find((d: any) => d.dayId === dayId);
        if (!day) return null;
        const period = day.periods.find((p: any) => this.getPeriodIdentifier(p) === periodId);
        if (!period) return null;

        if (period.breakType && period.breakType.trim() !== '') {
            return { isBreak: true, breakType: period.breakType };
        }

        if (period.subjectId === 0) {
            return null;
        }

        const subjectIcon = this.subjectIconMap[period.subjectId] || 'pi pi-book';
        const employeeColor = this.employeeColorMap[period.employeeCode] || '#F8F9FA';

        return {
            isBreak: false,
            subjectIcon,
            employeeColor,
            subjectName: period.subjectName || '',
            subjectPaperCodeName: period.subjectPaperCodeName || '',
            employeeCode: period.employeeCode || '',
            employeeName: period.employeeName || '',
            roomNumber: period.roomNumber || ''
        };
    }

    isCurrentCell(dayId: number, periodId: number): boolean {
        return this.isCurrentTimeInSession && this.currentDayId === dayId && this.currentPeriodId === periodId;
    }

    private buildEmployeeColorMap() {
        if (!this.timetableData || !Array.isArray(this.timetableData.days)) return;
        const uniqueEmployees: { [key: string]: boolean } = {};
        let colorIndex = 0;

        this.timetableData.days.forEach((day: any) => {
            if (Array.isArray(day.periods)) {
                day.periods.forEach((period: any) => {
                    if (period.employeeCode && !uniqueEmployees[period.employeeCode]) {
                        uniqueEmployees[period.employeeCode] = true;
                        this.employeeColorMap[period.employeeCode] = this.availableColors[colorIndex % this.availableColors.length];
                        colorIndex++;
                    }
                });
            }
        });
    }

    // #endregion

    ngOnDestroy(): void {
        if (this.currentTimeInterval) {
            clearInterval(this.currentTimeInterval);
        }

        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}