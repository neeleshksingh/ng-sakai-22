import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExaminationSeatingArrangementData, ExaminationSeatingArrangementRequest } from 'src/app/shared/models/knowledge-stand/examination-room-allocation';
import { ExaminationSeatingArrangementGeneration } from 'src/app/shared/models/knowledge-stand/examination-seating-arrangement-generation';
import { ExaminationSeatingArrangement } from 'src/app/shared/models/knowledge-stand/examination-seating-arrangement.';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ExaminationSeatingArrangementService   extends GenericService<ExaminationSeatingArrangement, ExaminationSeatingArrangement> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "ExaminationSeatingArrangement", environment.apiExaminationsUrl);
    }

    prepareExaminationSeatingArrangement(examinationRoomAllocationRequests: ExaminationSeatingArrangementRequest[]) {
        return this.http.post<ExaminationSeatingArrangementData>(environment.apiExaminationsUrl + '/ExaminationSeatingArrangement/PrepareExaminationSeatingArrangement/', examinationRoomAllocationRequests); 
    }

    generateStudentSeatingArrangementByExamination(examinationId: number) {
        return this.http.post<ExaminationSeatingArrangementGeneration[]>(environment.apiExaminationsUrl + '/ExaminationSeatingArrangement/GenerateStudentSeatingArrangementByExamination', examinationId);
    }
}