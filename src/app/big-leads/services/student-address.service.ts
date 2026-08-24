import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { StudentAddress } from 'src/app/shared/models/bigleads/student-address';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentAddressService extends GenericService<StudentAddress, StudentAddress> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "StudentAddress", environment.apiLeadsUrl);
    }
    private studentAddressDetailsSubject = new BehaviorSubject<StudentAddress[]>([]);

    GetStudentAddressByStudentId(studentId: string) {
      this.http.get<StudentAddress[]>(environment.apiGlobalUrl + '/StudentAddress/GetByStudentId/' + studentId).subscribe(response => {
        this.studentAddressDetailsSubject.next(response);
       });
   }
   
    get studentAddress(){
      return this.studentAddressDetailsSubject.asObservable();
    }

    getStudentAddressByStudentId(studentId: string) {
        return this.http.get<StudentAddress[]>(environment.apiGlobalUrl + '/StudentAddress/GetByStudentId/' + studentId);
    }
  }