import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';

export type AlertDialogType = 'info' | 'success' | 'warning' | 'error';

export interface AlertDialogItem {
  id: string;
  type: AlertDialogType;
  title: string;
  message: string;
  subtitle?: string;
  startsAt?: Date | string;
  expiresAt?: Date | string;
  priority?: number;
  actionLabel?: string;
}

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, TagModule, ButtonModule],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss'
})
export class AlertDialogComponent {
  @Input() alerts: AlertDialogItem[] = [];
  @Output() allAlertsHandled = new EventEmitter<void>();

  isVisible: boolean = false;
  activeAlert: AlertDialogItem | null = null;

  ngOnInit(): void {
    this.loadNextActiveAlert();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['alerts']) {
      this.loadNextActiveAlert();
    }
  }

  dismissCurrentAlert(): void {
    if (!this.activeAlert) {
      this.isVisible = false;
      this.allAlertsHandled.emit();
      return;
    }

    this.markAsDismissed(this.activeAlert.id);
    this.loadNextActiveAlert();
  }

  get dialogHeader(): string {
    if (!this.activeAlert) {
      return 'Alert';
    }
    return this.activeAlert.type === 'warning' ? 'Urgent Academic Update' : 'Announcement';
  }

  get alertIcon(): string {
    switch (this.activeAlert?.type) {
      case 'success':
        return 'pi pi-check-circle';
      case 'error':
        return 'pi pi-times-circle';
      case 'info':
        return 'pi pi-info-circle';
      default:
        return 'pi pi-megaphone';
    }
  }

  get badgeText(): string {
    if (this.activeAlert?.subtitle) {
      return this.activeAlert.subtitle;
    }
    return this.activeAlert?.type === 'warning' ? 'Highest Priority' : 'Notification';
  }

  get badgeSeverity(): 'success' | 'info' | 'warn' | 'danger' {
    switch (this.activeAlert?.type) {
      case 'success':
        return 'success';
      case 'error':
        return 'danger';
      case 'info':
        return 'info';
      default:
        return 'warn';
    }
  }

  get actionLabel(): string {
    return this.activeAlert?.actionLabel || 'I Understand';
  }

  get cardClass(): string {
    switch (this.activeAlert?.type) {
      case 'success':
        return 'alert-card alert-card-success';
      case 'error':
        return 'alert-card alert-card-error';
      case 'info':
        return 'alert-card alert-card-info';
      default:
        return 'alert-card alert-card-warning';
    }
  }

  private loadNextActiveAlert(): void {
    const now = new Date();

    const eligibleAlerts = [...this.alerts]
      .filter((alert) => this.isActiveByDate(alert, now) && !this.isDismissed(alert.id))
      .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

    this.activeAlert = eligibleAlerts[0] ?? null;
    this.isVisible = this.activeAlert !== null;

    if (!this.activeAlert) {
      this.allAlertsHandled.emit();
    }
  }

  private isActiveByDate(alert: AlertDialogItem, now: Date): boolean {
    const startsAt = this.toDate(alert.startsAt);
    const expiresAt = this.toDate(alert.expiresAt);

    const isAfterStart = !startsAt || now >= startsAt;
    const isBeforeExpiry = !expiresAt || now < expiresAt;

    return isAfterStart && isBeforeExpiry;
  }

  private toDate(value?: Date | string): Date | null {
    if (!value) {
      return null;
    }

    const dateValue = value instanceof Date ? value : new Date(value);
    if (isNaN(dateValue.getTime())) {
      return null;
    }
    return dateValue;
  }

  private dismissedStorageKey(id: string): string {
    return `alert-dialog-dismissed-${id}`;
  }

  private isDismissed(id: string): boolean {
    return sessionStorage.getItem(this.dismissedStorageKey(id)) === 'true';
  }

  private markAsDismissed(id: string): void {
    sessionStorage.setItem(this.dismissedStorageKey(id), 'true');
  }
}
