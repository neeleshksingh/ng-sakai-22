import { LayoutService } from '@/app/layout/service/layout.service';
import { SharedModule } from '@/shared.module';
import { ChangeDetectorRef, Component, effect, OnDestroy, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { debounceTime, Subscription } from 'rxjs';
import { StudentRegisterService } from 'src/app/big-leads/services/student-register.service';
import { StudentRegister } from 'src/app/shared/models/bigleads/student-register';
import { ProgramShortCodesModel } from 'src/app/shared/models/cloudbytes/program-short-codes';
import type { EChartsOption } from 'echarts';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [SharedModule],
})
export class DashboardComponent implements OnInit, OnDestroy {
    monthlyAdmissionsChartOptions: EChartsOption = {};
    genderChartOptions: EChartsOption = {};
    stateChartOptions: EChartsOption = {};
    programChartOptions: EChartsOption = {};
    sessionChartOptions: EChartsOption = {};
    categoryChartOptions: EChartsOption = {};
    concessionChartOptions: EChartsOption = {};
    hasConcessionData: boolean = false;

    loading: boolean = true;
    subscription!: Subscription;
    rawStudents: StudentRegister[] = [];
    filteredStudents: StudentRegister[] = [];

    academicSessionOptions: SelectItem[] = [];
    programOptions: SelectItem[] = [];
    schemeOptions: SelectItem[] = [];

    selectedAcademicSessions: string[] = [];
    selectedPrograms: string[] = [];
    selectedSchemes: string[] = [];

    totalAdmissionsCount: number = 0;
    newAdmissionsCount: number = 0;
    studentIdAssignedCount: number = 0;
    provisionalAdmissionCount: number = 0;
    activeAcademicSessions: number = 0;
    totalPrograms: number = 0;
    activeSchemes: number = 0;
    completeAdmissionCount: number = 0;
    studentsWithDueAmountCount: number = 0;
    activeStates: number = 0;
    totalConcessionAmount: number = 0;
    totalDueAmount: number = 0;
    concessionStudentsCount: number = 0;
    topProgramName: string = '-';
    topStateName: string = '-';
    currentMonth: string = new Date().toLocaleString('default', {
        month: 'long',
    });

    constructor(
        public layoutService: LayoutService,
        private studentRegisterService: StudentRegisterService,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef,
    ) {
        effect(() => {
            this.layoutService.layoutConfig().darkTheme;
            if (this.rawStudents.length > 0) {
                this.applyDashboardFilters();
            }
        });
    }

    ngOnInit() {
        this.getStudentRegister();
    }

    getStudentRegister() {
        this.loading = true;
        const admissionYear = new Date().getFullYear().toString();

        this.studentRegisterService
            .getStudentRegisterByAdmissionYear(admissionYear)
            .subscribe({
                next: (data: any) => {
                    try {
                        const students = this.extractStudentArray(data);
                        if (students.length > 0) {
                            this.processStudentData(students);
                            this.loading = false;
                            this.cdr.markForCheck();
                        } else {
                            // If current year returns empty, fetch all records as fallback
                            this.fetchFallbackStudents();
                        }
                    } catch (err) {
                        console.error('Error processing student data:', err);
                        this.loading = false;
                        this.cdr.markForCheck();
                    }
                },
                error: (error) => {
                    // On error, attempt fallback to getAll() before giving up
                    this.fetchFallbackStudents();
                },
            });
    }

    private fetchFallbackStudents() {
        this.studentRegisterService.getAll().subscribe({
            next: (data: any) => {
                try {
                    const students = this.extractStudentArray(data);
                    this.processStudentData(students);
                } catch (err) {
                    console.error('Error processing fallback student data:', err);
                    this.resetKpis();
                } finally {
                    this.loading = false;
                    this.cdr.markForCheck();
                }
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: error?.error?.message || 'Something went wrong while fetching dashboard data',
                    life: 3000,
                });
                this.resetKpis();
                this.loading = false;
                this.cdr.markForCheck();
            },
        });
    }

    private extractStudentArray(data: any): StudentRegister[] {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        if (Array.isArray(data.data)) return data.data;
        if (Array.isArray(data.result)) return data.result;
        if (Array.isArray(data.items)) return data.items;
        return [];
    }

    private processStudentData(students: StudentRegister[]) {
        this.rawStudents = students || [];
        this.initializeFilterOptions(this.rawStudents);
        this.applyDashboardFilters();
    }

    private resetKpis() {
        this.provisionalAdmissionCount = 0;
        this.activeAcademicSessions = 0;
        this.totalPrograms = 0;
        this.activeSchemes = 0;
        this.totalAdmissionsCount = 0;
        this.newAdmissionsCount = 0;
        this.studentIdAssignedCount = 0;
        this.completeAdmissionCount = 0;
        this.studentsWithDueAmountCount = 0;
        this.activeStates = 0;
        this.totalConcessionAmount = 0;
        this.totalDueAmount = 0;
        this.concessionStudentsCount = 0;
        this.topProgramName = '-';
        this.topStateName = '-';
        this.rawStudents = [];
        this.filteredStudents = [];
    }

    initializeFilterOptions(students: StudentRegister[]) {
        students = Array.isArray(students) ? students : [];
        this.academicSessionOptions = this.buildSelectItems(
            students,
            (student) => student.academicSessionName,
        );
        this.programOptions = this.buildSelectItems(
            students,
            (student) => student.programName,
        );
        this.schemeOptions = this.buildSelectItems(
            students,
            (student) => student.operationalVerticalName,
        );
    }

    applyDashboardFilters() {
        const raw = Array.isArray(this.rawStudents) ? this.rawStudents : [];
        this.filteredStudents = raw.filter(
            (student) =>
                this.matchesFilter(
                    student?.academicSessionName,
                    this.selectedAcademicSessions,
                ) &&
                this.matchesFilter(
                    student?.programName,
                    this.selectedPrograms,
                ) &&
                this.matchesFilter(
                    student?.operationalVerticalName,
                    this.selectedSchemes,
                ),
        );

        this.updateKpis(this.filteredStudents);
        this.updateCharts(this.filteredStudents);
        this.cdr.markForCheck();
    }

    resetDashboardFilters() {
        this.selectedAcademicSessions = [];
        this.selectedPrograms = [];
        this.selectedSchemes = [];
        this.applyDashboardFilters();
    }

    updateKpis(students: StudentRegister[]) {
        const now = new Date();
        this.totalAdmissionsCount = students.length;
        this.newAdmissionsCount = students.filter((student) => {
            const admissionDate = this.parseDate(student.dateOfAdmission);
            return (
                admissionDate !== null &&
                admissionDate.getFullYear() === now.getFullYear() &&
                admissionDate.getMonth() === now.getMonth()
            );
        }).length;
        this.studentIdAssignedCount = students.filter(
            (student) => !!this.getDisplayValue(student.studentId as string),
        ).length;
        this.provisionalAdmissionCount = students.filter(
            (student) => !!String(student.provisionalNumber ?? '').trim(),
        ).length;
        this.activeAcademicSessions = new Set(
            students
                .map((student) =>
                    this.getDisplayValue(student.academicSessionName),
                )
                .filter(Boolean),
        ).size;
        this.totalPrograms = new Set(
            students
                .map((student) => this.getDisplayValue(student.programName))
                .filter(Boolean),
        ).size;
        this.activeSchemes = new Set(
            students
                .map((student) =>
                    this.getDisplayValue(student.operationalVerticalName),
                )
                .filter(Boolean),
        ).size;
        this.activeStates = new Set(
            students
                .map((student) => this.getDisplayValue(student.state))
                .filter(Boolean),
        ).size;
        this.totalConcessionAmount = students.reduce(
            (sum, student) => sum + this.toNumber(student.concessionAmount),
            0,
        );
        this.totalDueAmount = students.reduce(
            (sum, student) => sum + this.toNumber(student.dueAmount),
            0,
        );

        const topProgram = this.getSortedEntries(
            this.buildCountMap(students, (student) =>
                this.getDisplayValue(student.programName),
            ),
        )[0];
        const topState = this.getSortedEntries(
            this.buildCountMap(students, (student) =>
                this.getDisplayValue(student.state),
            ),
        )[0];

        this.topProgramName = topProgram?.[0] || '-';
        this.topStateName = topState?.[0] || '-';

        this.completeAdmissionCount = students.filter(
            (student) =>
                this.getDisplayValue(student.studentId as string) !== '' &&
                this.toNumber(student.dueAmount) === 0,
        ).length;
        this.studentsWithDueAmountCount = students.filter(
            (student) => this.toNumber(student.dueAmount) > 0,
        ).length;
        this.concessionStudentsCount = students.filter(
            (s) => (s.concessionAmount ?? 0) > 0 || !!s.concessionCategoryName,
        ).length;
    }

    updateCharts(students: StudentRegister[]) {
        const isDark = this.colorScheme === 'dark';
        const textColor = isDark ? '#cbd5e1' : '#64748b';
        const borderColor = isDark ? '#334155' : '#e2e8f0';

        const palette = [
            '#2563eb', '#0ea5e9', '#10b981', '#f59e0b',
            '#ef4444', '#8b5cf6', '#14b8a6', '#f97316',
        ];
        const genderColors = ['#ec4899', '#2563eb', '#14b8a6'];

        const genderEntries = this.getSortedEntries(
            this.buildCountMap(students, (student) =>
                this.normalizeGender(student.gender),
            ),
        );
        const stateEntries = this.getSortedEntries(
            this.buildCountMap(students, (student) =>
                this.getDisplayValue(student.state),
            ),
        ).slice(0, 10);
        const sessionEntries = this.getSortedEntries(
            this.buildCountMap(students, (student) =>
                this.getDisplayValue(student.academicSessionName),
            ),
        );
        const categoryEntries = this.getSortedEntries(
            this.buildCountMap(students, (student) =>
                this.getDisplayValue(student.category),
            ),
        ).slice(0, 6);

        const programEntries = this.getSortedEntries(
            students.reduce(
                (acc, student) => {
                    const programName = this.getDisplayValue(student.programName);
                    if (!programName) return acc;
                    const programKey = programName as keyof typeof ProgramShortCodesModel;
                    const shortCode = ProgramShortCodesModel[programKey]?.shortCode || programName;
                    acc[shortCode] = (acc[shortCode] || 0) + 1;
                    return acc;
                },
                {} as Record<string, number>,
            ),
        ).slice(0, 8);

        const monthlyTrend = this.buildMonthlyAdmissionsTrend(students);

        // ── Monthly Admissions Line Chart ──
        this.monthlyAdmissionsChartOptions = {
            backgroundColor: 'transparent',
            title: {
                text: 'Admissions Trend (Last 12 Months)',
                left: 'center',
                textStyle: { fontSize: 16, fontWeight: 'bold', color: textColor }
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.96)',
                textStyle: { color: isDark ? '#e5e7eb' : '#374151', fontSize: 12 },
                borderWidth: 0, padding: 12, borderRadius: 10
            },
            grid: { left: '3%', right: '4%', bottom: '10%', top: '15%', containLabel: true },
            xAxis: {
                type: 'category',
                data: monthlyTrend.labels,
                axisLabel: { color: textColor },
                axisLine: { lineStyle: { color: borderColor } },
                axisTick: { show: false }
            },
            yAxis: {
                type: 'value',
                minInterval: 1,
                axisLabel: { color: textColor },
                splitLine: { lineStyle: { color: borderColor, type: 'dashed' } }
            },
            series: [{
                name: 'Admissions',
                type: 'line',
                data: monthlyTrend.values,
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: { color: '#2563eb', width: 3 },
                itemStyle: { color: '#2563eb', borderColor: '#ffffff', borderWidth: 2 },
                areaStyle: {
                    color: {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(37, 99, 235, 0.35)' },
                            { offset: 1, color: 'rgba(37, 99, 235, 0.04)' }
                        ]
                    }
                }
            }]
        };

        // ── Gender Doughnut Chart ──
        this.genderChartOptions = {
            backgroundColor: 'transparent',
            title: {
                text: 'Gender Distribution',
                left: 'center',
                textStyle: { fontSize: 16, fontWeight: 'bold', color: textColor }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)',
                backgroundColor: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.96)',
                textStyle: { color: isDark ? '#e5e7eb' : '#374151', fontSize: 12 },
                borderWidth: 0, padding: 12, borderRadius: 10
            },
            legend: {
                bottom: 0,
                textStyle: { color: textColor },
                icon: 'circle',
                itemGap: 18
            },
            series: [{
                type: 'pie',
                radius: ['42%', '70%'],
                center: ['50%', '48%'],
                avoidLabelOverlap: false,
                label: { show: true, position: 'inside', formatter: '{d}%', fontSize: 11, fontWeight: 'bold', color: '#fff' },
                labelLine: { show: false },
                data: genderEntries.map(([label, value], i) => ({
                    value, name: label,
                    itemStyle: { color: genderColors[i % genderColors.length], borderColor: '#ffffff', borderWidth: 2 }
                }))
            }]
        };

        // ── State Bar Chart (vertical) ──
        this.stateChartOptions = {
            backgroundColor: 'transparent',
            title: {
                text: 'Students by State',
                left: 'center',
                textStyle: { fontSize: 16, fontWeight: 'bold', color: textColor }
            },
            tooltip: {
                trigger: 'axis', axisPointer: { type: 'shadow' },
                backgroundColor: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.96)',
                textStyle: { color: isDark ? '#e5e7eb' : '#374151', fontSize: 12 },
                borderWidth: 0, padding: 12, borderRadius: 10
            },
            grid: { left: '3%', right: '4%', bottom: '10%', top: '15%', containLabel: true },
            xAxis: {
                type: 'category',
                data: stateEntries.map(([label]) => label),
                axisLabel: { color: textColor, rotate: 30, fontSize: 10 },
                axisLine: { lineStyle: { color: borderColor } },
                axisTick: { show: false }
            },
            yAxis: {
                type: 'value', minInterval: 1,
                axisLabel: { color: textColor },
                splitLine: { lineStyle: { color: borderColor, type: 'dashed' } }
            },
            series: [{
                name: 'Students', type: 'bar',
                data: stateEntries.map(([, value]) => value),
                itemStyle: {
                    color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#14b8a6' }, { offset: 1, color: '#67e8f9' }] },
                    borderRadius: [10, 10, 0, 0]
                },
                barMaxWidth: 28
            }]
        };

        // ── Program Bar Chart (horizontal) ──
        this.programChartOptions = {
            backgroundColor: 'transparent',
            title: {
                text: 'Top Programs by Enrollment',
                left: 'center',
                textStyle: { fontSize: 16, fontWeight: 'bold', color: textColor }
            },
            tooltip: {
                trigger: 'axis', axisPointer: { type: 'shadow' },
                backgroundColor: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.96)',
                textStyle: { color: isDark ? '#e5e7eb' : '#374151', fontSize: 12 },
                borderWidth: 0, padding: 12, borderRadius: 10
            },
            grid: { left: '3%', right: '8%', bottom: '5%', top: '15%', containLabel: true },
            yAxis: {
                type: 'category',
                data: programEntries.map(([label]) => label),
                inverse: true,
                axisLabel: { color: textColor, fontSize: 11 },
                axisLine: { show: false }, axisTick: { show: false }
            },
            xAxis: {
                type: 'value', minInterval: 1,
                axisLabel: { color: textColor },
                splitLine: { lineStyle: { color: borderColor, type: 'dashed' } }
            },
            series: [{
                name: 'Students', type: 'bar',
                data: programEntries.map(([, value]) => value),
                itemStyle: {
                    color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#7c3aed' }, { offset: 1, color: '#c4b5fd' }] },
                    borderRadius: [0, 10, 10, 0]
                },
                barMaxWidth: 22
            }]
        };

        // ── Session Bar Chart (vertical) ──
        this.sessionChartOptions = {
            backgroundColor: 'transparent',
            title: {
                text: 'Students by Academic Session',
                left: 'center',
                textStyle: { fontSize: 16, fontWeight: 'bold', color: textColor }
            },
            tooltip: {
                trigger: 'axis', axisPointer: { type: 'shadow' },
                backgroundColor: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.96)',
                textStyle: { color: isDark ? '#e5e7eb' : '#374151', fontSize: 12 },
                borderWidth: 0, padding: 12, borderRadius: 10
            },
            grid: { left: '3%', right: '4%', bottom: '10%', top: '15%', containLabel: true },
            xAxis: {
                type: 'category',
                data: sessionEntries.map(([label]) => label),
                axisLabel: { color: textColor, rotate: 20, fontSize: 10 },
                axisLine: { lineStyle: { color: borderColor } },
                axisTick: { show: false }
            },
            yAxis: {
                type: 'value', minInterval: 1,
                axisLabel: { color: textColor },
                splitLine: { lineStyle: { color: borderColor, type: 'dashed' } }
            },
            series: [{
                name: 'Students', type: 'bar',
                data: sessionEntries.map(([, value]) => value),
                itemStyle: {
                    color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#f59e0b' }, { offset: 1, color: '#fde68a' }] },
                    borderRadius: [10, 10, 0, 0]
                },
                barMaxWidth: 30
            }]
        };

        // ── Category Doughnut Chart ──
        this.categoryChartOptions = {
            backgroundColor: 'transparent',
            title: {
                text: 'Category Mix',
                left: 'center',
                textStyle: { fontSize: 16, fontWeight: 'bold', color: textColor }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)',
                backgroundColor: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.96)',
                textStyle: { color: isDark ? '#e5e7eb' : '#374151', fontSize: 12 },
                borderWidth: 0, padding: 12, borderRadius: 10
            },
            legend: {
                bottom: 0,
                textStyle: { color: textColor },
                icon: 'circle',
                itemGap: 18
            },
            series: [{
                type: 'pie',
                radius: ['42%', '70%'],
                center: ['50%', '48%'],
                avoidLabelOverlap: false,
                label: { show: true, position: 'inside', formatter: '{d}%', fontSize: 11, fontWeight: 'bold', color: '#fff' },
                labelLine: { show: false },
                data: categoryEntries.map(([label, value], i) => ({
                    value, name: label,
                    itemStyle: { color: palette[i % palette.length], borderColor: '#ffffff', borderWidth: 2 }
                }))
            }]
        };

        // ── Concession Bar Chart (horizontal) ──
        const concessionStudents = students.filter(
            (s) =>
                (s.concessionCategoryId ?? 0) > 0 ||
                this.getDisplayValue(s.concessionCategoryName) !== '',
        );
        const concessionEntries = this.getSortedEntries(
            this.buildCountMap(concessionStudents, (s) =>
                this.getDisplayValue(s.concessionCategoryName),
            ),
        );

        if (concessionEntries.length > 0) {
            this.hasConcessionData = true;
            this.concessionChartOptions = {
                backgroundColor: 'transparent',
                title: {
                    text: 'Concessions by Category',
                    left: 'center',
                    textStyle: { fontSize: 16, fontWeight: 'bold', color: textColor }
                },
                tooltip: {
                    trigger: 'axis', axisPointer: { type: 'shadow' },
                    backgroundColor: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.96)',
                    textStyle: { color: isDark ? '#e5e7eb' : '#374151', fontSize: 12 },
                    borderWidth: 0, padding: 12, borderRadius: 10
                },
                grid: { left: '3%', right: '8%', bottom: '5%', top: '15%', containLabel: true },
                yAxis: {
                    type: 'category',
                    data: concessionEntries.map(([label]) => label),
                    inverse: true,
                    axisLabel: { color: textColor, fontSize: 11 },
                    axisLine: { show: false }, axisTick: { show: false }
                },
                xAxis: {
                    type: 'value', minInterval: 1,
                    axisLabel: { color: textColor },
                    splitLine: { lineStyle: { color: borderColor, type: 'dashed' } }
                },
                series: [{
                    name: 'Students', type: 'bar',
                    data: concessionEntries.map(([, value], i) => ({
                        value,
                        itemStyle: { color: palette[i % palette.length], borderRadius: [0, 10, 10, 0] }
                    })),
                    barMaxWidth: 28
                }]
            };
        } else {
            this.hasConcessionData = false;
            this.concessionChartOptions = {};
        }
    }

    buildSelectItems(
        students: StudentRegister[],
        selector: (student: StudentRegister) => string | undefined,
    ): SelectItem[] {
        const list = Array.isArray(students) ? students : [];
        return Array.from(
            new Set(list.map(selector).filter((value) => !!value)),
        )
            .sort((left, right) => (left || '').localeCompare(right || ''))
            .map((value) => ({ label: value || '', value: value || '' }));
    }

    matchesFilter(value: string | undefined, selectedValues: string[]) {
        return (
            selectedValues.length === 0 ||
            selectedValues.includes(this.getDisplayValue(value))
        );
    }

    buildCountMap(
        students: StudentRegister[],
        selector: (student: StudentRegister) => string,
    ): Record<string, number> {
        const list = Array.isArray(students) ? students : [];
        return list.reduce(
            (accumulator, student) => {
                const key = selector(student);
                if (!key) {
                    return accumulator;
                }

                accumulator[key] = (accumulator[key] || 0) + 1;
                return accumulator;
            },
            {} as Record<string, number>,
        );
    }

    getSortedEntries(counts: Record<string, number>) {
        return Object.entries(counts).sort((left, right) => right[1] - left[1]);
    }

    buildMonthlyAdmissionsTrend(students: StudentRegister[]) {
        const currentDate = new Date();
        const months = Array.from({ length: 12 }, (_, index) => {
            const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - (11 - index),
                1,
            );
            return {
                key: `${date.getFullYear()}-${date.getMonth()}`,
                label: date.toLocaleString('default', {
                    month: 'short',
                    year: '2-digit',
                }),
                count: 0,
            };
        });

        const monthMap = months.reduce(
            (accumulator, month) => {
                accumulator[month.key] = month;
                return accumulator;
            },
            {} as Record<string, { key: string; label: string; count: number }>,
        );

        students.forEach((student) => {
            const admissionDate = this.parseDate(student.dateOfAdmission);
            if (!admissionDate) {
                return;
            }

            const key = `${admissionDate.getFullYear()}-${admissionDate.getMonth()}`;
            if (monthMap[key]) {
                monthMap[key].count += 1;
            }
        });

        return {
            labels: months.map((month) => month.label),
            values: months.map((month) => month.count),
        };
    }

    parseDate(value: Date | string | undefined) {
        if (!value) {
            return null;
        }

        const parsedDate = new Date(value);
        return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
    }

    getDisplayValue(value: string | undefined | null) {
        return (value || '').trim();
    }

    normalizeGender(value: string | undefined) {
        const normalizedValue = this.getDisplayValue(value).toLowerCase();

        if (normalizedValue === 'male') {
            return 'Male';
        }

        if (normalizedValue === 'female') {
            return 'Female';
        }

        return 'Other';
    }

    isSessionFromYear(sessionName: string | undefined, minimumYear: number) {
        const normalizedSession = this.getDisplayValue(sessionName);

        if (!normalizedSession) {
            return false;
        }

        const yearMatch = normalizedSession.match(/\b(\d{4})\b/);
        if (!yearMatch) {
            return false;
        }

        return Number(yearMatch[1]) >= minimumYear;
    }

    toNumber(value: number | undefined | null) {
        return Number(value || 0);
    }

    get colorScheme(): string {
        return this.layoutService.isDarkTheme() ? 'dark' : 'light';
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
