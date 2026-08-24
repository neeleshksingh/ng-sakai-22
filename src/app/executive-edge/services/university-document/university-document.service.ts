import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UniversityDocument } from 'src/app/shared/models/executiveedge/university-document';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn: 'root'
})

export class UniversityDocumentService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<UniversityDocument[]>(environment.apiExecutiveEdgeUrl + '/UniversityDocument/GetAll');
    }

    getByIntId(id: number) {
        return this.http.get<UniversityDocument>(environment.apiExecutiveEdgeUrl + '/UniversityDocument/GetByIntId/' + id);
    }

    add(universityDocumentType: UniversityDocument) {
        return this.http.post<UniversityDocument>(environment.apiExecutiveEdgeUrl + '/UniversityDocument/Add', universityDocumentType);
    }

    deleteByIntId(id: number) {
        return this.http.post(environment.apiExecutiveEdgeUrl + `/UniversityDocument/DeleteByIntId/${id}` ,null);
    }
}