import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { Table, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HasPermissionPipe } from "../../../../shared/pipes/has-permission.pipe";

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [TableModule, ButtonModule, TooltipModule, CommonModule, InputTextModule, SkeletonModule, ImageModule, HasPermissionPipe],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss'
})
export class GenericTableComponent implements OnInit {
  @Input() value: any[] = [];
  displayedValue: any[] = [];
  @Input() cols: any[] = [];
  @Input() rows: number = 10;
  @Input() paginator!: boolean;
  @Input() rowsPerPageOptions: any[] = [10, 20, 30, 40, 50, 100, { showAll: 'All' }];
  @Input() selectionMode: any;
  @Input() selection: any;
  @Output() selectionChange = new EventEmitter<any>();
  @Input() globalFilterFields: string[] = [];
  @Input() dataKey: string = 'id';
  @Input() autoLayout!: boolean;
  @Input() resizableColumns!: boolean;
  @Input() styleClass: string = 'p-datatable-customers p-datatable-gridlines p-datatable-striped p-datatable-sm';
  @Input() currentPageReportTemplate: string = 'Showing {first} to {last} of {totalRecords} entries';
  @Input() rowStyle: (row: any) => any = () => ({});
  @Input() entries: string = '';
  @Input() showCurrentPageReport: any;
  @Input() actions: TableAction[] = [];;
  @Output() onAction = new EventEmitter<{ action: string, data: any }>();
  @ViewChild('dt') table!: Table;
  @ViewChild('searchInput', { static: false }) searchInput: any;
  @Input() isLoading: boolean = true;
  @Input() showReload: boolean = false;
  @Input() mergeConfig: { field: string; rowspanField: string; isFirstRowField: string }[] = [];
  @Input() isSorting: boolean = true;
  @Input() isFiltering: boolean = true;
  skeletonValue: number[] = Array(4).fill(1);
  private globalQuery = '';
  private searchSubject = new Subject<string>();

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.displayedValue = [...this.value];

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.globalQuery = query.trim();
      this.applyGlobalFilter();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !changes['value'].firstChange) {
      this.displayedValue = [...this.value];
      this.applyGlobalFilter();
      this.cdr.detectChanges();
    }
  }

  clear(table: Table) {
    table.clear();
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
    }
    this.globalQuery = '';
    this.displayedValue = [...this.value];
    this.cdr.detectChanges();
  }

  onGlobalQueryInput(val: string) {
    this.searchSubject.next(val ?? '');
  }

  private applyGlobalFilter() {
    let filtered: any[] = [...this.value];

    if (this.globalQuery) {
      const query = this.normalize(this.globalQuery);
      const tokens = query.split(/\s+/).filter(t => t.length > 0);

      if (tokens.length > 0) {
        const fields = this.globalFilterFields.length > 0
          ? this.globalFilterFields
          : this.cols.map(c => c.field).filter(Boolean);

        filtered = this.value.filter(row => {
          const haystack = this.normalize(
            fields.map(f => this.safeGet(row, f)).join(' ')
          );

          return tokens.every(token => haystack.includes(token));
        });
      }
    }

    this.displayedValue = [...filtered];
    this.cdr.markForCheck();

    if (this.table) {
      this.table.first.set(0);
      this.table.reset();
    }
  }

  private safeGet(obj: any, key: string): string {
    const v = obj?.[key];
    return v == null ? '' : String(v);
  }

  private normalize(s: string): string {
    return (s || '')
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')
      .trim();
  }

  triggerAction(action: string, data: any) {
    this.onAction.emit({ action, data });
  }

  triggerReload() {
    this.onAction.emit({ action: 'reload', data: null });
  }

  get isSelectionEnabled(): boolean {
    return !!this.selectionMode;
  }

  onSelectionChange(newSelection: any) {
    if (!this.isSelectionEnabled) return;

    this.selection = newSelection;
    this.selectionChange.emit(this.selection);
  }

  handleRowSelect(event: any) {
    if (!this.isSelectionEnabled) {
      return;
    }

    if (this.selectionMode === 'multiple') {
      this.selectionChange.emit(this.selection);
    }

    if (this.selectionMode === 'single') {
      this.selectionChange.emit(event.data);
    }
  }

  getButtonClass(action: any): string {
    if (action.name === 'view') {
      return 'p-button-primary';
    }
    if (action.name === 'delete') {
      return 'p-button-danger';
    }
    return '';
  }

  getColumnClass(col: any): string {
    return col.class || 'text-left';
  }

  getRowspan(col: any, rowData: any): number | null {
    const config = this.mergeConfig.find(c => c.field === col.field);
    if (config && rowData[config.isFirstRowField]) {
      return rowData[config.rowspanField] || null;
    }
    return null;
  }

  // New method to determine if cell should be rendered
  shouldRenderCell(col: any, rowData: any): boolean {
    const config = this.mergeConfig.find(c => c.field === col.field);
    if (config) {
      return rowData[config.isFirstRowField];
    }
    return true;
  }

  shouldRenderAction(action: any, rowData: any): boolean {
    const config = this.mergeConfig.find(c => c.field === action.field);
    if (config) {
      return rowData[config.isFirstRowField];
    }
    return true;
  }

  getRowActions(rowData: any): any[] {
    return rowData.actions && Array.isArray(rowData.actions) ? rowData.actions : this.actions;
  }

  openExternalLink(url: string) {
    if (!url) {
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  }

  formatNumberCell(value: any): string {
    if (value === null || value === undefined || value === '') {
        return '';
    }

    const num = Number(value);
    if (Number.isNaN(num)) {
        return String(value);
    }

    // Round to 2 decimal places to avoid float noise (e.g. 12.1000000001)
    const rounded = Math.round(num * 100) / 100;

    // Whole number -> no decimals; otherwise show only the needed decimals
    return rounded % 1 === 0
        ? rounded.toString()
        : rounded.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
  }
}

export interface TableAction {
  name: string;
  icon: string;
  tooltip?: string;
  permission?: string | string[];
  class?: string;
}