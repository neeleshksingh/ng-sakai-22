import { LayoutService } from '@/app/layout/service/layout.service';
import { SharedModule } from '@/shared.module';
import { Component, effect, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PartnerAppSettingService } from 'src/app/developers/services/partner-app-setting.service';
import { PartnerAppSetting } from 'src/app/shared/models/developers/partner-app-setting';
import { StorageService } from 'src/app/shared/services/storage.service';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  appSettings: PartnerAppSetting[] = [];
  echartsOptions: EChartsOption = {};

  recentUpdates: PartnerAppSetting[] = [];
  storageForm: FormGroup;
  totalKeys: number = 0;
  remainingCapacity: number = 0;
  subscription!: Subscription;
  isLoading: boolean = true;

  constructor(
    public layoutService: LayoutService,
    private fb: FormBuilder,
    private partnerAppSettingService: PartnerAppSettingService,
    private storageService: StorageService,
    private cdr: ChangeDetectorRef
  ) {
    this.storageForm = this.fb.group({
      value: [0],
    });
    effect(() => {
      this.layoutService.layoutConfig().darkTheme;
      this.initSettingsChart();
    });
  }

  ngOnInit() {
    this.loadSettings();
    this.totalKeys = this.storageService.getStorageUsage();
    this.remainingCapacity = this.storageService.getRemainingCapacity();
    this.storageForm.get('value')?.setValue(this.totalKeys);
  }

  loadSettings() {
    this.isLoading = true;
    this.subscription = this.partnerAppSettingService.getAll().subscribe({
      next: (response) => {
        try {
          this.appSettings = response.filter(setting => setting.status === 'PUBLISHED');
          this.recentUpdates = [...this.appSettings]
            .sort((a, b) => new Date(b.modifiedDate ?? '').getTime() - new Date(a.modifiedDate ?? '').getTime())
            .slice(0, 3);

          this.initSettingsChart();
        } catch (e) {
          console.error('Error processing settings data:', e);
        } finally {
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Error fetching settings API:', err);
        this.appSettings = [];
        this.recentUpdates = [];
        this.initSettingsChart();
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  initSettingsChart() {
    if (typeof document === 'undefined' || this.appSettings.length === 0) return;

    // 1. Check if dark mode is active directly
    const isDark = this.colorScheme === 'dark';

    // 2. Map directly to your Tailwind Slate colors for a perfect match
    const textColor = isDark ? '#cbd5e1' : '#64748b';   // slate-300 / slate-500
    const borderColor = isDark ? '#334155' : '#e2e8f0'; // slate-700 / slate-200

    const typeCounts = this.appSettings.reduce((acc, setting) => {
      const typeKey = (setting.type || 'UNKNOWN').trim().toUpperCase();
      acc[typeKey] = (acc[typeKey] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const labels = Object.keys(typeCounts);

    const colorPalette = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    const seriesData = Object.values(typeCounts).map((value, index) => {
      return {
        value: value,
        itemStyle: { color: colorPalette[index % colorPalette.length] }
      };
    });

    this.echartsOptions = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '5%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: labels,
        axisLabel: { color: textColor }, // Applied here
        axisLine: { lineStyle: { color: borderColor } }, // Applied here
        axisTick: { alignWithLabel: true }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: textColor }, // Applied here
        splitLine: {
          lineStyle: {
            color: borderColor, // Applied here
            type: 'dashed'
          }
        }
      },
      series: [
        {
          name: 'Settings Count',
          type: 'bar',
          barWidth: '50%',
          data: seriesData,
          itemStyle: {
            borderRadius: [4, 4, 0, 0]
          }
        }
      ]
    };
  }

  getSettingValue(name: string): string | undefined {
    const setting = this.appSettings.find(s => s.name === name);
    return setting ? setting.value : undefined;
  }

  isSettingTrue(name: string): boolean {
    const val = this.getSettingValue(name);
    return val ? val.trim().toLowerCase() === 'true' : false;
  }

  formatTimeSince(date: string): string {
    if (!date) return '';
    const now = new Date();
    const modified = new Date(date);
    const diffMs = now.getTime() - modified.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return `${diffMins}m ago`;
  }

  get colorScheme(): string {
    return this.layoutService.isDarkTheme() ? 'dark' : 'light';
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}