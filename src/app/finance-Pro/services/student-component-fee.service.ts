import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { StudentComponentFee } from 'src/app/shared/models/finance-Pro/student-component-fee';
import { StudentComponentFeeExpando } from 'src/app/shared/models/finance-Pro/student-component-fee-expando';
import { StudentComponentFeeSearchRequest } from 'src/app/shared/models/finance-Pro/student-component-fee-search-request';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root' 
  })
  export class StudentComponentFeeService extends GenericService<StudentComponentFee, StudentComponentFee> {

    constructor(http: HttpClient, messageService: MessageService) {
      super(http, messageService, "StudentComponentFee",  environment.apiAccountsUrl);
    }
    
      getByStudentComponentFeeSearchRequest(studentComponentFeeSearchRequest: StudentComponentFeeSearchRequest): Observable<StudentComponentFeeExpando> {
          return this.http.post<StudentComponentFeeExpando>(`${environment.apiAccountsUrl}/StudentComponentFee/GetByStudentComponentFeeSearchRequest`, studentComponentFeeSearchRequest);
      }
  
      getStudentComponentFeeToBeInsertedByStudentComponentFeeSearchRequest(studentComponentFeeSearchRequest: StudentComponentFeeSearchRequest): Observable<StudentComponentFee[]> {
          return this.http.post<StudentComponentFee[]>(`${environment.apiAccountsUrl}/StudentComponentFee/GetStudentComponentFeeToBeInsertedByStudentComponentFeeSearchRequest`, studentComponentFeeSearchRequest);
      }
  
      getStudentComponentFeeExpandoByRegistrationNumber(registrationNumber: string): Observable<StudentComponentFeeExpando> {
          return this.http.get<StudentComponentFeeExpando>(`${environment.apiAccountsUrl}/StudentComponentFee/GetStudentComponentFeeExpandoByRegistrationNumber/${registrationNumber}`);
      }
  
      getStudentComponentFeeExpandoByStudentComponentFeeSearchRequest(studentComponentFeeSearchRequest: StudentComponentFeeSearchRequest): Observable<StudentComponentFeeExpando> {
          return this.http.post<StudentComponentFeeExpando>(`${environment.apiAccountsUrl}/StudentComponentFee/GetStudentComponentFeeExpandoByStudentComponentFeeSearchRequest`, studentComponentFeeSearchRequest);
      }
  
  }