import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Batch, BatchResponse } from 'src/app/shared/models/mindspark/batch';
import { GenericGlobalService } from 'src/app/shared/services/generic-service-global.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BatchService extends GenericGlobalService<Batch, BatchResponse> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Batch", environment.apiGlobalUrl);
    }

    getBatchList(academicSessionId: number, programId: number, operationalVerticalId: number, subjectPaperCodeId: number) {
        return this.http.get<Batch[]>(environment.apiGlobalUrl + '/Batch/GetByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId + '/SubjectPaperCode/' + subjectPaperCodeId);
    }

    getByBatchCode(batchCode: string) {
        return this.http.get<Batch>(environment.apiGlobalUrl + '/Batch/GetByBatchCode/' + batchCode);
    }
    
    getByFacultyCode(facultyCode: string, isActiveBatchOnly:boolean) {
        return this.http.get<Batch>(environment.apiGlobalUrl + `/Batch/GetByFacultyCode/${facultyCode}/ActiveBatchOnly/${isActiveBatchOnly}`);
    }
}