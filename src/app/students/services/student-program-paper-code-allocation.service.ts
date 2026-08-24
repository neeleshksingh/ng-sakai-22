import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentProgramPaperCodeAllocation, StudentProgramPaperCodeAllocationResponse } from 'src/app/shared/models/students/student-program-paper-code-allocation';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentProgramPaperCodeAllocationService {

    constructor(private http: HttpClient) { }

    studentProgramPaperCodeAllocationAddMultiple(studentProgramPaperCodeAllocations:StudentProgramPaperCodeAllocation[]) {
        return this.http.post<StudentProgramPaperCodeAllocation[]>(environment.apiStudentsUrl + '/StudentProgramPaperCodeAllocation/AddMultiple',studentProgramPaperCodeAllocations);
    }
    getByRegistrationNumber(registrationNumber: string, operationalVerticalId: number) {
        return this.http.get<StudentProgramPaperCodeAllocationResponse>(environment.apiStudentsUrl + '/StudentProgramPaperCodeAllocation/GetByRegistrationNumber/'+registrationNumber+'/OperationalVertical/' + operationalVerticalId);
    }
    getByStudentId(registrationNumber: string) {
        return this.http.get<StudentProgramPaperCodeAllocationResponse>(environment.apiStudentsUrl + '/StudentProgramPaperCodeAllocation/GetByStudentId/'+registrationNumber);
    }
    getByAcademicSessionProgramOperationalVertical(academicSessionId: number, programId: number, operationalVerticalId: number) {
        return this.http.get<StudentProgramPaperCodeAllocationResponse>(environment.apiStudentsUrl + '/StudentProgramPaperCodeAllocation/GetByAcademicSession/'+academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId);
    }
}