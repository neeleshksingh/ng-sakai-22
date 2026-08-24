import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StudentProgramPaperCodeAllocation, StudentProgramPaperCodeAllocationSearch, StudentProgramPaperCodeAllocationSearchResponse } from 'src/app/shared/models/mindspark/student-program-paper-code-allocation';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentProgramPaperCodeAllocationService extends GenericService <StudentProgramPaperCodeAllocation, StudentProgramPaperCodeAllocation>{

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "StudentProgramPaperCodeAllocation", environment.apiAcademicsUrl);
    }

    getByStudentId(studentId: string) {
        return this.http.get<StudentProgramPaperCodeAllocation[]>(environment.apiAcademicsUrl + '/StudentProgramPaperCodeAllocation/GetByStudentId/' + studentId)
    }

    getByBatchCode(batchCode: string) {
        return this.http.get<StudentProgramPaperCodeAllocation[]>(environment.apiAcademicsUrl + '/StudentProgramPaperCodeAllocation/GetByBatchCode/' + batchCode)
    }

    getByRegistrationNumber(registrationNumber: string) {
        return this.http.get<StudentProgramPaperCodeAllocation[]>(environment.apiAcademicsUrl + '/StudentProgramPaperCodeAllocation/GetByRegistrationNumber/' + registrationNumber)
    }

    getByAcademicSessionProgramsOvsPaperCodId(academicSessionId: number, programId: number, operationalVerticalId: number,subjectPaperCodeId:number) {
        return this.http.get<StudentProgramPaperCodeAllocation[]>(environment.apiAcademicsUrl + '/StudentProgramPaperCodeAllocation/GetByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId+'/SubjectPaperCode/'+subjectPaperCodeId)
    }

    getByAcademicSessionProgramsOperationalVertical(academicSessionId: number, programId: number, operationalVerticalId: number) {
        return this.http.get<StudentProgramPaperCodeAllocation[]>(environment.apiAcademicsUrl + '/StudentProgramPaperCodeAllocation/GetByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId)
    }
    
    getStudentProgramPaperCodeAllocationSearch(studentProgramPaperCodeAllocationSearch: StudentProgramPaperCodeAllocationSearch) {
        return this.http.post<StudentProgramPaperCodeAllocationSearchResponse>(environment.apiAcademicsUrl + 
            '/StudentProgramPaperCodeAllocation/GetStudentProgramPaperCodeAllocationExpandoByStudentProgramPaperCodeAllocationSearchRequest', 
            studentProgramPaperCodeAllocationSearch);  
    }
}