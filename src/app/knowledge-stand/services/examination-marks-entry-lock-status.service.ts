import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { Observable } from "rxjs";
import { ExaminationMarksEntryLockStatus, ExaminationMarksEntryLockStatusResponse } from "src/app/shared/models/knowledge-stand/examination-marks-entry-lock-status";
import { GenericService } from "src/app/shared/services/generic.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExaminationMarksEntryLockStatusService extends GenericService<ExaminationMarksEntryLockStatus, ExaminationMarksEntryLockStatus> {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, "ExaminationJobRequest", environment.apiExaminationsUrl);
  }

  getByExaminationIdBatchCode(examinationId: number, batchCode: number, isOnlyLatestRecords: boolean) {
    return this.http.get<ExaminationMarksEntryLockStatus[]>(environment.apiExaminationsUrl + '/ExaminationMarksEntryLockStatus/GetByExaminationId/' + examinationId + '/BatchCode/' + batchCode + '/OnlyLatestRecords/' + isOnlyLatestRecords);
  }

  addByFaculty(request: ExaminationMarksEntryLockStatus): Observable<ExaminationMarksEntryLockStatus> {
    return this.http.post<ExaminationMarksEntryLockStatus>(environment.apiExaminationsUrl + '/ExaminationMarksEntryLockStatus/AddByFaculty', request);
  }

  addMultipleByFaculty(requests: ExaminationMarksEntryLockStatus[]): Observable<ExaminationMarksEntryLockStatus> {
    return this.http.post<ExaminationMarksEntryLockStatus>(environment.apiExaminationsUrl + '/ExaminationMarksEntryLockStatus/AddMultipleByFaculty', requests);
  }

  getReportByExaminationId(examinationId: number,isAssessmentComponentFilterApplied:number) {
    return this.http.get<ExaminationMarksEntryLockStatusResponse[]>(environment.apiExaminationsUrl + '/ExaminationMarksEntryLockStatus/GetReportByExaminationId/' + examinationId+'/isAssessmentComponentFilterApplied/'+isAssessmentComponentFilterApplied);
  }
}