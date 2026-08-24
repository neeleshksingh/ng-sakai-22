import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Student } from 'src/app/shared/models/bigleads/student';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentService extends GenericService<Student, Student> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Student", environment.apiLeadsUrl);
    }

    getStudentByStudentId(studentId: string) {
        return this.http.get<any>(environment.apiLeadsUrl + '/Student/GetByStudentId/' + studentId);
    }

    getStudentByAcademicSessionAndProgram(academicSessionId: number, programId: number) {
        return this.http.get<Student[]>(environment.apiLeadsUrl + '/Student/GetStudentByAcademicSession/' + academicSessionId + '/Program/' + programId);
    }
}