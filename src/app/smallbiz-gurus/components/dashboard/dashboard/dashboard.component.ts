import { LayoutService } from '@/app/layout/service/layout.service';
import { EmployeeCalenderComponent } from '@/app/time-clock-plus/components/common-components/employee-calender/employee-calender.component';
import { SharedModule } from '@/shared.module';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, effect, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeJoiningDetailService } from 'src/app/global/services/smallbiz-gurus/employee-joining-details.service';
import { EmployeeDetailsService } from 'src/app/smallbiz-gurus/services/employee-details.service';
import { JobOpeningService } from 'src/app/smallbiz-gurus/services/job-opening.service';
import { EChartsOption } from 'echarts';
import { EmployeeBasicInformationComponent } from "../../profile-details/employee-basic-information/employee-basic-information.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [SharedModule, EmployeeCalenderComponent, EmployeeBasicInformationComponent]
})
export class DashboardComponent implements OnInit, OnDestroy {
    overviewChartData: any;
    overviewChartOptions: any = {};
    diversityChartData: any;
    diversityChartOptions: any = {};
    departmentGroupChartData: any;
    departmentGroupChartOptions: any = {};
    hiresChartData: any;
    hiresChartOptions: any = {};
    upcomingBirthdays: { name: string, date: string, age: number, isBirthdayToday: boolean }[] = [];
    totalHeadcount: number | null = null;
    openPositions: number = 0;
    subscription!: Subscription;
    profileImageUrl: string = 'https://images.pexels.com/photos/248307/pexels-photo-248307.jpeg?cs=srgb&dl=animal-dog-pet-248307.jpg&fm=jpg';
    isFileDialogOpen: boolean = false;
    date: Date[] | undefined;
    selectedDate?: Date;
    holidays: Date[] = [];
    leaveTaken: any[] = [
        new Date(2025, 1, 14),
        new Date(2025, 2, 10),
    ];
    loading: boolean = false;
    error: string | null = null;
    revenueChartData: any;
    revenueChartOptions: any;
    isMobile: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private http: HttpClient,
        private employeeJoiningDetailService: EmployeeJoiningDetailService,
        private employeeService: EmployeeDetailsService,
        private jobOpeningService: JobOpeningService,
        private cdr: ChangeDetectorRef
    ) {
        effect(() => {
            this.layoutService.layoutConfig().darkTheme;
            if (this.overviewChartData) {
                this.initCharts();
            }
        });
    }

    ngOnInit() {
        this.loading = true;
        this.isMobile = window.innerWidth < 768;
        this.fetchHeadcountData();
        this.fetchDiversityAndBirthdays();
        this.getJobOpeningList();

        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth < 768;
        if (wasMobile !== this.isMobile && this.overviewChartData) {
            this.initCharts();
        }
    }

    getJobOpeningList() {
        const today = new Date();

        this.jobOpeningService.getAll().subscribe({
            next: (data) => {
                const openJobs = data.filter((job: any) => {
                    const startDate = new Date(job.startDate);
                    const endDate = new Date(job.endDate);
                    return startDate <= today && endDate >= today;
                });

                this.openPositions = openJobs.length;
                this.cdr.markForCheck();
            }, error: error => {
                console.error('Error fetching job openings:', error);
                this.cdr.markForCheck();
            }
        })
    }

    fetchHeadcountData() {
        this.employeeJoiningDetailService.getActiveEmployeeJoiningDetail()
            .subscribe({
                next: (data) => {
                    // Department counts for bar/pie chart
                    const departmentCounts = data.reduce((acc, employee) => {
                        const dept = employee.departmentName;
                        acc[dept ?? ''] = (acc[dept ?? ''] || 0) + 1;
                        return acc;
                    }, {} as { [key: string]: number });

                    // Sort departments by count and take top 20
                    const sortedDepartments = Object.entries(departmentCounts)
                        .sort(([, countA], [, countB]) => countB - countA)
                        .slice(0, 20)
                        .reduce((acc, [dept, count]) => {
                            acc[dept] = count;
                            return acc;
                        }, {} as { [key: string]: number });

                    const shortLabels = Object.keys(sortedDepartments).map(dept =>
                        dept.length > 10 ? dept.substring(0, 10) + '...' : dept
                    );
                    const fullLabels = Object.keys(sortedDepartments);

                    // Department group counts for pie chart
                    const departmentGroupCounts = data.reduce((acc, employee) => {
                        const group = employee.departmentGroupName ?? 'Other';
                        acc[group] = (acc[group] || 0) + 1;
                        return acc;
                    }, {} as { [key: string]: number });

                    // Hires by year and month for bar chart
                    const hiresByYearMonth = data.reduce((acc, employee) => {
                        const joinDate = new Date(employee.dateOfJoining ?? '');
                        if (isNaN(joinDate.getTime())) return acc;
                        const year = joinDate.getFullYear();
                        const month = joinDate.toLocaleString('en-US', { month: 'short' });
                        acc[year] = acc[year] || {};
                        acc[year][month] = (acc[year][month] || 0) + 1;
                        return acc;
                    }, {} as { [year: string]: { [month: string]: number } });

                    const years = Object.keys(hiresByYearMonth).sort();
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const datasets = years.map((year, index) => ({
                        label: year,
                        data: months.map(month => hiresByYearMonth[year][month] || 0),
                        backgroundColor: ['#60A5FA', '#F87171', '#FBBF24', '#34D399', '#A78BFA'][index % 5]
                    }));

                    this.totalHeadcount = Object.values(departmentCounts).reduce((sum, count) => sum + count, 0);

                    this.overviewChartData = {
                        labels: this.isMobile ? fullLabels : shortLabels,
                        datasets: [{
                            label: 'Employees',
                            data: Object.values(sortedDepartments),
                            fullLabels: fullLabels
                        }]
                    };

                    this.departmentGroupChartData = {
                        labels: Object.keys(departmentGroupCounts),
                        datasets: [{
                            data: Object.values(departmentGroupCounts)
                        }]
                    };

                    this.hiresChartData = {
                        labels: months,
                        datasets: datasets
                    };

                    this.loading = false;
                    this.initCharts();
                    this.cdr.markForCheck();
                },
                error: (err) => {
                    this.error = 'Failed to load headcount data';
                    this.loading = false;
                    this.cdr.markForCheck();
                    console.error(err);
                }
            });
    }

    fetchDiversityAndBirthdays() {
        this.employeeService.getAllEmployee()
            .subscribe({
                next: (data) => {
                    const normalizeGender = (g: string | null | undefined): string => {
                        const val = (g ?? '').trim().toLowerCase();
                        if (val === 'm' || val === 'male') return 'Male';
                        if (val === 'f' || val === 'female') return 'Female';
                        return g ? g.trim() : 'Other';
                    };
                    const genderCounts = data.reduce((acc, employee) => {
                        const gender = normalizeGender(employee.gender);
                        acc[gender] = (acc[gender] || 0) + 1;
                        return acc;
                    }, {} as { [key: string]: number });

                    this.diversityChartData = {
                        labels: Object.keys(genderCounts),
                        datasets: [{
                            data: Object.values(genderCounts)
                        }]
                    };

                    const today = new Date();
                    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    const next30Days = new Date(todayOnly.getTime() + 30 * 24 * 60 * 60 * 1000);

                    this.upcomingBirthdays = data
                        .map(employee => {
                            const dob = new Date(employee.dateOfBirth ?? '');
                            let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

                            if (nextBirthday < todayOnly) {
                                nextBirthday.setFullYear(today.getFullYear() + 1);
                            }

                            const age = nextBirthday.getFullYear() - dob.getFullYear();
                            const isBirthdayToday = nextBirthday.getTime() === todayOnly.getTime();

                            return {
                                name: `${employee.title ? employee.title + ' ' : ''}${employee.firstName} ${employee.lastName}`,
                                date: nextBirthday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                                age,
                                birthdayDate: nextBirthday,
                                isBirthdayToday
                            };
                        })
                        .filter(b => b.birthdayDate >= todayOnly && b.birthdayDate <= next30Days)
                        .sort((a, b) => a.birthdayDate.getTime() - b.birthdayDate.getTime());

                    this.loading = false;
                    this.initCharts();
                    this.cdr.markForCheck();
                },
                error: (err) => {
                    this.error = 'Failed to load diversity or birthday data';
                    this.loading = false;
                    this.cdr.markForCheck();
                    console.error(err);
                }
            });
    }

    initCharts() {
        const isDark = this.layoutService.isDarkTheme();
        const textColor = isDark ? '#cbd5e1' : '#475569';
        const borderColor = isDark ? '#334155' : '#e2e8f0';

        // 1. Headcount by Department
        if (this.overviewChartData) {
            const labels = this.overviewChartData.datasets?.[0]?.fullLabels || this.overviewChartData.labels || [];
            const values = this.overviewChartData.datasets?.[0]?.data || [];

            if (this.isMobile) {
                const pieData = labels.map((label: string, idx: number) => ({
                    name: label,
                    value: values[idx] || 0
                }));
                this.overviewChartOptions = {
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}: <b>{c}</b> ({d}%)'
                    },
                    legend: {
                        orient: 'horizontal',
                        bottom: 0,
                        textStyle: { color: textColor, fontSize: 11 }
                    },
                    series: [{
                        name: 'Headcount',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: { show: false },
                        data: pieData
                    }]
                };
            } else {
                this.overviewChartOptions = {
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { type: 'shadow' },
                        formatter: (params: any[]) => {
                            const item = params[0];
                            return `<b>${item.name}</b><br/>Employees: <b>${item.value}</b>`;
                        }
                    },
                    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
                    xAxis: {
                        type: 'category',
                        data: labels,
                        axisLabel: {
                            interval: 0,
                            rotate: 35,
                            color: textColor,
                            fontSize: 11,
                            formatter: (val: string) => val.length > 15 ? val.substring(0, 15) + '...' : val
                        },
                        axisLine: { lineStyle: { color: borderColor } }
                    },
                    yAxis: {
                        type: 'value',
                        name: 'Employees',
                        minInterval: 1,
                        axisLabel: { color: textColor },
                        splitLine: { lineStyle: { color: borderColor, type: 'dashed' } }
                    },
                    series: [{
                        name: 'Employees',
                        type: 'bar',
                        barWidth: '40%',
                        data: values,
                        itemStyle: {
                            color: {
                                type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                                colorStops: [
                                    { offset: 0, color: '#60a5fa' },
                                    { offset: 1, color: '#2563eb' }
                                ]
                            },
                            borderRadius: [6, 6, 0, 0]
                        }
                    }]
                };
            }
        }

        // 2. Gender Distribution
        if (this.diversityChartData) {
            const labels = this.diversityChartData.labels || [];
            const values = this.diversityChartData.datasets?.[0]?.data || [];
            const colors = ['#60a5fa', '#f87171', '#fbbf24', '#9ca3af'];

            const pieData = labels.map((label: string, idx: number) => ({
                name: label,
                value: values[idx] || 0,
                itemStyle: { color: colors[idx % colors.length] }
            }));

            this.diversityChartOptions = {
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: <b>{c}</b> ({d}%)'
                },
                legend: {
                    orient: 'horizontal',
                    bottom: 0,
                    textStyle: { color: textColor, fontSize: 12 }
                },
                series: [{
                    name: 'Gender Distribution',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    center: ['50%', '42%'],
                    avoidLabelOverlap: false,
                    label: { show: false },
                    emphasis: {
                        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.3)' }
                    },
                    data: pieData
                }]
            };
        }

        // 3. Department Group Distribution
        if (this.departmentGroupChartData) {
            const labels = this.departmentGroupChartData.labels || [];
            const values = this.departmentGroupChartData.datasets?.[0]?.data || [];
            const colors = ['#34d399', '#fbbf24', '#60a5fa', '#f87171', '#a78bfa'];

            const pieData = labels.map((label: string, idx: number) => ({
                name: label,
                value: values[idx] || 0,
                itemStyle: { color: colors[idx % colors.length] }
            }));

            this.departmentGroupChartOptions = {
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: <b>{c}</b> ({d}%)'
                },
                legend: {
                    orient: 'horizontal',
                    bottom: 0,
                    textStyle: { color: textColor, fontSize: 12 }
                },
                series: [{
                    name: 'Department Group',
                    type: 'pie',
                    radius: ['45%', '75%'],
                    center: ['50%', '42%'],
                    avoidLabelOverlap: false,
                    label: { show: false },
                    emphasis: {
                        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.3)' }
                    },
                    data: pieData
                }]
            };
        }

        // 4. Hires by Year and Month
        if (this.hiresChartData) {
            const months = this.hiresChartData.labels || [];
            const rawDatasets = this.hiresChartData.datasets || [];

            const series = rawDatasets.map((ds: any) => ({
                name: ds.label,
                type: 'bar',
                barGap: '10%',
                data: ds.data,
                itemStyle: {
                    color: ds.backgroundColor,
                    borderRadius: [4, 4, 0, 0]
                }
            }));

            this.hiresChartOptions = {
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' }
                },
                legend: {
                    top: 'top',
                    textStyle: { color: textColor, fontSize: 12 }
                },
                grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
                xAxis: {
                    type: 'category',
                    data: months,
                    axisLabel: { color: textColor },
                    axisLine: { lineStyle: { color: borderColor } }
                },
                yAxis: {
                    type: 'value',
                    name: 'Hires',
                    minInterval: 1,
                    axisLabel: { color: textColor },
                    splitLine: { lineStyle: { color: borderColor, type: 'dashed' } }
                },
                series: series
            };
        }

        this.cdr.markForCheck();
    }

    getDateStyle(date: any): any {
        let formattedDate = new Date(date.year, date.month, date.day);
        if (this.leaveTaken.some(d => d.getTime() === formattedDate.getTime())) {
            return {
                'background-color': '#ff8000',
                'border-radius': '50%',
                'color': 'white',
                'font-weight': 'bold',
                'padding': '5px'
            };
        }
        return {};
    }

    get colorScheme(): string {
        return this.layoutService.isDarkTheme() ? 'dark' : 'light';
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        window.removeEventListener('resize', this.handleResize.bind(this));
    }
}