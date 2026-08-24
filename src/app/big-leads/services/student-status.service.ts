import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StudentStatus } from 'src/app/shared/models/bigleads/student-status';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentStatusService extends GenericService<StudentStatus, StudentStatus> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "StudentStatus", environment.apiLeadsUrl);
    }

    getStudentStatusByStudentId(studentId: string) {
        return this.http.get<any>(environment.apiLeadsUrl + '/StudentStatus/GetByStudentId/' + studentId);
    }
}