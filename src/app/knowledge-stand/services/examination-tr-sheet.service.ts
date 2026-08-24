import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TrUrl } from 'src/app/shared/models/knowledge-stand/documents-url';
import { ExaminationTRSheetResponse, TRDataRequest, TRRequest } from 'src/app/shared/models/knowledge-stand/examination-tr-sheet';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ExaminationTRSheetService {
    private trSheetDataSubject = new BehaviorSubject<any>(null);
    public commonTRSheetData$ = this.trSheetDataSubject.asObservable();

    constructor(private http: HttpClient) { }
    getOperationalVerticalSubjectResponseByTRRequest(tRRequest:TRRequest) {
        return this.http.post<ExaminationTRSheetResponse>(environment.apiExaminationsUrl + '/ExaminationTRSheet/GetOperationalVerticalSubjectResponseByTRRequest',tRRequest);
    }
  
    getTRSheetResponseDataByTRRequest(tRSheetReportDataRequest:TRDataRequest){
        return this.http.post<any>(environment.apiExaminationsUrl + '/ExaminationTRSheet/GetExaminationTRSheetResponseDataByTRRequest',tRSheetReportDataRequest);
    }  
    getExaminationTRSheetDataForBacklogByTRRequest(tRRequest:TRDataRequest){
        return this.http.post<any>(environment.apiExaminationsUrl + '/ExaminationTRSheet/GetExaminationTRSheetDataForBacklogByTRRequest',tRRequest);
    }
    previewExaminationTRSheetResponseDataByTRRequest(tRRequest:TRRequest){
        return this.http.post<TrUrl>(environment.apiExaminationsUrl + '/ExaminationTRSheet/PreviewExaminationTRSheetResponseDataByTRRequest',tRRequest);
    }  
    previewExaminationTRSheetResponseDataForBacklogByTRRequest(tRRequest:TRRequest){
        return this.http.post<TrUrl>(environment.apiExaminationsUrl + '/ExaminationTRSheet/PreviewExaminationTRSheetResponseDataForBacklogByTRRequest',tRRequest);
    }
    saveTRResponseByTRRequest(tRRequest:TRRequest){
        return this.http.post<TrUrl>(environment.apiExaminationsUrl + '/ExaminationTRSheet/SaveTRResponseByTRRequest',tRRequest);
    }
    saveTRResponseForBacklogByTRRequest(tRRequest:TRRequest){
        return this.http.post<TrUrl>(environment.apiExaminationsUrl + '/ExaminationTRSheet/SaveTRResponseForBacklogByTRRequest',tRRequest);
    }
    downloadTRSheetByTRRequest(tRRequest:TRRequest){
        return this.http.post<TrUrl>(environment.apiExaminationsUrl + '/ExaminationTRSheet/DownloadTRSheetByTRRequest',tRRequest);
    }

    GetByExaminationId(examinationId:number) {
        return this.http.get<ExaminationTRSheetResponse[]>(environment.apiExaminationsUrl + '/ExaminationTRSheet/GetByExaminationId/'+examinationId);
    }

    ValidateMarksEntryByTRRequest(tRRequest:TRRequest){
        return this.http.post<string[]>(environment.apiExaminationsUrl + '/ExaminationTRSheet/ValidateMarksEntryByTRRequest', tRRequest);
    }
    previewExaminationTRSheetResponseDataByTRRequestV2(tRRequest:TRRequest){
        return this.http.post<TrUrl>(environment.apiExaminationsUrl + '/ExaminationTRSheet/PreviewHtmlExaminationTRSheetResponseDataByTRRequest',tRRequest);
    } 
    previewExaminationTRSheetResponseDataForBacklogByTRRequestv2(tRRequest:TRRequest){
        return this.http.post<TrUrl>(environment.apiExaminationsUrl + '/ExaminationTRSheet/PreviewHtmlExaminationTRSheetResponseDataForBacklogByTRRequest',tRRequest);
    }
    downloadTRSheetByTRRequestv2(tRRequest:TRRequest){
        return this.http.post<TrUrl>(environment.apiExaminationsUrl + '/ExaminationTRSheet/DownloadHtmlTRSheetByTRRequest',tRRequest);
    }

    saveCommonExaminationTRSheetData(examinationTRData : any){
        this.trSheetDataSubject.next(examinationTRData);
    }

    getCommonExaminationTRSheetData(): Observable<any> {
        return this.commonTRSheetData$;
    }

    hasData(): boolean {
        return this.trSheetDataSubject.value !== null && this.trSheetDataSubject.value !== undefined;
    }

    clearData(): void {
        this.trSheetDataSubject.next(null);
    }
}