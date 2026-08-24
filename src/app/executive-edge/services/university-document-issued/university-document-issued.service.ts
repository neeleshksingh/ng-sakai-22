import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UniversityDocumentIssued } from 'src/app/shared/models/executiveedge/university-document-issued';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn: 'root'
})

export class UniversityDocumentIssuedService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<UniversityDocumentIssued[]>(environment.apiExecutiveEdgeUrl + '/UniversityDocumentIssued/GetAll');
    }

    getByIntId(id: number) {
        return this.http.get<UniversityDocumentIssued>(environment.apiExecutiveEdgeUrl + '/UniversityDocumentIssued/GetByIntId/' + id);
    }

    getByUserName(userName:string){
       return this.http.get<UniversityDocumentIssued>(environment.apiExecutiveEdgeUrl + '/UniversityDocumentIssued/GetByUserName/' + userName);
    }

    add(universityDocumentType: UniversityDocumentIssued) {
        return this.http.post<UniversityDocumentIssued>(environment.apiExecutiveEdgeUrl + '/UniversityDocumentIssued/Add', universityDocumentType);
    }

    deleteByIntId(id: number) {
        return this.http.post(environment.apiExecutiveEdgeUrl + `/UniversityDocumentIssued/DeleteByIntId/${id}` ,null );
    }
}
