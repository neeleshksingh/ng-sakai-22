import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProgramElectiveSubject, ProgramElectiveSubjectResponse } from 'src/app/shared/models/cloudbytes/program-elective-subject';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProgramElectiveSubjectService extends GenericService<ProgramElectiveSubject, ProgramElectiveSubjectResponse> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "ProgramElectiveSubject", environment.apiMastersUrl);
    }

    getProgramElectiveSubjectByProgramAndSemester(programId: number, semesterId: number) {
        return this.http.get<ProgramElectiveSubjectResponse[]>(environment.apiMastersUrl + `/ProgramElectiveSubject/GetByProgram/${programId}/Semester/${semesterId}`);
    }
}