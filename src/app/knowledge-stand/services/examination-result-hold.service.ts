import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExaminationResultHold, ExaminationResultHoldRequestSearch } from 'src/app/shared/models/knowledge-stand/examination-result-hold';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ExaminationResultHoldService {

    constructor(private http: HttpClient) { }

    addExaminationResultHold(examinationResultHold : ExaminationResultHold) {
        return this.http.post<ExaminationResultHold>(environment.apiExaminationsUrl + '/ExaminationResultHold/Add', examinationResultHold);
    }

    getExaminationResultHoldByRegistrationNumber(registrationNumber : string) {
        return this.http.get<ExaminationResultHold[]>(environment.apiExaminationsUrl + '/ExaminationResultHold/GetByRegistrationNumber/' + registrationNumber);
    }

    getByExaminationResultHoldRequest(examinationResultHoldRequestSearch : ExaminationResultHoldRequestSearch) {
        return this.http.post<ExaminationResultHoldRequestSearch[]>(environment.apiExaminationsUrl + '/ExaminationResultHold/GetByExaminationResultHoldRequest', examinationResultHoldRequestSearch);
    }

    getExaminationResultHoldById(id : number) {
        return this.http.get<ExaminationResultHold[]>(environment.apiExaminationsUrl + '/ExaminationResultHold/GetByIntId/' + id);
    }
}