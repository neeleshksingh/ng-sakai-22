import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import { StudentDashboardService } from '../../services/student-dashboard.service';
import { DashboardAcademicsCalendarComponent } from "../dashboard-academics-calendar/dashboard-academics-calendar.component";


@Component({
  selector: 'app-time-table',
  standalone: true,
  imports: [SharedModule, DashboardAcademicsCalendarComponent],
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.scss'
})
export class TimeTableComponent implements OnInit {
  constructor(
    private studentDashboardService: StudentDashboardService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getStudentDashboardDetails();
  }
  getStudentDashboardDetails() {
    this.studentDashboardService.getStudentAcademicCalendar()
      .subscribe({
        next: (data) => {
          if (data) {
            this.studentDashboardService.onDashboardAcademicScheduleEventPageLoad(data);
          }

        }, error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
        }
      });
  }

}
