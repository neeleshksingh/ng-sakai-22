import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcademicSessionProgram } from 'src/app/shared/models/cloudbytes/academic-session-program';
import { OperationalVertical } from 'src/app/shared/models/cloudbytes/operational-vertical';
import { AcademicSessionProgramExpandos } from 'src/app/shared/models/cloudbytes/program';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AcademicSessionProgramService extends GenericServiceNols<AcademicSessionProgram, AcademicSessionProgram> {

    constructor(http: HttpClient,) {
        super(http, "AcademicSessionProgram", environment.apiGlobalUrl);
    }

    getAcademicSessionProgramListByAcademicSessionId(academicSessionId: number) {
        return this.http.get<AcademicSessionProgram[]>(environment.apiGlobalUrl + '/AcademicSessionProgram/GetByAcademicSession/' + academicSessionId);
    }

    getAcademicSessionProgramListByAcademicSessionIdProgramIdOVId(academicSessionId: number, programId: number, operationalVerticalId: number) {
        return this.http.get<AcademicSessionProgram[]>(environment.apiGlobalUrl + '/AcademicSessionProgram/GetByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId);
    }

    getAcademicSessionProgramByAcademicSessionIdDegreeTypeId(academicSessionId: number, degreeTypeId: number) {
        return this.http.get<AcademicSessionProgram[]>(environment.apiGlobalUrl + '/AcademicSessionProgram/GetByAcademicSession/' + academicSessionId + '/DegreeType/' + degreeTypeId);
    }

    getByActiveYearSemesterType(year: number, semesterType: string) {
        return this.http.get<AcademicSessionProgram>(environment.apiGlobalUrl + '/AcademicSessionProgram/GetByActiveYear/' + year + '/SemesterType/' + semesterType);
    }

    getByAcademicSessionIds(academicSessionIds: number[]): Observable<AcademicSessionProgramExpandos> {
        return this.http.get<AcademicSessionProgramExpandos>(environment.apiGlobalUrl + `/AcademicSessionProgram/GetByAcademicSession/${academicSessionIds}`);
    }

    getByAcademicSessionId(academicSessionId: number): Observable<StudentProgram[]> {
        return this.http.get<StudentProgram[]>(environment.apiGlobalUrl + '/AcademicSessionProgram/GetByAcademicSession/' + academicSessionId);
    }

    getAllOperationalVerticalList() {
        return this.http.get<OperationalVertical[]>(environment.apiGlobalUrl + `/AcademicSessionProgram/GetByAcademicSession`);
    }

    getOperationVerticalList(academicid:number, programid:number) {
        return this.http.get<OperationalVertical[]>(environment.apiGlobalUrl + `/AcademicSessionProgram/GetByAcademicSession/${academicid}/Program/${programid}`)
    }
}