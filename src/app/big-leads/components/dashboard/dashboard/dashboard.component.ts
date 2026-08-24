import { LayoutService } from '@/app/layout/service/layout.service';
import { SharedModule } from '@/shared.module';
import { ChangeDetectorRef, Component, effect, OnDestroy, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { debounceTime, Subscription } from 'rxjs';
import { StudentRegisterService } from 'src/app/big-leads/services/student-register.service';
import { StudentRegister } from 'src/app/shared/models/bigleads/student-register';
import { ProgramShortCodesModel } from 'src/app/shared/models/cloudbytes/program-short-codes';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [SharedModule],
})
export class DashboardComponent implements OnInit, OnDestroy {
    monthlyAdmissionsChartData: any;
    monthlyAdmissionsChartOptions: any;
    genderChartData: any;
    genderChartOptions: any;
    stateChartData: any;
    stateChartOptions: any;
    programChartData: any;
    programChartOptions: any;
    sessionChartData: any;
    sessionChartOptions: any;
    categoryChartData: any;
    categoryChartOptions: any;
    concessionChartData: any;
    concessionChartOptions: any;
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
            this.initCharts();
            if (this.rawStudents.length > 0) {
                this.applyDashboardFilters();
            }
        });
    }

    ngOnInit() {
        this.initCharts();
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
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

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
                    const programName = this.getDisplayValue(
                        student.programName,
                    );
                    if (!programName) {
                        return acc;
                    }

                    const programKey =
                        programName as keyof typeof ProgramShortCodesModel;
                    const shortCode =
                        ProgramShortCodesModel[programKey]?.shortCode ||
                        programName;
                    acc[shortCode] = (acc[shortCode] || 0) + 1;
                    return acc;
                },
                {} as Record<string, number>,
            ),
        ).slice(0, 8);

        const monthlyTrend = this.buildMonthlyAdmissionsTrend(students);

        const palette = [
            '#2563eb',
            '#0ea5e9',
            '#10b981',
            '#f59e0b',
            '#ef4444',
            '#8b5cf6',
            '#14b8a6',
            '#f97316',
        ];
        const genderGradients = [
            this.createGradient(ctx, '#ec4899', '#f9a8d4'),
            this.createGradient(ctx, '#2563eb', '#7dd3fc'),
            this.createGradient(ctx, '#14b8a6', '#5eead4'),
        ];

        this.monthlyAdmissionsChartData = {
            labels: monthlyTrend.labels,
            datasets: [
                {
                    label: 'Admissions',
                    data: monthlyTrend.values,
                    fill: true,
                    tension: 0.35,
                    borderWidth: 3,
                    borderColor: '#2563eb',
                    backgroundColor: this.createGradient(
                        ctx,
                        'rgba(37, 99, 235, 0.35)',
                        'rgba(37, 99, 235, 0.04)',
                    ),
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                },
            ],
        };

        this.genderChartData = {
            labels: genderEntries.map(([label]) => label),
            datasets: [
                {
                    data: genderEntries.map(([, value]) => value),
                    backgroundColor: genderGradients.slice(
                        0,
                        Math.max(genderEntries.length, 1),
                    ),
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    hoverOffset: 12,
                },
            ],
        };

        this.stateChartData = {
            labels: stateEntries.map(([label]) => label),
            datasets: [
                {
                    label: 'Students',
                    data: stateEntries.map(([, value]) => value),
                    backgroundColor: this.createGradient(
                        ctx,
                        '#14b8a6',
                        '#67e8f9',
                    ),
                    borderRadius: 10,
                    borderSkipped: false,
                    maxBarThickness: 28,
                },
            ],
        };

        this.programChartData = {
            labels: programEntries.map(([label]) => label),
            datasets: [
                {
                    label: 'Students',
                    data: programEntries.map(([, value]) => value),
                    backgroundColor: this.createGradient(
                        ctx,
                        '#7c3aed',
                        '#c4b5fd',
                    ),
                    borderRadius: 10,
                    borderSkipped: false,
                    maxBarThickness: 22,
                },
            ],
        };

        this.sessionChartData = {
            labels: sessionEntries.map(([label]) => label),
            datasets: [
                {
                    label: 'Students',
                    data: sessionEntries.map(([, value]) => value),
                    backgroundColor: this.createGradient(
                        ctx,
                        '#f59e0b',
                        '#fde68a',
                    ),
                    borderRadius: 10,
                    borderSkipped: false,
                    maxBarThickness: 30,
                },
            ],
        };

        this.categoryChartData = {
            labels: categoryEntries.map(([label]) => label),
            datasets: [
                {
                    data: categoryEntries.map(([, value]) => value),
                    backgroundColor: categoryEntries.map(
                        (_, index) => palette[index % palette.length],
                    ),
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    hoverOffset: 10,
                },
            ],
        };

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
        this.concessionChartData =
            concessionEntries.length > 0
                ? {
                    labels: concessionEntries.map(([label]) => label),
                    datasets: [
                        {
                            label: 'Students',
                            data: concessionEntries.map(([, value]) => value),
                            backgroundColor: concessionEntries.map(
                                (_, index) => palette[index % palette.length],
                            ),
                            borderRadius: 10,
                            borderSkipped: false,
                            maxBarThickness: 28,
                        },
                    ],
                }
                : null;
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary',
        );
        const borderColor = documentStyle.getPropertyValue('--surface-border');

        this.monthlyAdmissionsChartOptions = this.getLineChartOptions(
            'Admissions Trend (Last 12 Months)',
            textColorSecondary,
            borderColor,
        );
        this.genderChartOptions = this.getDoughnutChartOptions(
            'Gender Distribution',
            textColorSecondary,
        );
        this.stateChartOptions = this.getBarChartOptions(
            'Students by State',
            textColorSecondary,
            borderColor,
            false,
        );
        this.programChartOptions = this.getBarChartOptions(
            'Top Programs by Enrollment',
            textColorSecondary,
            borderColor,
            true,
        );
        this.sessionChartOptions = this.getBarChartOptions(
            'Students by Academic Session',
            textColorSecondary,
            borderColor,
            false,
        );
        this.categoryChartOptions = this.getDoughnutChartOptions(
            'Category Mix',
            textColorSecondary,
        );
        this.concessionChartOptions = this.getBarChartOptions(
            'Concessions by Category',
            textColorSecondary,
            borderColor,
            true,
        );

        if (this.rawStudents.length > 0) {
            this.applyDashboardFilters();
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

    createGradient(
        context: CanvasRenderingContext2D | null,
        fromColor: string,
        toColor: string,
    ) {
        if (!context) {
            return fromColor;
        }

        const gradient = context.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, fromColor);
        gradient.addColorStop(1, toColor);
        return gradient;
    }

    getTooltipOptions() {
        const isDark = this.layoutService.isDarkTheme() ? '#879AAF' : '#E4E7EB'

        return {
            backgroundColor: isDark
                ? 'rgba(15, 23, 42, 0.95)'
                : 'rgba(255, 255, 255, 0.96)',
            titleColor: isDark ? '#ffffff' : '#111827',
            bodyColor: isDark ? '#e5e7eb' : '#374151',
            titleFont: { size: 13, weight: 'bold' },
            bodyFont: { size: 12 },
            padding: 12,
            cornerRadius: 10,
            displayColors: true,
        };
    }

    getLineChartOptions(title: string, textColor: string, borderColor: string) {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: title,
                    color: textColor,
                    font: { size: 16, weight: 'bold' },
                },
                tooltip: this.getTooltipOptions(),
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0,
                        color: textColor,
                    },
                    grid: {
                        color: borderColor,
                        drawBorder: false,
                    },
                },
                x: {
                    ticks: {
                        color: textColor,
                    },
                    grid: {
                        display: false,
                    },
                },
            },
        };
    }

    getBarChartOptions(
        title: string,
        textColor: string,
        borderColor: string,
        horizontal: boolean,
    ) {
        return {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: horizontal ? 'y' : 'x',
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: title,
                    color: textColor,
                    font: { size: 16, weight: 'bold' },
                },
                tooltip: this.getTooltipOptions(),
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0,
                        color: textColor,
                    },
                    grid: {
                        color: borderColor,
                        drawBorder: false,
                    },
                },
                x: {
                    ticks: {
                        precision: 0,
                        color: textColor,
                    },
                    grid: {
                        display: !horizontal,
                        color: horizontal ? borderColor : 'transparent',
                    },
                },
            },
        };
    }

    getDoughnutChartOptions(title: string, textColor: string) {
        return {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '58%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 18,
                    },
                },
                title: {
                    display: true,
                    text: title,
                    color: textColor,
                    font: { size: 16, weight: 'bold' },
                },
                tooltip: this.getTooltipOptions(),
            },
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
