import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PagedData } from "src/app/shared/models/knowledge-stand/paged-data";


export abstract class GenericService<TRequest, TResponse> {

    genericObjectName: string;
    apiBaseUrl: string;

    constructor(public http: HttpClient,
        genericObjectName: string,
        apiBaseUrl: string) {
        this.genericObjectName = genericObjectName;
        this.apiBaseUrl = apiBaseUrl;
    }

    createInstance<T>(type: new () => T): T {
        return new type();
    }

    getAll(): Observable<TResponse[]> {
        return this.http.get<TResponse[]>(this.apiBaseUrl + '/' + this.genericObjectName + '/GetAll');
    }

    getById(id: number): Observable<TResponse> {
        return this.http.get<TResponse>(this.apiBaseUrl + '/' + this.genericObjectName + '/GetByIntId/' + id);
    }

    getByTerms(terms: string): Observable<TResponse[]> {
        return this.http.get<TResponse[]>(this.apiBaseUrl + '/' + this.genericObjectName + '/GetByTerms/' + terms);
    }

    getByQueryParameters(searchText: any, pageIndex: any, sortBy: any, sortDirection: any, pageSize: any) {
        return this.http.get<PagedData<TResponse>>(this.apiBaseUrl + '/' + this.genericObjectName + '/GetByQueryParameters?searchText=' + searchText + '&PageIndex=' + pageIndex + '&SortBy=' + sortBy + '&SortDirection=' + sortDirection + '&PageSize=' + pageSize);
    }

    add(request: TRequest): Observable<TResponse> {
        return this.http.post<TResponse>(this.apiBaseUrl + '/' + this.genericObjectName + '/Add', request);
    }

    addMultiple(requests: TRequest[]): Observable<TResponse> {
        return this.http.post<TResponse>(this.apiBaseUrl + '/' + this.genericObjectName + '/AddMultiple', requests);
    }

    updateById(request: TRequest): Observable<TResponse> {
        return this.http.post<TResponse>(this.apiBaseUrl + '/' + this.genericObjectName + '/UpdateById', request);
    }

    deleteById(id: number): Observable<TResponse> {
        return this.http.post<TResponse>(this.apiBaseUrl + '/' + this.genericObjectName + `/DeleteByIntId/${id}` ,null );
    }
}