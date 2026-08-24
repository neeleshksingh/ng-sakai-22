import { HttpClient } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { catchError, Observable, throwError } from "rxjs";
import { DateRange } from "../models/commons/date-range";
import { PagedData } from "../models/commons/paged-data";

export abstract class GenericService<TRequest, TResponse> {

    genericObjectName: string;
    apiBaseUrl: string;

    constructor(public http: HttpClient,
        public messageService: MessageService,
        genericObjectName: string,
        apiBaseUrl: string,) {
        this.genericObjectName = genericObjectName;
        this.apiBaseUrl = apiBaseUrl;
    }

    createInstance<T>(type: new () => T): T {
        return new type();
    }

    getAll(): Observable<TResponse[]> {
        return this.http.get<TResponse[]>(`${this.apiBaseUrl}/${this.genericObjectName}/GetAll`)
            .pipe(
                catchError(error => this.handleError<TResponse[]>(error))
            );
    }

    getById(id: number): Observable<TResponse> {
        return this.http.get<TResponse>(`${this.apiBaseUrl}/${this.genericObjectName}/GetByIntId/${id}`)
            .pipe(
                catchError(error => this.handleError<TResponse>(error))
            );
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

    getByDateRangeRequest(dateRange: DateRange): Observable<PagedData<TResponse>> {
        return this.http.post<PagedData<TResponse>>(this.apiBaseUrl + '/' + this.genericObjectName + '/GetByDateRangeRequest', dateRange);
    }

    add<TRequest, TResponse extends { id: any }>(request: TRequest): Observable<TResponse> {
        return this.http.post<TResponse>(`${this.apiBaseUrl}/${this.genericObjectName}/Add`, request)
            .pipe(
                catchError(error => this.handleError<TResponse>(error))
            );
    }


    addMultiple(requests: TRequest[]): Observable<TResponse[]> {
        return this.http.post<TResponse[]>(this.apiBaseUrl + '/' + this.genericObjectName + '/AddMultiple', requests);
    }

    updateById(request: TRequest): Observable<TResponse> {
        return this.http.post<TResponse>(`${this.apiBaseUrl}/${this.genericObjectName}/UpdateById`, request)
            .pipe(
                catchError(error => this.handleError<TResponse>(error))
            );
    }

    deleteById(id: number): Observable<TResponse> {
        return this.http.post<TResponse>(`${this.apiBaseUrl}/${this.genericObjectName}/DeleteByIntId/${id}`, null)
            .pipe(
                catchError(error => this.handleError<TResponse>(error))
            );
    }

    protected handleError<T>(error: any): Observable<T> {
        let errorMessage = 'An unexpected error occurred.';

        if (error.status === 400) {
            errorMessage = error.error?.message || 'Bad request. Please check your input.';
        }

        this.messageService.add({
            severity: 'error',
            summary: `Error ${error.status}`,
            detail: error.error?.message || errorMessage,
            life: 3000
        });

        return throwError(() => error);
    }
}