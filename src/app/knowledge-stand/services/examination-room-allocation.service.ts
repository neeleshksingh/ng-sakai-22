import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExaminationRoomAllocation } from 'src/app/shared/models/knowledge-stand/examination-room-allocation';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ExaminationRoomAllocationService extends GenericService< ExaminationRoomAllocation,ExaminationRoomAllocation> {
   
    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "ExaminationRoomAllocation", environment.apiExaminationsUrl);
    }

    getExaminationRoomAllocationByExaminationId(examinationId: any) {
        return this.http.get<ExaminationRoomAllocation[]>(environment.apiExaminationsUrl + '/ExaminationRoomAllocation/GetByExamination/' + examinationId);
    }

    getActiveExaminationRoomAllocationByRoomId(roomId: number) {
        return this.http.get<ExaminationRoomAllocation[]>(environment.apiExaminationsUrl + '/ExaminationRoomAllocation/GetActiveExaminationRoomAllocationByRoomId/' + roomId);
    }
    getExaminationRoomAllocationByAcademicSession(academicSessionId: number, programId: number, operationalVerticalId: number) {
        return this.http.get<ExaminationRoomAllocation[]>(environment.apiExaminationsUrl + '/ExaminationRoomAllocation/GetByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId);
    }
}