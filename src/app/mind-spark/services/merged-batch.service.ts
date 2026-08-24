import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Batch } from 'src/app/shared/models/mindspark/batch';
import { MergedBatch } from 'src/app/shared/models/mindspark/merged-batch';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MergedBatchService extends GenericService<MergedBatch, MergedBatch> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "MergedBatch", environment.apiAcademicsUrl);
  }

  getByBatchCode(mergedBatchCode: string) {
    return this.http.get<Batch>(environment.apiAcademicsUrl + '/MergedBatch/GetByBatchCode/' + mergedBatchCode);
  }

}
