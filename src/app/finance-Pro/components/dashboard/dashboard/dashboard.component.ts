import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, effect, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import saveAs from 'file-saver';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { debounceTime, Subscription } from 'rxjs';
import type { EChartsOption } from 'echarts';
import { ExcelFileProcessService } from 'src/app/global/services/file-process/excel-file-process.service';
import { monthList } from 'src/app/shared/models/commons/selectItems';
import { CollectionReport, CollectionReportGraphData } from 'src/app/shared/models/finance-Pro/collection-report';
import { DailyCollectionReport } from 'src/app/shared/models/finance-Pro/daily-collection-report';
import { DailyCollectionReportRequest } from 'src/app/shared/models/finance-Pro/daily-collection-report-request';
import { FeeReceiptDownloadRequest } from 'src/app/shared/models/finance-Pro/fee-receipt-download-request';
import { TransactionType } from 'src/app/shared/models/finance-Pro/transaction-type';
import { DateFormatterService } from 'src/app/shared/services/date-formatter.service';
import { FeeReceiptService } from '../../../services/fee-receipt.service';
import { ReportsService } from '../../../services/report.service';
import { SharedModule } from '@/shared.module';
import { LayoutService } from '@/app/layout/service/layout.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [SharedModule]
})
export class DashboardComponent implements OnInit, OnDestroy {
    @ViewChild('searchInput', { static: false }) searchInput: any;
    overviewChartOptions: EChartsOption = {};
    doughnutOptions: EChartsOption = {};
    hasOverviewData: boolean = false;
    hasDoughnutData: boolean = false;
    subscription!: Subscription;
    loading: boolean = false;
    currentYear?: number;
    currentFyYear?: string;
    barData: any;
    todaysDate: any
    collectionReport: CollectionReport[] = [];
    currentMonthCollection: number = 0;
    currentMonth?: any;
    currentYearCollection: number = 0;
    todaysCollection: number = 0;
    collectionReportGraphData: CollectionReportGraphData = {};
    monthWiseCollection: any = {};
    dailyCollectionReportRequest: DailyCollectionReportRequest = {};
    dailyCollectionReports: DailyCollectionReport[] = [];
    monthlyCollectionReports: DailyCollectionReport[] = [];
    collectionReportTableData: any[] = [];
    data: any;
    isLoading: boolean = true;
    loadingCollectionTable: boolean = true;
    dataKey = 'id';
    studentFeeComponents: any[] = [];
    transactionType: TransactionType[] = [];
    paymentModeList: SelectItem[] = [];
    labelArr: String[] = [];
    dataArr: number[] = [];
    grossAmount: number = 0;
    actions = [
        {
            name: 'view',
            icon: 'pi pi-eye',
            tooltip: 'View'
        },
        {
            name: 'delete',
            icon: 'pi pi-trash',
            tooltip: 'Delete'
        }
    ];
    cols = [
        { field: 'academicSessionName', header: 'AcademicSession', filterType: 'text' },
        { field: 'studentName', header: 'StudentName', filterType: 'text' },
        { field: 'studentId', header: 'StudentId', filterType: 'text' },
        { field: 'paidAmount', header: 'PaidAmount', filterType: 'text' },
        { field: 'paymentModeName', header: 'PaymentMode', filterType: 'text' },
    ];

    globalFilterValue: string = '';
    selectedStatus: string = '';
    monthList: SelectItem[] = monthList;
    yearList = [
        { label: 'January', value: 1 },
        { label: '2025', value: 2025 },
        { label: '2024', value: 2024 },
        { label: '2023', value: 2023 },
        { label: '2022', value: 2022 },
        { label: '2021', value: 2021 },
        { label: '2020', value: 2020 },
        { label: '2019', value: 2019 },
        { label: '2018', value: 2018 },
    ]
    feeReceiptDownloadRequest!: FeeReceiptDownloadRequest;

    constructor(
        public layoutService: LayoutService,
        private messageService: MessageService,
        private reportsService: ReportsService,
        private datePipe: DatePipe,
        private dateFormatterService: DateFormatterService,
        private feeReceiptService: FeeReceiptService,
        private excelFileProcessService: ExcelFileProcessService,
        private router: Router,
        private cdr: ChangeDetectorRef,
    ) {
        effect(() => {
            this.layoutService.layoutConfig().darkTheme;
            this.initCharts();
        });
    }

    ngOnInit() {
        this.paymentModeList = [
            { label: 'BankDeposit', value: 1 },
            { label: 'CardSwipe', value: 2 },
            { label: 'Cash', value: 3 },
            { label: 'Cheque', value: 4 },
            { label: 'DemandDraft', value: 5 },
            { label: 'IMPS', value: 6 },
            { label: 'NEFT/RTGS', value: 7 },
            { label: 'UPI', value: 8 },
            { label: 'Online', value: 9 },
            { label: 'Others', value: 10 },
        ];
        this.getDashboadTilesDataCollectionReport();
        this.getDailyCollectionReportForLast30Days();
    }

    clear(table: Table) {
        table.clear();
        if (this.searchInput) {
            this.searchInput.nativeElement.value = '';
        }
    }

    getDailyCollectionReportForLast30Days() {
        const today = new Date();
        const thirtyDaysAgo = new Date();
        today.setHours(0, 0, 0, 0);
        thirtyDaysAgo.setDate(today.getDate() - 29); // 30 days includes today
        thirtyDaysAgo.setHours(0, 0, 0, 0);

        this.dailyCollectionReportRequest = {
            fromReceiptDate: this.dateFormatterService.ConvertLocalDateTimeString(thirtyDaysAgo),
            toReceiptDate: this.dateFormatterService.ConvertLocalDateTimeString(today),
            academicSessionIds: [],
            feeComponentIds: [],
            isCancelledReceipt: false,
            operationalVerticalIds: [],
            programIds: [],
            registrationNumbers: []
        };
        const paymentModeMap = new Map<number, string>();
        this.paymentModeList.forEach((mode: any) => {
            paymentModeMap.set(mode.value, mode.label);
        });

        this.reportsService.getDailyCollectionReportByDailyCollectionReportRequest(this.dailyCollectionReportRequest)
            .subscribe({
                next: (response) => {
                    this.monthlyCollectionReports = response.map((item: any) => ({
                        ...item,
                        paymentModeName: paymentModeMap.get(item.paymentMode) || 'Unknown'
                    })).sort((a: any, b: any) => {
                        const dateA = new Date(a.paymentDate);
                        const dateB = new Date(b.paymentDate);
                        return dateB.getTime() - dateA.getTime(); // Latest first
                    });

                    this.collectionReportTableData = this.monthlyCollectionReports;

                    const todayString = this.dateFormatterService.ConvertLocalDateTimeString(today);
                    this.dailyCollectionReports = response.filter((item: any) => {
                        return item.receiptDate?.startsWith(todayString);
                    });
                    if (response.length > 0) {
                        this.insertTransactionType();
                    } else {
                        this.isLoading = false;
                    }
                    this.loadingCollectionTable = false;
                    this.cdr.markForCheck();
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.message || 'Error loading collection data', life: 3000 });
                    this.loadingCollectionTable = false;
                    this.cdr.markForCheck();
                }
            });
    }

    insertTransactionType() {
        this.transactionType = [];

        const resultMap: { [key: string]: { type: number; typeName: string; amount: number } } = {};

        this.monthlyCollectionReports.forEach((item: any) => {
            if (item.paymentMode != null) {
                const key = item.paymentMode;
                if (!resultMap[key]) {
                    resultMap[key] = {
                        type: item.paymentMode,
                        typeName: item.paymentModeName,
                        amount: 0
                    };
                }
                resultMap[key].amount += item.paidAmount ?? 0;
            }
        });

        const result = Object.values(resultMap);

        result.push({
            type: -1,
            typeName: 'Gross',
            amount: this.grossAmount = result.reduce((sum, obj) => sum + (obj.amount ?? 0), 0)
        });

        this.isLoading = false;
        this.transactionType = result;
        this.transactionType.forEach((element: any) => {
            if (element.type != -1) {
                this.labelArr.push(element.typeName);
                this.dataArr.push(element.amount);
            }
        });

        // Mark data as available so the doughnut chart renders
        this.data = true;
        this.hasDoughnutData = true;
        this.buildDoughnutChart();
        this.cdr.markForCheck();
    }

    private buildDoughnutChart() {
        const isDark = this.colorScheme === 'dark';
        const textColor = isDark ? '#cbd5e1' : '#64748b';
        const pieColors = [
            '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
            '#ec4899', '#f43f5e', '#ef4444', '#f97316',
            '#f59e0b', '#eab308', '#84cc16', '#22c55e',
            '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6'
        ];

        const pieData = this.labelArr.map((label, i) => ({
            value: this.dataArr[i],
            name: label as string,
            itemStyle: {
                color: pieColors[i % pieColors.length],
                borderColor: '#ffffff',
                borderWidth: 2
            }
        }));

        this.doughnutOptions = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                backgroundColor: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.96)',
                textStyle: { color: isDark ? '#e5e7eb' : '#374151', fontSize: 12 },
                borderWidth: 0, padding: 12, borderRadius: 10,
                formatter: (params: any) => {
                    const val = params.value;
                    const crore = 10000000;
                    const lakh = 100000;
                    let formatted;
                    if (val >= crore) formatted = `₹${(val / crore).toFixed(2)}Cr`;
                    else if (val >= lakh) formatted = `₹${(val / lakh).toFixed(2)}L`;
                    else formatted = `₹${val.toLocaleString()}`;
                    return `${params.marker} ${params.name}<br/>Amount: <b>${formatted}</b> (${params.percent}%)`;
                }
            },
            legend: {
                orient: 'vertical' as const,
                right: 0, top: 'center',
                textStyle: { color: textColor, fontSize: 11 },
                icon: 'circle', itemWidth: 10, itemGap: 10,
                formatter: (name: string) => {
                    const idx = this.labelArr.indexOf(name);
                    if (idx >= 0) {
                        const total = this.dataArr.reduce((a, b) => a + b, 0);
                        const pct = total > 0 ? ((this.dataArr[idx] / total) * 100).toFixed(1) : '0';
                        return `${name} (${pct}%)`;
                    }
                    return name;
                }
            },
            series: [{
                type: 'pie',
                radius: ['52%', '85%'],
                center: ['35%', '50%'],
                avoidLabelOverlap: false,
                label: { show: false },
                labelLine: { show: false },
                emphasis: {
                    itemStyle: { shadowBlur: 12, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.3)' }
                },
                data: pieData
            }]
        };
    }

    getDashboadTilesDataCollectionReport() {
        this.loading = true;
        this.reportsService.getCollectionReport().subscribe({
            next: (data) => {
                this.collectionReport = data;
                this.dataManipulationDashboadTilesDataCollectionReport();
                this.dataManipulationDailyCollectionColumnChart();
                this.cdr.markForCheck();
            }, error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'Error loading report', life: 3000 });
                this.loading = false;
                this.cdr.markForCheck();
            }
        });
    }

    dataManipulationDashboadTilesDataCollectionReport() {
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var d = new Date();
        var currentMonthNumber = d.getMonth();
        this.currentMonth = monthNames[d.getMonth()];
        this.todaysDate = this.datePipe.transform(d.toDateString(), 'dd-MMM-yyyy');
        this.currentYear = d.getFullYear();
        if (currentMonthNumber >= 4 && currentMonthNumber <= 12) {
            this.currentFyYear = this.currentYear.toString() + ' - ' + (this.currentYear + 1).toString();
        } else {
            this.currentFyYear = (this.currentYear - 1).toString() + '-' + this.currentYear.toString();
        }

        if (this.collectionReport) {
            var lastIndex = this.collectionReport.length - 1;
            var todaysCollectionFilter = this.collectionReport[lastIndex]?.dailyCollection;
            if (todaysCollectionFilter) {
                this.todaysCollection = Math.floor(todaysCollectionFilter);
            }

            var currentMonthCollectionFilter = this.collectionReport.filter(x => x.paymentMonthName?.toUpperCase() ==
                this.currentMonth.toUpperCase())[0]?.monthCollection;
            if (currentMonthCollectionFilter) {
                this.currentMonthCollection = Math.floor(currentMonthCollectionFilter);
            }
            this.currentYearCollection = Math.floor(this.collectionReport.reduce((accumulator, obj: any) => {
                return accumulator + obj?.monthCollection;
            }, 0));
        }
    }

    dataManipulationDailyCollectionColumnChart() {
        const groupByPaymentMonth = this.collectionReport.reduce((group: any, product: any) => {
            const month = product.paymentMonthName;
            group[month] = group[month] ?? 0;
            group[month] += product.monthCollection;
            return group;
        }, {});

        this.monthWiseCollection = groupByPaymentMonth;
        this.initCharts();
    }

    collectioninShortHand(number: number): string {
        const crore = 10000000;
        const lakh = 100000;
        const thousand = 1000;
        if (number >= crore) {
            const updatedNum = (number / crore).toFixed(1);
            return updatedNum + ' crore';
        } else if (number >= lakh) {
            const updatedNum = (number / lakh).toFixed(1);
            return updatedNum + ' lakh';
        }
        else if (number >= thousand) {
            const updatedNum = (number / thousand).toFixed(1)
            return updatedNum + ' thousand'
        } else {
            return number.toString();
        }
    }
    private getDynamicYAxisMax(data: number[]): number {
        const maxValue = Math.max(...data);
        if (maxValue === 0) return 100; // default fallback
        const power = Math.pow(10, Math.floor(Math.log10(maxValue)));
        return Math.ceil(maxValue / power) * power;
    }
    private getMonthCollectionData(): number[] {
        const months = [
            'April', 'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December', 'January', 'February', 'March'
        ];
        return months.map(month => this.monthWiseCollection[month] || 0);
    }

    initCharts() {
        const monthNames = [
            'April', 'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December', 'January', 'February', 'March'
        ];
        const organicData = this.getMonthCollectionData();

        const isDark = this.colorScheme === 'dark';
        const textColor = isDark ? '#cbd5e1' : '#64748b';
        const borderColor = isDark ? '#334155' : '#e2e8f0';

        const barColors = [
            '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
            '#8b5cf6', '#06b6d4', '#22c55e', '#fb923c',
            '#a855f7', '#ec4899', '#84cc16', '#0ea5e9'
        ];

        this.overviewChartOptions = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                backgroundColor: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.96)',
                textStyle: { color: isDark ? '#e5e7eb' : '#374151', fontSize: 12 },
                borderWidth: 0, padding: 12, borderRadius: 8,
                formatter: (params: any) => {
                    const p = params[0];
                    const val = p.value;
                    const crore = 10000000;
                    const lakh = 100000;
                    let formatted;
                    if (val >= crore) formatted = `₹${(val / crore).toFixed(2)} Cr`;
                    else if (val >= lakh) formatted = `₹${(val / lakh).toFixed(2)} L`;
                    else formatted = `₹${val.toLocaleString()}`;
                    return `<b>${p.name} Collection</b><br/>${p.marker} ${formatted}`;
                }
            },
            grid: { left: '3%', right: '4%', bottom: '10%', top: '8%', containLabel: true },
            xAxis: {
                type: 'category',
                data: monthNames,
                axisLabel: { color: textColor, fontSize: 11, fontWeight: 500 },
                axisLine: { lineStyle: { color: borderColor } },
                axisTick: { show: false }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: textColor, fontSize: 11,
                    formatter: (value: number) => {
                        const crore = 10000000;
                        const lakh = 100000;
                        if (value >= crore) return `₹${(value / crore).toFixed(1)}Cr`;
                        else if (value >= lakh) return `₹${(value / lakh).toFixed(1)}L`;
                        return `₹${value.toLocaleString()}`;
                    }
                },
                splitLine: { lineStyle: { color: borderColor, type: 'dashed' } }
            },
            series: [{
                name: 'Collection Amount',
                type: 'bar',
                data: organicData.map((val, i) => ({
                    value: val,
                    itemStyle: {
                        color: barColors[i % barColors.length],
                        borderRadius: [8, 8, 0, 0]
                    }
                })),
                barMaxWidth: 32,
                emphasis: {
                    itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.15)' }
                }
            }]
        };

        this.hasOverviewData = true;
        this.loading = false;

        // Also rebuild doughnut if data is available
        if (this.hasDoughnutData) {
            this.buildDoughnutChart();
        }
        this.cdr.markForCheck();
    }

    get colorScheme(): string {
        return this.layoutService.isDarkTheme() ? 'dark' : 'light';
    }

    onChangeMonthYear(event: any) {

        if (!event || event === null || event === undefined) {
            this.collectionReportTableData = [...this.monthlyCollectionReports];
            this.collectionReportTableData.sort((a: any, b: any) => {
                const dateA = new Date(a.paymentDate);
                const dateB = new Date(b.paymentDate);
                return dateB.getTime() - dateA.getTime();
            });
            return;
        }

        const selectedMonth = event.getMonth(); // 0-11 (0 = January)
        const selectedYear = event.getFullYear();
        // Filter transactions by selected month/year
        this.filterTransactionsByMonth(selectedMonth, selectedYear);
    }

    // 🔍 Filter Method
    filterTransactionsByMonth(month: any, year: any) {
        this.collectionReportTableData = this.monthlyCollectionReports.filter(transaction => {
            // Parse the paymentDate
            const paymentDate = new Date(transaction.paymentDate || '');

            // Check if month and year match
            return paymentDate.getMonth() === month &&
                paymentDate.getFullYear() === year;
        });

        // Sort filtered results by date (latest first)
        this.monthlyCollectionReports.sort((a: any, b: any) => {
            const dateA = new Date(a.paymentDate);
            const dateB = new Date(b.paymentDate);
            return dateB.getTime() - dateA.getTime();
        });

    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    getStudentInitials(name: string): string {
        if (!name) return 'NA';
        const names = name.split(' ');
        if (names.length >= 2) {
            return names[0].charAt(0) + names[1].charAt(0);
        }
        return name.substring(0, 2);
    }

    getAvatarColor(index: number): string {
        const colors = [
            '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
            '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'
        ];
        return colors[index % colors.length];
    }

    truncateText(text: string, length: number): string {
        if (!text) return '';
        return text.length > length ? text.substring(0, length) + '...' : text;
    }

    formatCurrency(amount: number): string {
        if (!amount) return '0';
        const crore = 10000000;
        const lakh = 100000;

        if (amount >= crore) {
            return (amount / crore).toFixed(2) + 'Cr';
        } else if (amount >= lakh) {
            return (amount / lakh).toFixed(2) + 'L';
        } else if (amount >= 1000) {
            return (amount / 1000).toFixed(1) + 'K';
        } else {
            return amount.toLocaleString();
        }
    }

    formatDate(dateString: string): string {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

    getPaymentModeIcon(mode: number): string {
        const iconMap: { [key: number]: string } = {
            1: 'pi pi-money-bill',      // Cash pi pi-building-bank
            2: 'pi pi-credit-card',     // Card
            3: 'pi pi-money-bill',          // UPI/Mobile pi-money-bill
            4: 'pi pi-money-bill',   // Bank Transfer
            5: 'pi pi-money-bill',
            7: 'pi pi-money-bill',        // NEFT / RTGS
            8: 'pi pi-mobile',
            9: 'pi pi-mobile',
        };
        return iconMap[mode] || 'pi pi-indian-rupee';
    }

    getPaymentModeName(mode: string) {
        return mode || 'Other';
    }

    getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' {
        switch (status?.toUpperCase()) {
            case 'PUBLISHED':
            case 'SUCCESS':
            case 'COMPLETED':
                return 'success';
            case 'PENDING':
            case 'PROCESSING':
                return 'warn';
            case 'FAILED':
            case 'REJECTED':
                return 'danger';
            default:
                return 'info';
        }
    }

    downloadReceipt(data: any, feeReceipt: any) {
        this.feeReceiptDownloadRequest =
        {
            receiptNumber: feeReceipt
        }
        this.feeReceiptService.downloadFeeReceipt(this.feeReceiptDownloadRequest).subscribe({
            next: (data) => {
                var filename = this.feeReceiptDownloadRequest.receiptNumber?.replace('/', '_') + ".pdf";
                saveAs(data, filename);
            }, error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
            }
        });
    }

    exportExcel() {
        this.excelFileProcessService.exportAsExcelFile<DailyCollectionReport>(this.monthlyCollectionReports, "Monthly Collection Report");
    }
}
