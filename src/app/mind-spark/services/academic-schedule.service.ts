import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AcademicSchedule } from 'src/app/shared/models/mindspark/academic-schedule';
import { UniversityTimeTable } from 'src/app/shared/models/mindspark/university-time-table';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AcademicScheduleService extends GenericService<AcademicSchedule, AcademicSchedule> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "AcademicSchedule", environment.apiAcademicsUrl);
    }

    getUniversityTimeTableByAcademicSession(academicSessionId: number, programId: number, operationalVerticalId: number, section: string) {
        return this.http.get<UniversityTimeTable>(`${environment.apiAcademicsUrl}/AcademicSchedule/GetUniversityTimeTableByAcademicSession/${academicSessionId}/Program/${programId}/OperationalVertical/${operationalVerticalId}/Section/${section}`);
    }

    UpdateUniversityTimeTable(payload: any) {
        return this.http.post(`${environment.apiAcademicsUrl}/AcademicSchedule/UpdateUniversityTimeTable`, payload);
    }

    getUniversityTimeTableByFacultyCode(facultyCode: string, onlyRunningSession: boolean) {
        return this.http.get<UniversityTimeTable>(`${environment.apiAcademicsUrl}/AcademicSchedule/GetUniversityTimeTableByFacultyCode/${facultyCode}/OnlyRunningSession/${onlyRunningSession}`);
    }
}