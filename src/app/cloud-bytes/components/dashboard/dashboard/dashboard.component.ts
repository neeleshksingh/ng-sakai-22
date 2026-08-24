import { LayoutService } from '@/app/layout/service/layout.service';
import { SharedModule } from '@/shared.module';
import { ChangeDetectorRef, Component, effect, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AcademicSessionProgramService } from 'src/app/cloud-bytes/services/academic-session-program.service';
import { AcademicSessionService } from 'src/app/cloud-bytes/services/academic-session.service';
import { DegreeService } from 'src/app/cloud-bytes/services/degree.service';
import { DepartmentService } from 'src/app/cloud-bytes/services/department.service';
import { OrganizationalHolidayService } from 'src/app/cloud-bytes/services/organizational-holiday.service';
import { ProgramService } from 'src/app/cloud-bytes/services/program.service';
import { RoomService } from 'src/app/cloud-bytes/services/room.service';
import { SubjectService } from 'src/app/cloud-bytes/services/subject.service';
import { AcademicSessionProgram } from 'src/app/shared/models/cloudbytes/academic-session-program';
import { HolidayResponse } from 'src/app/shared/models/cloudbytes/holiday';
import { Room } from 'src/app/shared/models/cloudbytes/room';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { StorageService } from 'src/app/shared/services/storage.service';

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

    organizationalHolidays: HolidayResponse[] = [];
    academicSessionPrograms: AcademicSessionProgram[] = [];

    colorClasses = [
        'color-light-blue',
        'color-light-green',
        'color-light-yellow',
        'color-light-pink',
        'color-light-orange'
    ];

    degrees: any;
    degreeOptions: any;
    currentUserSubject: any;
    partnerCode: string = '';
    departmentCount: number = 0;
    programCount: number = 0;
    subjectCount: number = 0;
    showLegend: boolean = false;
    rooms: Room[] = [];
    buildings: any;
    storageForm: FormGroup = new FormGroup({});
    totalKeys: number = 0;
    remainingCapacity: number = 0;
    recentEvents: SystemEvent[] = [];

    // Explicit Loading States to prevent UI glitches & skeleton traps
    loadingPartner: boolean = true;
    loadingDepartments: boolean = true;
    loadingPrograms: boolean = true;
    loadingSubjects: boolean = true;
    loadingHolidays: boolean = true;
    loadingAcademicSession: boolean = true;
    loadingDegrees: boolean = true;
    loadingRooms: boolean = true;
    loadingTimeline: boolean = true;

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private programService: ProgramService,
        private academicSessionService: AcademicSessionService,
        private organizationalHolidayService: OrganizationalHolidayService,
        private degreeService: DegreeService,
        private departmentService: DepartmentService,
        private academicSessionProgramService: AcademicSessionProgramService,
        private subjectService: SubjectService,
        private roomService: RoomService,
        private router: Router,
        private storageService: StorageService,
        private cdr: ChangeDetectorRef,
    ) {
        effect(() => {
            this.layoutService.layoutConfig().darkTheme;
            this.initCharts();
            if (this.degrees) {
                this.updateDegreeOptions();
            }
        });

        this.storageForm = this.fb.group({
            value: [0],
        });
    }

    ngOnInit() {
        this.initCharts();
        this.callApis();
        this.overviewWeeks = [
            { name: 'Last Week', code: '0' },
            { name: 'This Week', code: '1' }
        ];
        this.selectedOverviewWeek = this.overviewWeeks[0];

        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            try {
                this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(currentUser));
                this.partnerCode = this.currentUserSubject.value?.applicationUser?.partnerCode || '';
            } catch (error) {
                console.error('Error parsing user storage data', error);
                this.partnerCode = '';
            }
        }
        this.loadingPartner = false;

        //#region Storage
        this.totalKeys = this.storageService.getStorageUsage();
        this.remainingCapacity = this.storageService.getRemainingCapacity();
        this.storageForm.get('value')?.setValue(this.totalKeys);
        //#endregion
    }

    private extractArray(data: any): any[] {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        if (Array.isArray(data.data)) return data.data;
        if (Array.isArray(data.result)) return data.result;
        if (Array.isArray(data.items)) return data.items;
        return [];
    }

    //#region calling APIs
    callApis() {
        this.getAcademicSessionProgram();
    }
    //#endregion

    getAcademicSessionProgram() {
        this.loadingTimeline = true;
        this.academicSessionProgramService.getAll().subscribe({
            next: (data) => {
                const list = this.extractArray(data);
                this.academicSessionPrograms = list;
                if (list.length > 0) {
                    this.generateTimelineData(list);
                    this.loadingTimeline = false;
                    this.cdr.markForCheck();
                } else {
                    this.fetchFallbackTimelineData();
                }
            },
            error: (err) => {
                console.error('Error loading academic session programs:', err);
                this.fetchFallbackTimelineData();
            }
        });

        this.getAcademicSession();
        this.getOrganizationalHolidays();
        this.getDegree();
        this.getDepartmentList();
        this.getProgramList();
        this.getSubjectList();
        this.getRoomList();
    }

    //#region Program Distribution by Academic Sessions Graph
    getAcademicSession() {
        this.loadingAcademicSession = true;
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.academicSessionService.getAll().subscribe({
            next: (data) => {
                const sessions = this.extractArray(data);
                if (sessions.length > 0) {
                    const academicSessions: number[] = [];
                    sessions.forEach((x: any) => {
                        if (x?.id !== undefined && x?.id !== null) {
                            academicSessions.push(x.id);
                        }
                    });

                    if (academicSessions.length === 0) {
                        this.loadingAcademicSession = false;
                        this.cdr.markForCheck();
                        return;
                    }

                    this.programService.getByAcademicSessionIds(academicSessions).subscribe({
                        next: (programData) => {
                            if (programData && programData.programResponses && programData.academicSessionExpandos) {
                                const academicSessionMap: { [key: number]: string[] } = {};

                                for (const session of programData.programResponses) {
                                    const sessionId: number | undefined = session.academicSessionId;
                                    const programCode: string | undefined = session.programCode;

                                    if (sessionId !== undefined && programCode !== undefined) {
                                        if (!academicSessionMap[sessionId]) {
                                            academicSessionMap[sessionId] = [];
                                        }
                                        academicSessionMap[sessionId].push(programCode);
                                    }
                                }

                                const sessionNameMap: { [key: number]: string } = {};
                                programData.academicSessionExpandos.forEach((expando: any) => {
                                    if (expando?.id !== undefined && expando?.id !== null && expando?.name) {
                                        sessionNameMap[expando.id] = expando.name;
                                    }
                                });

                                const sortedSessionIds = Object.keys(academicSessionMap)
                                    .map(sessionId => ({
                                        sessionId: +sessionId,
                                        programCount: academicSessionMap[+sessionId].length,
                                        sessionName: sessionNameMap[+sessionId] || `Session ${sessionId}`
                                    }))
                                    .sort((a, b) => b.programCount - a.programCount)
                                    .slice(0, 7);

                                const labels = sortedSessionIds.map(item => item.sessionName);
                                const chartValues = sortedSessionIds.map(item => item.programCount);

                                const backgroundColors = [
                                    '#4B9BFF', '#FF6B6B', '#FFD93D', '#6BCB77', '#FF8F5F', '#A77BCA', '#5CE1E6'
                                ].slice(0, labels.length);

                                this.overviewChartData = {
                                    labels: labels,
                                    datasets: [{
                                        label: 'Programs per Session',
                                        data: chartValues,
                                        backgroundColor: backgroundColors,
                                        borderColor: backgroundColors.map(color => color.replace('0.8', '1')),
                                        borderWidth: 1,
                                        borderRadius: 6,
                                        barThickness: 20,
                                        maxBarThickness: 25,
                                        hoverBackgroundColor: backgroundColors.map(color => color.replace('0.8', '0.9')),
                                    }]
                                };

                                this.buildOverviewChartOptions(textColor, textColorSecondary, surfaceBorder);
                            }
                            this.loadingAcademicSession = false;
                            this.cdr.markForCheck();
                        },
                        error: () => {
                            this.loadingAcademicSession = false;
                            this.cdr.markForCheck();
                        }
                    });
                } else {
                    this.loadingAcademicSession = false;
                    this.cdr.markForCheck();
                }
            },
            error: () => {
                this.loadingAcademicSession = false;
                this.cdr.markForCheck();
            }
        });
    }

    private buildOverviewChartOptions(textColor: string, textColorSecondary: string, surfaceBorder: string) {
        this.overviewChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1.2,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'center',
                    labels: {
                        color: textColor,
                        font: { size: 12, weight: '500' },
                        padding: 15,
                        boxWidth: 16,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: '#2D3748',
                    titleFont: { size: 12, weight: '600' },
                    bodyFont: { size: 10 },
                    padding: 10,
                    cornerRadius: 6,
                    callbacks: {
                        label: (context: any) => {
                            return `${context.dataset.label}: ${context.raw} programs`;
                        }
                    }
                },
                title: {
                    display: true,
                    color: textColor,
                    font: { size: 14, weight: '600' },
                    padding: { top: 8, bottom: 12 }
                }
            },
            animation: {
                duration: 800,
                easing: 'easeOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        color: textColorSecondary,
                        font: { size: 10 },
                        callback: (value: number) => `${value}`
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                        borderDash: [4, 4]
                    },
                    title: {
                        display: true,
                        text: 'Programs',
                        color: textColor,
                        font: { size: 12, weight: '500' }
                    }
                },
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: { size: 10 },
                        maxRotation: 45,
                        minRotation: 45,
                        autoSkip: true,
                        maxTicksLimit: 5
                    },
                    grid: { display: false },
                    title: {
                        display: true,
                        text: 'Sessions',
                        color: textColor,
                        font: { size: 12, weight: '500' }
                    }
                }
            },
            hover: {
                mode: 'index',
                intersect: false
            },
            layout: {
                padding: { left: 10, right: 10, top: 10, bottom: 10 }
            }
        };
    }

    generateRandomColors(count: number): string[] {
        const colors: string[] = [];
        for (let i = 0; i < count; i++) {
            const red = Math.floor(Math.random() * 128 + 127);
            const green = Math.floor(Math.random() * 128 + 127);
            const blue = Math.floor(Math.random() * 128 + 127);
            const lightColor = `rgb(${red}, ${green}, ${blue})`;
            colors.push(lightColor);
        }
        return colors;
    }
    //#endregion
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

    //#region Organizational Holidays
    getOrganizationalHolidays(): void {
        this.loadingHolidays = true;
        this.organizationalHolidayService.getAll().subscribe({
            next: (data: any) => {
                const holidays = this.extractArray(data);
                this.organizationalHolidays = this.filterUpcomingHolidays(holidays).filter(
                    (holiday: any) => holiday?.status === 'PUBLISHED'
                );
                this.loadingHolidays = false;
                this.cdr.markForCheck();
            },
            error: (err) => {
                console.error('Error fetching holidays:', err);
                this.organizationalHolidays = [];
                this.loadingHolidays = false;
                this.cdr.markForCheck();
            }
        });
    }

    filterUpcomingHolidays(holidays: any[]): any[] {
        if (!Array.isArray(holidays)) return [];
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentDay = today.getDate();

        return holidays.filter(holiday => {
            const holidayDate = new Date(holiday?.date);
            return (holidayDate.getMonth() > currentMonth) ||
                (holidayDate.getMonth() === currentMonth && holidayDate.getDate() >= currentDay);
        });
    }

    getColorClass(index: number): string {
        return this.colorClasses[index % this.colorClasses.length];
    }
    //#endregion

    //#region Degrees Chart
    getDegree() {
        this.loadingDegrees = true;
        this.degreeService.getAll().subscribe({
            next: (data: any) => {
                const degrees = this.extractArray(data);
                const degreeMap = new Map<string, string[]>();

                degrees.forEach((degree: any) => {
                    const { degreeTypeName, name } = degree || {};
                    if (degreeTypeName && name) {
                        if (!degreeMap.has(degreeTypeName)) {
                            degreeMap.set(degreeTypeName, []);
                        }
                        degreeMap.get(degreeTypeName)?.push(name);
                    }
                });

                const degreeTypes = Array.from(degreeMap.keys());
                const allDegrees = Array.from(new Set(degrees.map((degree: any) => degree?.name).filter(Boolean)));

                const datasets = allDegrees.map((degreeName, index) => {
                    return {
                        type: 'bar',
                        label: degreeName as string,
                        backgroundColor: this.getColor(index),
                        borderRadius: 4,
                        barThickness: 20,
                        maxBarThickness: 25,
                        data: degreeTypes.map(degreeType => {
                            const degreesInType = degreeMap.get(degreeType) || [];
                            return degreesInType.filter(d => d === degreeName).length;
                        })
                    };
                });

                this.degrees = {
                    labels: degreeTypes,
                    datasets: datasets
                };

                this.updateDegreeOptions();
                this.loadingDegrees = false;
                this.cdr.markForCheck();
            },
            error: (err) => {
                console.error('Error fetching degrees:', err);
                this.degrees = null;
                this.loadingDegrees = false;
                this.cdr.markForCheck();
            }
        });
    }

    updateDegreeOptions() {
        this.degreeOptions = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltip: {
                    mode: 'nearest',
                    intersect: true,
                    backgroundColor: '#2D3748',
                    padding: 10,
                    cornerRadius: 6,
                    titleFont: { size: 13, weight: '600' },
                    callbacks: {
                        label: (context: any) => {
                            const dataset = context.dataset;
                            const index = context.dataIndex;
                            const value = dataset.data[index] as number;
                            return value > 0 ? ` ${dataset.label}: ${value}` : '';
                        }
                    }
                },
                legend: {
                    position: 'right',
                    align: 'start',
                    display: this.showLegend,
                    labels: {
                        color: this.getTextColor(),
                        usePointStyle: true,
                        boxWidth: 8,
                        font: {
                            size: 11
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: this.getTextColorSecondary(),
                        stepSize: 1
                    },
                    grid: {
                        color: this.getSurfaceBorder(),
                        drawBorder: false,
                        borderDash: [4, 4]
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: this.getTextColorSecondary(),
                        font: {
                            weight: '500'
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        };
    }

    toggleLegend() {
        this.showLegend = !this.showLegend;
        this.updateDegreeOptions();
    }

    private getColor(index: number): string {
        const colors = [
            '#4B9BFF', '#FF6B6B', '#FFD93D', '#6BCB77',
            '#FF8F5F', '#A77BCA', '#5CE1E6', '#F472B6',
            '#34D399', '#FBBF24', '#60A5FA', '#A78BFA',
            '#F87171', '#38BDF8', '#818CF8'
        ];
        return colors[index % colors.length];
    }

    private getDataForDegreeType(degreeNames: string[]): number[] {
        return [degreeNames.length];
    }

    private getTextColor(): string {
        return getComputedStyle(document.documentElement).getPropertyValue('--text-color');
    }

    private getTextColorSecondary(): string {
        return getComputedStyle(document.documentElement).getPropertyValue('--text-color-secondary');
    }

    private getSurfaceBorder(): string {
        return getComputedStyle(document.documentElement).getPropertyValue('--surface-border');
    }
    //#endregion

    //#region Tiles count
    getDepartmentList() {
        this.loadingDepartments = true;
        this.departmentService.getAll().subscribe({
            next: (data: any) => {
                const list = this.extractArray(data);
                this.departmentCount = list.length;
                this.loadingDepartments = false;
                this.cdr.markForCheck();
            },
            error: (err) => {
                console.error('Error fetching departments:', err);
                this.departmentCount = 0;
                this.loadingDepartments = false;
                this.cdr.markForCheck();
            }
        });
    }

    getProgramList() {
        this.loadingPrograms = true;
        this.programService.getAll().subscribe({
            next: (data: any) => {
                const list = this.extractArray(data);
                this.programCount = list.length;
                this.loadingPrograms = false;
                this.cdr.markForCheck();
            },
            error: (err) => {
                console.error('Error fetching programs:', err);
                this.programCount = 0;
                this.loadingPrograms = false;
                this.cdr.markForCheck();
            }
        });
    }

    getSubjectList() {
        this.loadingSubjects = true;
        this.subjectService.getAll().subscribe({
            next: (data: any) => {
                const list = this.extractArray(data);
                this.subjectCount = list.length;
                this.loadingSubjects = false;
                this.cdr.markForCheck();
            },
            error: (err) => {
                console.error('Error fetching subjects:', err);
                this.subjectCount = 0;
                this.loadingSubjects = false;
                this.cdr.markForCheck();
            }
        });
    }
    //#endregion

    //#region Room count
    getRoomList() {
        this.loadingRooms = true;
        this.roomService.getAll().subscribe({
            next: (data: any) => {
                const rooms = this.extractArray(data);
                const buildingMap = new Map<number, any>();

                rooms.forEach((room: any) => {
                    const { buildingId, buildingName, floorNumber, name } = room || {};
                    if (buildingId) {
                        if (!buildingMap.has(buildingId)) {
                            buildingMap.set(buildingId, {
                                id: buildingId,
                                name: buildingName,
                                floors: new Map<number, { floorNumber: number, rooms: any[] }>()
                            });
                        }

                        const building = buildingMap.get(buildingId);
                        if (!building.floors.has(floorNumber)) {
                            building.floors.set(floorNumber, { floorNumber, rooms: [] });
                        }

                        building.floors.get(floorNumber).rooms.push(name);
                    }
                });

                this.buildings = Array.from(buildingMap.values()).map(building => ({
                    ...building,
                    floors: Array.from(building.floors.values())
                }));
                this.loadingRooms = false;
                this.cdr.markForCheck();
            },
            error: (err) => {
                console.error('Error fetching rooms:', err);
                this.buildings = [];
                this.loadingRooms = false;
                this.cdr.markForCheck();
            }
        });
    }

    getRoomTooltip(rooms: string[]): string {
        return rooms.join(', ');
    }
    //#endregion

    //#region Click events
    onPartnerCodeClick() {
        this.router.navigateByUrl('/home/cloudbytes/company/partner/partner-view/' + this.partnerCode);
    }

    onPartnerImageClick() {
        this.router.navigateByUrl('/home/cloudbytes/masters/company/partner-image-list');
    }

    onDepartmentClick() {
        this.router.navigateByUrl('/home/cloudbytes/masters/academics/department-list');
    }

    onProgramClick() {
        this.router.navigateByUrl('/home/cloudbytes/masters/academics/program-list');
    }

    onSubjectClick() {
        this.router.navigateByUrl('/home/cloudbytes/masters/subjects/subject-list');
    }

    onOVSConfigurationClick() {
        this.router.navigateByUrl('/home/cloudbytes/transactions/academics/operational-vertical-subject-configuration-list');
    }

    onRefreshCacheClick() {

    }
    //#endregion

    viewBuildingDetails(id: number) {

    }

    //#region Timeline
    private fetchFallbackTimelineData() {
        this.programService.getAll().subscribe({
            next: (data: any) => {
                const programs = this.extractArray(data);
                if (programs.length > 0) {
                    const sorted = [...programs].sort((a: any, b: any) => {
                        const dateB = new Date(b.modifiedDate || b.createdDate || 0).getTime();
                        const dateA = new Date(a.modifiedDate || a.createdDate || 0).getTime();
                        return dateB - dateA;
                    }).slice(0, 5);

                    this.recentEvents = sorted.map((p: any) => ({
                        title: `${p.degreeTypeName || p.name || 'Program'} Configured`,
                        description: `${p.name || p.code || 'Program'} added to Academic Catalog`,
                        date: new Date(p.modifiedDate || p.createdDate || new Date()),
                        icon: 'pi pi-check-circle',
                        color: '#10B981'
                    }));
                } else {
                    this.recentEvents = [];
                }
                this.loadingTimeline = false;
                this.cdr.markForCheck();
            },
            error: (err) => {
                console.error('Error fetching fallback timeline data:', err);
                this.recentEvents = [];
                this.loadingTimeline = false;
                this.cdr.markForCheck();
            }
        });
    }

    generateTimelineData(data: any[]) {
        const list = Array.isArray(data) ? data : [];
        if (list.length === 0) {
            this.recentEvents = [];
            return;
        }

        const getItemDate = (item: any): Date => {
            const rawDate = item?.modifiedDate || item?.createdDate || item?.modifiedOn || item?.createdOn;
            if (!rawDate) return new Date();
            const parsed = new Date(rawDate);
            return isNaN(parsed.getTime()) ? new Date() : parsed;
        };

        const sortedData = [...list].sort((a, b) =>
            getItemDate(b).getTime() - getItemDate(a).getTime()
        );

        this.recentEvents = sortedData.slice(0, 5).map(item => {
            let eventColor = '#3B82F6';
            let eventIcon = 'pi pi-file-edit';

            if (item?.status === 'PUBLISHED') {
                eventColor = '#10B981';
                eventIcon = 'pi pi-check-circle';
            }

            const verticalName = item?.operationalVerticalName || item?.operationalVertical || item?.degreeTypeName || 'Vertical';
            const programName = item?.programName || item?.programCode || 'Program';
            const sessionName = item?.academicSessionName || item?.sessionName || 'Academic Session';

            return {
                title: `${verticalName} Configured`,
                description: `${programName} added to ${sessionName}`,
                date: getItemDate(item),
                icon: eventIcon,
                color: eventColor
            };
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

export interface SystemEvent {
    title: string;
    description: string;
    date: Date;
    icon: string;
    color: string;
}