import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentProgramService extends GenericService<StudentProgram, StudentProgram> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "StudentProgram", environment.apiAcademicsUrl);
    }

    getByStudentId(studentId: string) {
        return this.http.get<StudentProgram[]>(environment.apiAcademicsUrl + '/StudentProgram/GetByStudentId/' + studentId);
    }
    getByRegistrationNumber(registrationNumber: string) {
        return this.http.get<StudentProgram[]>(environment.apiAcademicsUrl + '/StudentProgram/GetByRegistrationNumber/' + registrationNumber);
    }
    getByAcademicSession(academicSessionId: number, programId: number, operationalVerticalId: number) {
        return this.http.get<StudentProgram[]>(environment.apiAcademicsUrl + '/StudentProgram/GetByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId);
    }

    getByAcademicSessionProgram(academicSessionId: number, programId: number) {
        return this.http.get<StudentProgram[]>(environment.apiAcademicsUrl + '/StudentProgram/GetByAcademicSession/' + academicSessionId + '/Program/' + programId);
    }

    updateStudentProgramYearBack(studentProgram: StudentProgram[]) {
        return this.http.post<StudentProgram[]>(environment.apiAcademicsUrl + '/StudentProgram/UpdateStudentProgramYearBack', studentProgram)
    }
    getStudentsByAcademicProgramOperationalVertical(academicSessionId: number, programId: number, operationalVerticalId: number) {
        return this.http.get<StudentProgram[]>(environment.apiAcademicsUrl + '/StudentProgram/GetByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId)
    }

    submitStudentsProgramSection(studentProgram: any[]) {
        return this.http.post<StudentProgram[]>(environment.apiAcademicsUrl + '/StudentProgram/UpdateStudentProgramSection', studentProgram);
    }
}