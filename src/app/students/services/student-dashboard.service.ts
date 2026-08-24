import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StudentAcademicSchedule, StudentBatchAttendanceSummaryDataExpando, StudentDashboardAcademicsCalendarData, StudentDashboardNotifications, StudentDashboardTiles } from 'src/app/shared/models/students/student-dashboard';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentDashboardService {

  data: StudentAcademicSchedule[]=[];
  dashboardNotificationCall = new EventEmitter();
  dashboardTilesCall = new EventEmitter();
  dashboardAcademicCalendarCall = new EventEmitter();
  dashboardAttendanceGraphDataCall = new EventEmitter();


  constructor(private http: HttpClient, private messageService : MessageService) { }

  // getStudentDashboardDetails(){
  //  return this.http.get<StudentDashboard>(environment.apiStudentsUrl + '/Dashboard/GetStudentDashboard');
  // }

  getStudentAcademicCalendar() {
    return this.http.get<StudentDashboardAcademicsCalendarData>(environment.apiStudentsUrl + '/Dashboard/GetStudentAcademicCalendar');
  }

  getStudentDashboardTiles() {
    return this.http.get<StudentDashboardTiles[]>(environment.apiStudentsUrl + '/Dashboard/GetStudentDashboardTiles');
  }

  getStudentBatchAttendanceSummary() {
    return this.http.get<StudentBatchAttendanceSummaryDataExpando>(environment.apiStudentsUrl + '/Dashboard/GetStudentBatchAttendanceSummary');
  }
  getStudentNotice() {
    var studentDashboardNotificationsList : StudentDashboardNotifications[]=[];

    var studentDashboardNotificationsString = localStorage.getItem('StudentDashboardNotificationsList');
    if(studentDashboardNotificationsString){
      studentDashboardNotificationsList = JSON.parse(studentDashboardNotificationsString);
      return studentDashboardNotificationsList; 
    }

    this.http.get<StudentDashboardNotifications[]>(environment.apiStudentsUrl + '/Dashboard/GetStudentNotice').subscribe(response=>{
      localStorage.setItem('StudentDashboardNotificationsList', JSON.stringify(response));
      studentDashboardNotificationsList = response;
      return studentDashboardNotificationsList;
    }, error =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
    });
    return studentDashboardNotificationsList;
  }

  getStudentNoticeByStudentId(studentId: string) {
    return this.http.get<StudentDashboardNotifications[]>(environment.apiStudentsUrl + '/StudentNotice/GetByStudentId/' + studentId);
  }
  onDashboardNotificationPageLoad(items: StudentDashboardNotifications[]) {
    this.dashboardNotificationCall.emit(items);
  }
  onDashboardTilesPageLoad(items: StudentDashboardTiles[]) {
    this.dashboardTilesCall.emit(items);
  }
  onDashboardAcademicScheduleEventPageLoad(items: StudentDashboardAcademicsCalendarData) {
    this.dashboardAcademicCalendarCall.emit(items);
  }
  onDashboardAttendanceGraphDataPageLoad(items: StudentBatchAttendanceSummaryDataExpando) {
    this.dashboardAttendanceGraphDataCall.emit(items);
  }
}
