import { Component, OnDestroy, Output, ViewChild, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, catchError, finalize, of, takeUntil } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SharedModule } from '@/shared.module';
import { VoucherResponse } from 'src/app/shared/models/finance-Pro/voucher';
import { VoucherService } from 'src/app/finance-Pro/services/voucher.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PagedData } from 'src/app/shared/models/commons/paged-data';
import { DateRange } from 'src/app/shared/models/commons/date-range';
import { DateFormatterService } from 'src/app/shared/services/date-formatter.service';

@Component({
  selector: 'app-voucher-list-report',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './voucher-list-report.component.html',
  styleUrl: './voucher-list-report.component.scss'
})
export class VoucherListReportComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: false }) searchInput: any;
  @ViewChild('dt') dt!: Table;

  @Input() showActionButtons: boolean = true;
  @Input() showVoucherDetailsButton: boolean = true;
  @Input() showVoucherEditButton: boolean = true;
  @Input() showVoucherDeleteButton: boolean = true;
  @Output() vouchersChange = new EventEmitter<VoucherResponse[]>();

  vouchers: VoucherResponse[] = [];

  cols = [
    { field: 'voucherTypeName', header: 'Voucher Type' },
    { field: 'voucherNumber', header: 'Voucher Number' },
    { field: 'voucherDate', header: 'Voucher Date' },
    { field: 'totalAmount', header: 'Total Amount' },
    { field: 'narration', header: 'Narration' },
    { field: 'status', header: 'Status' },
    { field: 'createdBy', header: 'Created By' },
    { field: 'createdDate', header: 'Created Date' },
    { field: 'modifiedBy', header: 'Modified By' },
    { field: 'modifiedDate', header: 'Modified Date' },
  ];

  globalFilterFields = this.cols.map(col => col.field);

  dataKey = 'id';
  isLoading: boolean = false;
  skeletonValue: number[] = Array(4).fill(1);

  loading: boolean = false;
  rowsToDisplay: number = 50;

  totalCount: number = 0;
  totalItemsCount: number = 0;
  totalMatchingRecordCount: number = 0;
  lazyEvent: any;
  isSearchInitiated: boolean = false;

  dateRangeFormGroup: FormGroup = new FormGroup({});

  // Dialog state variables
  displayDialog: boolean = false;
  selectedVoucher: VoucherResponse | null = null;

  private readonly destroy$ = new Subject<void>();

  //#region Constructor and Lifecycle
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private voucherService: VoucherService,
    private dateFormatterService: DateFormatterService,
  ) { }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.setDefaultDates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  //#endregion

  //#region Form Initialization and Getters
  initializeFormGroup() {
    this.dateRangeFormGroup = this.fb.group({
      fromDateTime: [''],
      toDateTime: [''],
    });
  }

  private setDefaultDates(): void {
    const today = new Date();
    const currentYear = today.getFullYear();
    const financialYearStartYear = today.getMonth() < 3 ? currentYear - 1 : currentYear;
    const fromDate = new Date(financialYearStartYear, 3, 1);

    this.dateRangeFormGroup.patchValue({ fromDateTime: fromDate, toDateTime: today });
  }

  clear(table: Table) {
    table.clear();
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
    }
  }

  loadVouchers(event: any) {
    this.lazyEvent = event;

    if (!this.isSearchInitiated) {
      return;
    }

    this.loading = true;

    const pageIndex = event.first === 0 ? 1 : ((event.first ?? 0) / (event.rows ?? 50)) + 1;
    const pageSize = event.rows ?? 50;
    const sortBy = event.sortField ?? 'voucherDate';
    const sortDirection = event.sortOrder === 1 ? 'DESC' : 'ASC';

    this.rowsToDisplay = pageSize;

    const dateRangeValue = this.dateRangeFormGroup.value;
    const fromDateTime = this.dateFormatterService.ConvertDateToISTStartOfDayString(dateRangeValue.fromDateTime);
    const toDateTime = this.dateFormatterService.ConvertDateToISTStartOfDayString(dateRangeValue.toDateTime);

    const requestParams: DateRange = {
      fromDateTime: fromDateTime ? new Date(fromDateTime) : new Date(),
      toDateTime: toDateTime ? new Date(toDateTime) : new Date(),
      pageIndex,
      pageSize,
      sortBy,
      sortDirection
    };

    this.voucherService.getByDateRangeRequest(requestParams)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.error?.message ?? 'Failed to load vouchers',
            life: 3000
          });
          this.vouchers = [];
          return of(null);
        }),
        finalize(() => this.loading = false)
      )
      .subscribe(res => {
        const pagedRes = res as PagedData<VoucherResponse> | null;
        if (pagedRes) {
          this.vouchers = pagedRes.items ?? [];
          this.vouchersChange.emit(this.vouchers);
          this.totalItemsCount = pagedRes.itemsCount ?? 0;
          this.totalCount = pagedRes.totalCount ?? 0;
          this.totalMatchingRecordCount = pagedRes.totalCount ?? 0;
        }
      });
  }

  searchByDateRange() {
    this.isSearchInitiated = true;
    if (this.dt) {
      this.dt.first = 0;
      const event = {
        first: 0,
        rows: this.rowsToDisplay,
        sortField: this.lazyEvent?.sortField,
        sortOrder: this.lazyEvent?.sortOrder,
        filters: this.lazyEvent?.filters,
        globalFilter: this.lazyEvent?.globalFilter
      };
      this.loadVouchers(event);
    }
  }

  //#endregion

  //#region Actions: View Details, Edit, Delete

  showVoucherDetails(voucher: VoucherResponse) {
    this.selectedVoucher = voucher;
    this.displayDialog = true;
  }

  editVoucher(voucherResponse: VoucherResponse) {
    this.router.navigateByUrl(`/home/finpro/transactions/voucher/voucher-entry-manage/${voucherResponse.id}`);
  }

  deleteVoucher(voucher: VoucherResponse) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.voucherService.deleteById(voucher.id ?? 0).subscribe({
          next: data => {
            this.loadVouchers(this.lazyEvent);
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Voucher has been deleted' });
          }, error: error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
  //#endregion
}