import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable, of, tap } from 'rxjs';
import { AcademicSessionProgramExpandos, Program } from 'src/app/shared/models/cloudbytes/program';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProgramService extends GenericService<Program, Program> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Program", environment.apiMastersUrl);
    }

    getProgramsByAcademicSessionId(academicSessionId: number): Observable<Program[]> {
        return this.http.get<Program[]>(`${environment.apiMastersUrl}/Program/GetByAcademicSessionId/${academicSessionId}`).pipe(
            tap((data: Program[]) => {

            }),
            catchError(error => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
                return of([]);
            })
        );
    }
    
    getByAcademicSessionIds(academicSessionIds: number[]): Observable<AcademicSessionProgramExpandos> {
        return this.http.post<AcademicSessionProgramExpandos>(environment.apiMastersUrl + '/Program/GetByAcademicSessionIds', academicSessionIds);
    }
}