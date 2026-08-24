import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Batch, BatchResponse } from 'src/app/shared/models/mindspark/batch';
import { MergedBatch } from 'src/app/shared/models/mindspark/merged-batch';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class BatchService extends GenericService<Batch, BatchResponse>{
    
    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Batch", environment.apiAcademicsUrl);
    }
    getByAcademicSessionIdProgramIdOperationalVerticalId(academicSessionId: number, programId: number, operationalVerticalId: number) {
        return this.http.get<BatchResponse[]>(environment.apiAcademicsUrl + '/Batch/GetByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId);
    }

    getByAcademicSessionIdProgramIdOperationalVerticalIdSubjectPaperCodeId(academicSessionId: number, programId: number, operationalVerticalId: number, subjectPaperCodeId: number) {
        return this.http.get<BatchResponse[]>(environment.apiAcademicsUrl + '/Batch/GetByAcademicSession/' + academicSessionId + '/Program/' + programId + '/OperationalVertical/' + operationalVerticalId + '/SubjectPaperCode/' + subjectPaperCodeId);
    }

    getByBatchCode(batchCode: string) {
        return this.http.get<BatchResponse>(environment.apiAcademicsUrl + '/Batch/GetByBatchCode/' + batchCode);
    }

    getByFacultyCode(facultyCode: string, isRunningBatchOnly: boolean) {
        return this.http.get<BatchResponse[]>(environment.apiAcademicsUrl + '/Batch/GetByFacultyCode/' + facultyCode + '/ActiveBatchOnly/' + isRunningBatchOnly);
    }
    
    getBySubjectPaperCodeId(paperCodeId: number){
        return this.http.get<BatchResponse[]>(environment.apiAcademicsUrl + '/Batch/GetBySubjectPaperCodeId/'+ paperCodeId);
    }

    saveMergedBatch(batchMerge: MergedBatch) {
        return this.http.post<BatchResponse>(environment.apiAcademicsUrl + '/MergedBatch/Add', batchMerge);
    }

    getBatchWithParallelCycleByBatchCode(batchCode: string){
        return this.http.get<BatchResponse[]>(environment.apiAcademicsUrl + '/Batch/GetBatchWithParallelCycleByBatchCode/' + batchCode);
    }

    UpdateBatchMarkClosedByBatchClosedRequest(Batch:any){
       return this.http.post<any>(environment.apiAcademicsUrl+`/Batch/UpdateBatchMarkClosedByBatchClosedRequest`,Batch)
    }
}