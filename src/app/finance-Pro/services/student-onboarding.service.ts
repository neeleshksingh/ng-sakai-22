import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentOnboardingService  {
    
  constructor(private http: HttpClient) { }
  
    onboardingStatusGetByAcademicsessionIds(academicSessionIds: number[]){
     return this.http.post<any>(environment.apiAccountsUrl + '/StudentRegisterOnboardingStatus/GetByAcademicSessionIds', academicSessionIds)
    }

    
}