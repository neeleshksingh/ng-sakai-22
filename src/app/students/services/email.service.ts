import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }
  getStudentWelcomeLetterAsHtmlByRegistrationNumber(registrationNumber: string) {
  const headers: HttpHeaders = new HttpHeaders({'Accept': 'text/html'});
    return this.http.get(environment.apiStudentsUrl + '/Email/GetStudentWelcomeLetterAsHtmlByRegistrationNumber/'+ registrationNumber, 
    { headers: headers, responseType: 'text'  });
  }

  sendStudentWelcomeLetterByRegistrationNumber(registrationNumber: string) {
    return this.http.post<any>(environment.apiStudentsUrl + '/Email/SendStudentWelcomeLetterByRegistrationNumber/' + registrationNumber, null);
  }
}
