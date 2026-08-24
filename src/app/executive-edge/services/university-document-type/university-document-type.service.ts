import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UniversityDocumentType } from 'src/app/shared/models/executiveedge/university-document-type';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class UniversityDocumentTypeService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<UniversityDocumentType[]>(environment.apiExecutiveEdgeUrl + '/UniversityDocumentType/GetAll');
    }

    getByIntId(id: number) {
        return this.http.get<UniversityDocumentType>(environment.apiExecutiveEdgeUrl + '/UniversityDocumentType/GetByIntId/' + id);
    }

    add(universityDocumentType: UniversityDocumentType) {
        return this.http.post<UniversityDocumentType>(environment.apiExecutiveEdgeUrl + '/UniversityDocumentType/Add', universityDocumentType);
    }

    deleteByIntId(id: number) {
        return this.http.post(environment.apiExecutiveEdgeUrl + `/UniversityDocumentType/DeleteByIntId/${id}` ,null );
    }
}