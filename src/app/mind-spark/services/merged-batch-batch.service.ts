import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MergedBatchBatch } from 'src/app/shared/models/mindspark/merged-batch-batch';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MergedBatchBatchService extends GenericService<MergedBatchBatch, MergedBatchBatch> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "MergedBatchBatch", environment.apiAcademicsUrl);
}

  getByBatchCode(mergedBatchCode: string){
    return this.http.get<MergedBatchBatch[]>(environment.apiAcademicsUrl + '/MergedBatchBatch/GetByBatchCode/' + mergedBatchCode);
  }
}
