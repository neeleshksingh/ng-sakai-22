import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { SharedModule } from '@/shared.module';
import { StudentAcademicSchedule, StudentDashboardAcademicsCalendarData } from 'src/app/shared/models/students/student-dashboard';
import { AcademicsCalendarService } from '../../services/acadmics-calendar.service';
import { StudentDashboardService } from '../../services/student-dashboard.service';

@Component({
  selector: 'app-dashboard-academics-calendar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard-academics-calendar.component.html',
  styleUrl: './dashboard-academics-calendar.component.scss'
})
export class DashboardAcademicsCalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  eventDialog: boolean = false;
  changedEvent: any;
  clickedEvent = null;
  title: string = '';
  studentDashboardAcademicsCalenderDataList: StudentDashboardAcademicsCalendarData[] = [];
  events: any[] = [];
  fullcalendarOptions: any;
  studentAcademicSchedules: StudentAcademicSchedule[] = [];

  constructor(
    private http: HttpClient,
    public studentDashboardService: StudentDashboardService,
    private academicsCalendarService: AcademicsCalendarService
  ) { }

  ngOnInit(): void {
    this.onLoad();
    this.initializeCalendarOptions();
  }

  initializeCalendarOptions() {
    this.fullcalendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      initialDate: new Date(),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth'
      },
      slotMinTime: "09:00",
      slotMaxTime: "19:00",
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      height: 'auto',
      aspectRatio: 1.35,
      windowResize: this.handleWindowResize.bind(this),
      eventClick: (e: { event: { title: string } }) => {
        this.eventDialog = true;
        this.title = e.event.title;
      }
    };
  }

  handleWindowResize(view: any) {
    this.updateCalendarSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateCalendarSize();
  }

  updateCalendarSize() {
    if (this.calendarComponent) {
      this.calendarComponent.getApi().updateSize();
    }
  }

  onLoad() {
    this.studentDashboardService.dashboardAcademicCalendarCall.subscribe(data => {
      data.studentAcademicScheduleEvent.data.forEach((k: any) => {
        k.title = `${k.description}, StartTime: ${k.start}, EndTime: ${k.end}`;

        let color = '#fbc02d';
        if (k.hasBatchConducted && k.isPresent) {
          color = "#0d89ec"
        }
        else if (k.hasBatchConducted && !k.isPresent) {
          color = "#c02929"
        }

        this.studentAcademicSchedules.push({
          id: k.id,
          title: k.title,
          start: k.start,
          end: k.end,
          url: k.url,
          allDay: false,
          backgroundColor: color
        });
      });

      this.getAcademicsHoliday();
    });
  }

  getAcademicsHoliday() {
    this.academicsCalendarService.getAcademicsHoliday().subscribe(data => {
      data.map((event: any) => {
        this.studentAcademicSchedules.push({
          id: event.id,
          title: event.title,
          start: new Date(event.date),
          end: undefined,
          url: undefined,
          allDay: true,
          backgroundColor: '#689f38'
        });
      });

      this.studentDashboardService.data = this.studentAcademicSchedules;
      this.fullcalendarOptions = {
        ...this.fullcalendarOptions,
        events: this.studentAcademicSchedules
      };
    });
  }
}
