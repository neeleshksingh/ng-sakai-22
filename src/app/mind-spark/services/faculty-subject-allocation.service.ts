import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FacultySubjectAllocation } from 'src/app/shared/models/mindspark/faculty-subject-allocation';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class FacultySubjectAllocationService extends GenericService<FacultySubjectAllocation, FacultySubjectAllocation> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "FacultySubjectAllocation", environment.apiAcademicsUrl);
    }

    getBySubjectPaperCodeId(subjectPaperCodeId: number) {
        return this.http.get<FacultySubjectAllocation[]>(environment.apiAcademicsUrl + '/FacultySubjectAllocation/GetBySubjectPaperCodeId/' + subjectPaperCodeId);
    }

    getByEmployeeId(employeeId: number){
        return this.http.get<FacultySubjectAllocation[]>(`${environment.apiAcademicsUrl}/FacultySubjectAllocation/GetByEmployeeId/${employeeId}`);
    }

    getFacultySubjectAllocationByYear(facultySubjectAllocationYear: string){
        return this.http.get<FacultySubjectAllocation[]>(`${environment.apiAcademicsUrl}/FacultySubjectAllocation/GetFacultySubjectAllocationByYear/${facultySubjectAllocationYear}`);
    }

    GetByAcademicSessionProgramOVSection(academicSessionId: number, programId: number, operationalVerticalId: number, section: string){
        return this.http.get<FacultySubjectAllocation[]>(`${environment.apiAcademicsUrl}/FacultySubjectAllocation/GetByAcademicSession/${academicSessionId}/Program/${programId}/OperationalVertical/${operationalVerticalId}/Section/${section}`);
    }

}