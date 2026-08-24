import { Component } from '@angular/core';
import { SharedModule } from '@/shared.module';

@Component({
  selector: 'app-student-dashboard-notice',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-dashboard-notice.component.html',
  styleUrl: './student-dashboard-notice.component.scss'
})
export class StudentDashboardNoticeComponent { }