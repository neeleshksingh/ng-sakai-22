import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExaminationMarksEntry, ExaminationMarksEntryRequest, ExaminationMarksEntryResponse, ExaminationMarksEntryResponseWithFileUrl } from 'src/app/shared/models/knowledge-stand/examination-marks-entry';
import { ExaminationMarksEntryLockStatusRequest } from 'src/app/shared/models/knowledge-stand/examination-marks-entry-lock-status-request';
import { ExaminationMarksEntryPendingReport } from 'src/app/shared/models/knowledge-stand/examination-marks-entry-pending';
import { StudentExaminationDecodeNumbers } from 'src/app/shared/models/knowledge-stand/student-examination-decodenumbers';
import { GenericService } from 'src/app/shared/services/generic.service';

import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ExaminationMarksEntryService extends GenericService<ExaminationMarksEntryResponse, ExaminationMarksEntryResponse> {

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "ExaminationMarksEntry", environment.apiExaminationsUrl);
    }

    getStudentExaminationDecodeNumbersByExaminationMarksEntryRequest(examinationMarksEntryRequest: ExaminationMarksEntryRequest) {
        return this.http.post<StudentExaminationDecodeNumbers[]>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/GetStudentExaminationDecodeNumbersByExaminationMarksEntryRequest', examinationMarksEntryRequest);
    }

    insertExaminationMarksEntryData(examinationMarksEntryResponse: ExaminationMarksEntryResponse) {
        return this.http.post<ExaminationMarksEntryResponse>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/InsertExaminationMarksEntryData', examinationMarksEntryResponse);
    }

    lockExaminationMarksEntry(examinationMarksEntryResponse: ExaminationMarksEntryResponse) {
        return this.http.post<ExaminationMarksEntryResponse>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/LockExaminationMarksEntry', examinationMarksEntryResponse);
    }

    unLockExaminationMarksEntry(examinationMarksEntryResponse: ExaminationMarksEntryResponse) {
        return this.http.post<ExaminationMarksEntryResponse>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/UnLockExaminationMarksEntry', examinationMarksEntryResponse);
    }

    downloadExaminationMarksEntryData(examinationMarksEntryResponse: ExaminationMarksEntryResponse) {
        return this.http.post<ExaminationMarksEntryResponseWithFileUrl>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/DownloadExaminationMarksEntryData', examinationMarksEntryResponse);
    }

    getExaminationMarksEntryDataByIsMultipleAssessmentIsWrittenOnlyExaminationMarksEntryRequest(isMultipleAssessment: boolean, isWrittenOnly: boolean, examinationMarksEntryRequest: ExaminationMarksEntryRequest) {
        return this.http.post<ExaminationMarksEntryResponse>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/GetExaminationMarksEntryDataByExaminationMarksEntryRequest/isWrittenOnly/' + isWrittenOnly + '/isMultipleAssessment/' + isMultipleAssessment, examinationMarksEntryRequest);
    }

    insertExaminationMarksEntryDataWithMultipleAssessmentComponent(examinationMarksEntryResponse: ExaminationMarksEntryResponse) {
        return this.http.post<ExaminationMarksEntryResponseWithFileUrl>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/InsertExaminationMarksEntryDataWithMultipleAssessmentComponent', examinationMarksEntryResponse);
    }

    downloadExaminationMarksEntryByExaminationMarksEntryRequest(isMultipleAssessment: boolean, isWrittenOnly: boolean, examinationMarksEntryRequest: ExaminationMarksEntryRequest) {
        return this.http.post<any>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/DownloadExaminationMarksEntryByExaminationMarksEntryRequest/isWrittenOnly/' + isWrittenOnly + '/isMultipleAssessment/' + isMultipleAssessment, examinationMarksEntryRequest);
    }

    getExaminationMarksEntryDataByExaminationaIdBatchCodeIsMultipleAssessmentIsWrittenOnly(examinationId: number, batchCode: string, isWrittenOnly: boolean, isMultipleAssessment: boolean) {
        return this.http.get<ExaminationMarksEntryResponse>(environment.apiExaminationsUrl + `/ExaminationMarksEntry/GetExaminationMarksEntryDataByExamination/${examinationId}/BatchCode/${batchCode}/IsWrittenOnly/${isWrittenOnly}/IsMultipleAssessment/${isMultipleAssessment}`);
    }

    downloadExaminationMarksEntryDataByExaminationaIdBatchCodeIsMultipleAssessmentIsWrittenOnly(examinationId: number, batchCode: string, isMultipleAssessment: boolean, isWrittenOnly: boolean) {
        return this.http.get<ExaminationMarksEntryResponseWithFileUrl>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/DownloadExaminationMarksEntryByExamination/' + examinationId + '/BatchCode/' + batchCode + '/isWrittenOnly/' + isWrittenOnly + '/isMultipleAssessment/' + isMultipleAssessment);
    }
    downloadExaminationMarksEntryByExaminationaIdBatchCodeIsMultipleAssessmentIsWrittenOnly(examinationId: number, batchCode: string, isMultipleAssessment: boolean, isWrittenOnly: boolean) {
        return this.http.get<ExaminationMarksEntryResponseWithFileUrl>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/DownloadExaminationMarksEntryByExamination/' + examinationId + '/BatchCode/' + batchCode + '/isWrittenOnly/' + isWrittenOnly + '/isMultipleAssessment/' + isMultipleAssessment);
    }

    downloadExaminationMarksEntryByExaminationMarksEntryDataRequest(payload: any) {
        return this.http.post<any>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/DownloadExaminationMarksEntryByExaminationMarksEntryRequest', payload);
    }
     getExaminationMarksEntryByExaminationMarksEntryRequest(payload: any) {
        return this.http.post<any>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/GetExaminationMarksEntryByExaminationMarksEntryRequest', payload);
    }

    getExaminationMarksEntryForScrutiny(examinationId: number, subjectPaperCodeId: string, isMultipleAssessment: boolean, isWrittenOnly: boolean) {
        return this.http.get<any>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/GetExaminationMarksEntryForScrutinyByExamination/' + examinationId + '/SubjectPaperCode/' + subjectPaperCodeId + '/isWrittenOnly/' + isWrittenOnly + '/isMultipleAssessment/' + isMultipleAssessment);
    }

    getHtmlStringResponseByExaminationMarksEntrySearchRequest(examinationMarksEntryRequest: ExaminationMarksEntryRequest) {
        return this.http.post(environment.apiExaminationsUrl + '/ExaminationMarksEntry/GetHtmlStringResponseByExaminationMarksEntrySearchRequest', examinationMarksEntryRequest, { responseType: 'text' });
    }

    getStudentExaminationMarksEntryLockStatusByExaminationMarksEntryLockStatusRequest(examinationMarksEntryLockStatusRequest: ExaminationMarksEntryLockStatusRequest) {
        return this.http.post<ExaminationMarksEntryResponse>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/GetStudentExaminationMarksEntryLockStatusByExaminationMarksEntryLockStatusRequest', examinationMarksEntryLockStatusRequest);
    }

    updateExaminationMarksEntryToLock(
        query: {
            examinationId: number;
            academicSessionId: number;
            programId: number;
            operationalVerticalId: number;
            batchCode: string | null;
            section: string;
            componentType: string;
            subjectId: number;
            subjectPaperCodeId: number;
            paperTypeId: number;
        },
        examinationMarksEntryList: ExaminationMarksEntry[]
    ) {
        let params = new HttpParams()
            .set('ExaminationId', query.examinationId)
            .set('AcademicSessionId', query.academicSessionId)
            .set('ProgramId', query.programId)
            .set('OperationalVerticalId', query.operationalVerticalId)
            .set('BatchCode', query.batchCode ?? '')
            .set('Section', query.section)
            .set('ComponentType', query.componentType)
            .set('SubjectId', query.subjectId)
            .set('SubjectPaperCodeId', query.subjectPaperCodeId)
            .set('PaperTypeId', query.paperTypeId);

        return this.http.post<ExaminationMarksEntryResponse>(
            `${environment.apiExaminationsUrl}/ExaminationMarksEntry/UpdateExaminationMarksEntryToLockByExaminationMarksEntryDataRequest`,
            examinationMarksEntryList,
            { params }
        );
    }

    updateExaminationMarksEntryToLockUnlock(
        query: {
            examinationId: number;
            academicSessionId: number;
            programId: number;
            operationalVerticalId: number;
            batchCode: string | null;
            section: string;
            componentType: string;
            subjectId: number;
            subjectPaperCodeId: number;
            paperTypeId: number;
        },
        examinationMarksEntryList: ExaminationMarksEntry[]) {
        let params = new HttpParams()
            .set('ExaminationId', query.examinationId)
            .set('AcademicSessionId', query.academicSessionId)
            .set('ProgramId', query.programId)
            .set('OperationalVerticalId', query.operationalVerticalId)
            .set('BatchCode', query.batchCode ?? '')
            .set('Section', query.section)
            .set('ComponentType', query.componentType)
            .set('SubjectId', query.subjectId)
            .set('SubjectPaperCodeId', query.subjectPaperCodeId)
            .set('PaperTypeId', query.paperTypeId);
        return this.http.post<ExaminationMarksEntryResponse>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/UpdateExaminationMarksEntryToLockUnlockByExaminationMarksEntryDataRequest',
            examinationMarksEntryList,
            { params }
        );
    }

    getByExaminationMarksEntryRequest(examinationMarksEntryRequest: ExaminationMarksEntryRequest) {
        return this.http.post<ExaminationMarksEntryResponse>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/GetByExaminationMarksEntryRequest', examinationMarksEntryRequest);
    }

    DownloadHtmlExaminationMarksEntryDataByExamination(examinationId: number, batchCode: string, isMultipleAssessment: boolean, isWrittenOnly: boolean) {
        return this.http.get<any>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/DownloadHtmlExaminationMarksEntryDataByExamination/' + examinationId + '/BatchCode/' + batchCode + '/isWrittenOnly/' + isWrittenOnly + '/isMultipleAssessment/' + isMultipleAssessment);
    }

    getExaminationMarksEntryDataByExaminationMarksEntryDataRequest(payload: any) {
        return this.http.post<ExaminationMarksEntryResponse>(environment.apiExaminationsUrl + '/ExaminationMarksEntry/GetExaminationMarksEntryDataByExaminationMarksEntryDataRequest', payload);
    }
    getExaminationMarksEntryPendingByExaminationId(examinationId: number) {
        return this.http.get<ExaminationMarksEntryPendingReport[]>(environment.apiExaminationsUrl + `/ExaminationMarksEntry/GetExaminationMarksEntryPendingByExaminationId/${examinationId}`);
    }
    getExaminationMarksEntryPendingByFacultyCode(facultyCode: string) {
        return this.http.get<ExaminationMarksEntryPendingReport[]>(environment.apiExaminationsUrl + `/ExaminationMarksEntry/GetExaminationMarksEntryPendingByFacultyCode/${facultyCode}`);
    }
}