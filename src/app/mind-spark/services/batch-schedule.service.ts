import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BatchScheduleRequest, BatchScheduleResponse } from 'src/app/shared/models/mindspark/batch-schedule';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BatchScheduleService extends GenericService<BatchScheduleResponse, BatchScheduleResponse> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "BatchSchedule", environment.apiAcademicsUrl);
    }

    getByBatchCode(batchCode: string) {
        return this.http.get<BatchScheduleResponse[]>(environment.apiAcademicsUrl + '/BatchSchedule/GetByBatchCode/' + batchCode)
    }

    getBatchScheduleToUpdateByBatchCode(batchCode: string) {
        return this.http.get<BatchScheduleResponse[]>(environment.apiAcademicsUrl + '/BatchSchedule/GetBatchScheduleToUpdateByBatchCode/' + batchCode)
    }

    getBatchScheduleToReSubmitByBatchCode(batchCode: string, batchScheduleRequests: BatchScheduleRequest[]) {
        return this.http.post<BatchScheduleResponse[]>(environment.apiAcademicsUrl + '/BatchSchedule/GetBatchScheduleToReSubmitByBatchCode/' + batchCode, batchScheduleRequests)
    }
}