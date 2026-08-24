import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StudentFeeLedgerExpando } from 'src/app/shared/models/finance-Pro/student-fee-ledger-report';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

   constructor(private http: HttpClient) { }
   private studentFeeLedgerExpandoByRegistrationNumberSubject = new BehaviorSubject<StudentFeeLedgerExpando>(new StudentFeeLedgerExpando());
    public studentId!: string;

  getStudentFeeLedgerExpandoByRegistrationNumber(studentId: string = 'SBU200295') {
      this.http.get<StudentFeeLedgerExpando>(environment.apiAccountsUrl + '/Reports/GetStudentFeeLedgerExpandoByRegistrationNumber/' + studentId).subscribe(response => {
        this.studentFeeLedgerExpandoByRegistrationNumberSubject.next(response);
      });
    }
    get studentFeeLedgerExpandoByRegistrationNumber() {
      return this.studentFeeLedgerExpandoByRegistrationNumberSubject.asObservable();
    }

  getStudentFeeLedgerExpandoByStudentId(studentId: string) {
    return this.http.get<StudentFeeLedgerExpando>(environment.apiAccountsUrl + '/Reports/GetStudentFeeLedgerExpandoByRegistrationNumber/' + studentId);
  }
}