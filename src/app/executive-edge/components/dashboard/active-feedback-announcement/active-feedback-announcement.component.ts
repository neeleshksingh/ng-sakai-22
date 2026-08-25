import { SharedModule } from '@/shared.module';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FeedbackAnnouncementService } from 'src/app/executive-edge/services/feedback-announcement/feedback-announcement.service';
import { FeedbackAnnouncement } from 'src/app/shared/models/executiveedge/feedback-announcement';

@Component({
  selector: 'app-active-feedback-announcement',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './active-feedback-announcement.component.html',
  styleUrl: './active-feedback-announcement.component.scss'
})
export class ActiveFeedbackAnnouncementComponent {
  activeFeedbackAnnouncementList: FeedbackAnnouncement[] = [];
  cols: { field: string; header: string; filterType: string; }[] = [];
  skeletonValue: number[] = Array(4).fill(1);
  isLoading: boolean = true;
  constructor(
    private feedbackAnnouncementService: FeedbackAnnouncementService,
    private messageService: MessageService,
  ) { }
   ngOnInit(): void {
    
    this.getActiveFeedbackAnnouncement();

  }
  getActiveFeedbackAnnouncement() {
    this.feedbackAnnouncementService.getActiveFeedbackAnnouncement().subscribe({
      next: (response) => {
        this.activeFeedbackAnnouncementList = response.filter((x: any) => x.status.toUpperCase() == "PUBLISHED");
        this.isLoading = false;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch active feedback announcements.' });
      }
    });
  }
  getDaysRemaining(endDate: Date | string | undefined): number {
  if (!endDate) {
    return 0;
  }

  const end = new Date(endDate).getTime();
  const now = new Date().getTime();
  const diff = end - now;

  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

  getSeverity(status: string): string {
    return status === 'PUBLISHED' ? 'success' : 'info';
  }
}
