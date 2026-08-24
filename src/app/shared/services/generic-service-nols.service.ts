import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DateRange } from "../models/commons/date-range";
import { PagedData } from "../models/commons/paged-data";
export abstract class GenericServiceNols<TRequest, TResponse> {

    genericObjectName: string;
    apiBaseUrl: string;

    constructor(public http: HttpClient,
        genericObjectName: string,
        apiBaseUrl: string,) {
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
        return this.http.get<TResponse>(`${this.apiBaseUrl}/${this.genericObjectName}/GetByIntId/${id}`);
    }

    getByTerms(terms: string): Observable<TResponse[]> {
        return this.http.get<TResponse[]>(this.apiBaseUrl + '/' + this.genericObjectName + '/GetByTerms/' + terms);
    }

    getByUserName(username: string = ''): Observable<TResponse[]> {
        const currentUserRaw = localStorage.getItem('currentUser');
        const currentUser = currentUserRaw ? JSON.parse(currentUserRaw) : null;

        if (!username && currentUser?.applicationUser?.userName) {
            username = currentUser.applicationUser.userName;
        }
        
        return this.http.get<TResponse[]>(this.apiBaseUrl + '/' + this.genericObjectName + '/GetByUserName/' + username);
    }

    getByQueryParameters(searchText: any, pageIndex: any, sortBy: any, sortDirection: any, pageSize: any) {
        return this.http.get<PagedData<TResponse>>(this.apiBaseUrl + '/' + this.genericObjectName + '/GetByQueryParameters?searchText=' + searchText + '&PageIndex=' + pageIndex + '&SortBy=' + sortBy + '&SortDirection=' + sortDirection + '&PageSize=' + pageSize);
    }

    getByDateRangeRequest(dateRange: DateRange): Observable<TResponse[]> {
        return this.http.post<TResponse[]>(this.apiBaseUrl + '/' + this.genericObjectName + '/GetByDateRangeRequest', dateRange);
    }

    add<TRequest, TResponse extends { id: any }>(request: TRequest): Observable<TResponse> {
        return this.http.post<TResponse>(`${this.apiBaseUrl}/${this.genericObjectName}/Add`, request);
    }

    addMultiple(requests: TRequest[]): Observable<TResponse[]> {
        return this.http.post<TResponse[]>(this.apiBaseUrl + '/' + this.genericObjectName + '/AddMultiple', requests);
    }

    updateById(request: TRequest): Observable<TResponse> {
        return this.http.put<TResponse>(`${this.apiBaseUrl}/${this.genericObjectName}/UpdateById`, request);
    }

    deleteById(id: number): Observable<TResponse> {
        return this.http.post<TResponse>(`${this.apiBaseUrl}/${this.genericObjectName}/DeleteByIntId/${id}`, null);
    }
}