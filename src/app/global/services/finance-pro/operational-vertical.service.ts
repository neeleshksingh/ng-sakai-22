import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AcademicSessionProgram } from 'src/app/shared/models/cloudbytes/academic-session-program';
import { OperationalVertical } from 'src/app/shared/models/cloudbytes/operational-vertical';
import { GenericGlobalService } from 'src/app/shared/services/generic-service-global.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OperationalVerticalService extends GenericGlobalService<OperationalVertical, OperationalVertical> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "OperationalVertical", environment.apiGlobalUrl);
    }

    getOperationalVerticalByAcademicSession(acdemicSessionId: number) {
        return this.http.get<AcademicSessionProgram[]>(environment.apiGlobalUrl + `/AcademicSessionProgram/GetByAcademicSession/${acdemicSessionId}`);
    }

    // getOperationalVerticalByProgramId(programId: number) {
    //     var academicSessionProgramList: AcademicSessionProgram[];
    //     academicSessionProgramList = this.localStorageService.getItem('AcademicSessionProgramList');
    //     if(academicSessionProgramList){
    //     var allOperationalVerticalForProgramId = academicSessionProgramList.filter(x => x.programId == programId);
    //     }
    //     var operationalVerticalList: OperationalVertical[] = [];
    //     operationalVerticalList = this.localStorageService.getItem('OperationalVerticalList');
    //     if (operationalVerticalList) {
    //         return operationalVerticalList.filter(x => allOperationalVerticalForProgramId.find(y => y.operationalVerticalId == x.id));
    //         }
    //     this.http.get<OperationalVertical[]>(environment.apiGlobalUrl + '/OperationalVertical/GetByProgramId/' + programId).subscribe(response => {
    //         operationalVerticalList = response;
    //     });
        
    //     return operationalVerticalList;
    // }
    
    getOperationalVerticalByProgramId(programId: number): Observable<OperationalVertical[]> {
        return this.http.get<OperationalVertical[]>(`${environment.apiGlobalUrl}/OperationalVertical/GetByProgramId/${programId}`).pipe(
            catchError(error => this.handleError<OperationalVertical[]>(error))
        );
    }

    getByProgramId(programId: number): Observable<OperationalVertical[]> {
        return this.http.get<OperationalVertical[]>(`${environment.apiGlobalUrl}/OperationalVertical/GetByProgramId/${programId}`).pipe(
            catchError(error => this.handleError<OperationalVertical[]>(error))
        );
    }
}