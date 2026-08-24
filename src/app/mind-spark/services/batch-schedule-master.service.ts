import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BatchScheduleMaster } from 'src/app/shared/models/mindspark/batch-schedule-master';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BatchScheduleMasterService extends GenericService<BatchScheduleMaster, BatchScheduleMaster>{
    
    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "BatchScheduleMaster", environment.apiAcademicsUrl);
    }
}