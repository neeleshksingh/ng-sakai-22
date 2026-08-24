import { CommonModule, formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-generic-view',
  standalone: true,
  imports: [CommonModule, SelectModule, FormsModule, ReactiveFormsModule,ImageModule, ButtonModule, TooltipModule, SkeletonModule],
  templateUrl: './generic-view.component.html',
  styleUrl: './generic-view.component.scss'
})
export class GenericViewComponent implements OnInit {
  @Input() data: any;
  @Input() fields: { icon: string, label: string, key: string, pipe?: string, cssClass?: string, cssStyle?: string, type?: string }[] = [];
  @Input() iconClass: string = 'view-icon';
  isLoading: boolean = true;
  viewOptions = [
    { label: 'Tiles', value: 'tiles', icon: 'pi-th-large', tooltip: 'Tiles' }, 
    { label: 'Compact', value: 'compact', icon: 'pi-bars', tooltip: 'Compact'  }, 
    { label: 'List', value: 'list', icon: 'pi-list', tooltip: 'List'  }
  ];

  viewFormGroup: FormGroup = new FormGroup({});

  constructor(@Inject(LOCALE_ID) public locale: string, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.viewFormGroup = this.fb.group({
      view: ['tiles']
    });
    const view = localStorage.getItem('view');
    if (view) {
      this.viewFormGroup.value.view = view ?? 'tiles';
      this.viewFormGroup.patchValue({ view: this.viewFormGroup.value.view });
    }
    this.checkLoadingState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.checkLoadingState();
    }
  }

  private checkLoadingState(): void {
    this.isLoading = !this.data || Object.keys(this.data).length === 0;
  }

  transformValue(value: any, pipe?: string): any {
    if (value == null) {
      return '';
    }

    if (typeof value === 'boolean') {
      return value ? '✅' : '❌';
    }

    if (!pipe) {
      return value;
    }

    if (pipe === 'date') {
      return formatDate(value, 'MMM dd, yyyy', this.locale);
    }

    switch (pipe) {
      case 'date':
        return formatDate(value, 'dd-MMM-yyyy', this.locale);
      default:
        return value;
    }
  }

  onViewChange(event: any) {
    if (event && event.value) {
      this.viewFormGroup.value.view = event.value;
      localStorage.setItem('view', this.viewFormGroup.value.view);
    }
  }
}