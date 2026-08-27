import { LayoutService } from '@/app/layout/service/layout.service';
import { SharedModule } from '@/shared.module';
import { ChangeDetectorRef, Component, effect, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AcademicSessionProgramService } from 'src/app/cloud-bytes/services/academic-session-program.service';
import { AcademicSessionService } from 'src/app/cloud-bytes/services/academic-session.service';
import { DegreeService } from 'src/app/cloud-bytes/services/degree.service';
import type { EChartsOption } from 'echarts';
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

    overviewChartOptions: EChartsOption = {};
    hasOverviewData: boolean = false;
    degreeChartOptions: EChartsOption = {};
    hasDegreeData: boolean = false;
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
            if (this.hasDegreeData) {
                this.rebuildDegreeChart();
            }
            if (this.hasOverviewData) {
                this.rebuildOverviewChart();
            }
        });

        this.storageForm = this.fb.group({
            value: [0],
        });
    }

    ngOnInit() {
        this.callApis();

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

    // Cached data for rebuilding on theme change
    private _overviewLabels: string[] = [];
    private _overviewValues: number[] = [];
    private _degreeTypes: string[] = [];
    private _degreeDatasets: { label: string; data: number[]; color: string }[] = [];

    //#region Program Distribution by Academic Sessions Graph
    getAcademicSession() {
        this.loadingAcademicSession = true;

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

                                this._overviewLabels = sortedSessionIds.map(item => item.sessionName);
                                this._overviewValues = sortedSessionIds.map(item => item.programCount);
                                this.hasOverviewData = true;
                                this.rebuildOverviewChart();
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

    private rebuildOverviewChart() {
        const isDark = this.colorScheme === 'dark';
        const textColor = isDark ? '#cbd5e1' : '#64748b';
        const borderColor = isDark ? '#334155' : '#e2e8f0';
        const barColors = ['#4B9BFF', '#FF6B6B', '#FFD93D', '#6BCB77', '#FF8F5F', '#A77BCA', '#5CE1E6'];

        this.overviewChartOptions = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis', axisPointer: { type: 'shadow' },
                backgroundColor: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.96)',
                textStyle: { color: isDark ? '#e5e7eb' : '#374151', fontSize: 12 },
                borderWidth: 0, padding: 12, borderRadius: 6,
                formatter: (params: any) => {
                    const p = params[0];
                    return `${p.name}<br/>${p.marker} Programs: <b>${p.value}</b>`;
                }
            },
            grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
            xAxis: {
                type: 'category',
                data: this._overviewLabels,
                axisLabel: { color: textColor, rotate: 45, fontSize: 10 },
                axisLine: { lineStyle: { color: borderColor } },
                axisTick: { show: false },
                name: 'Sessions', nameLocation: 'middle', nameGap: 45,
                nameTextStyle: { color: textColor, fontSize: 12, fontWeight: 500 }
            },
            yAxis: {
                type: 'value', minInterval: 1,
                axisLabel: { color: textColor },
                splitLine: { lineStyle: { color: borderColor, type: 'dashed' } },
                name: 'Programs', nameTextStyle: { color: textColor, fontSize: 12, fontWeight: 500 }
            },
            series: [{
                name: 'Programs per Session',
                type: 'bar',
                data: this._overviewValues.map((val, i) => ({
                    value: val,
                    itemStyle: { color: barColors[i % barColors.length], borderRadius: [6, 6, 0, 0] }
                })),
                barMaxWidth: 25
            }]
        };
    }



    //#endregion

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

                this._degreeTypes = Array.from(degreeMap.keys());
                const allDegrees = Array.from(new Set(degrees.map((degree: any) => degree?.name).filter(Boolean)));
                const colors = [
                    '#4B9BFF', '#FF6B6B', '#FFD93D', '#6BCB77',
                    '#FF8F5F', '#A77BCA', '#5CE1E6', '#F472B6',
                    '#34D399', '#FBBF24', '#60A5FA', '#A78BFA',
                    '#F87171', '#38BDF8', '#818CF8'
                ];

                this._degreeDatasets = allDegrees.map((degreeName, index) => ({
                    label: degreeName as string,
                    color: colors[index % colors.length],
                    data: this._degreeTypes.map(degreeType => {
                        const degreesInType = degreeMap.get(degreeType) || [];
                        return degreesInType.filter(d => d === degreeName).length;
                    })
                }));

                this.hasDegreeData = true;
                this.rebuildDegreeChart();
                this.loadingDegrees = false;
                this.cdr.markForCheck();
            },
            error: (err) => {
                console.error('Error fetching degrees:', err);
                this.hasDegreeData = false;
                this.loadingDegrees = false;
                this.cdr.markForCheck();
            }
        });
    }

    private rebuildDegreeChart() {
        const isDark = this.colorScheme === 'dark';
        const textColor = isDark ? '#cbd5e1' : '#64748b';
        const borderColor = isDark ? '#334155' : '#e2e8f0';

        this.degreeChartOptions = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis', axisPointer: { type: 'shadow' },
                backgroundColor: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.96)',
                textStyle: { color: isDark ? '#e5e7eb' : '#374151', fontSize: 12 },
                borderWidth: 0, padding: 12, borderRadius: 6
            },
            legend: this.showLegend ? {
                orient: 'vertical' as const,
                right: 0, top: 'center',
                textStyle: { color: textColor, fontSize: 11 },
                icon: 'circle', itemWidth: 8, itemGap: 8
            } : undefined,
            grid: { left: '3%', right: this.showLegend ? '25%' : '4%', bottom: '5%', top: '5%', containLabel: true },
            yAxis: {
                type: 'category',
                data: this._degreeTypes,
                axisLabel: { color: textColor, fontWeight: 500 },
                axisLine: { show: false }, axisTick: { show: false }
            },
            xAxis: {
                type: 'value', minInterval: 1,
                axisLabel: { color: textColor },
                splitLine: { lineStyle: { color: borderColor, type: 'dashed' } }
            },
            series: this._degreeDatasets.map(ds => ({
                name: ds.label,
                type: 'bar' as const,
                stack: 'total',
                data: ds.data,
                itemStyle: { color: ds.color, borderRadius: [0, 4, 4, 0] },
                barMaxWidth: 25,
                emphasis: { focus: 'series' as const }
            }))
        };
    }

    toggleLegend() {
        this.showLegend = !this.showLegend;
        this.rebuildDegreeChart();
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