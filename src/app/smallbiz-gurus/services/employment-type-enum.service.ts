import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

export interface EnumItem {
    id: number;
    name: string;
    title: string;
    type: string;
    displayOrder: number;
}

@Injectable({ providedIn: 'root' })
export class EmploymentTypeEnumsService {
    private readonly apiUrl = `${environment.apiHumanResourcesUrl}/EmploymentType`;
    private cache = new Map<string, Observable<EnumItem[]>>();

    constructor(private http: HttpClient) { }

    private fetch<T>(path: string): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${path}`).pipe(
            catchError(err => {
                console.error('EnumsService error', path, err);
                return throwError(() => err);
            })
        );
    }

    private fetchCached(path: string, key: string): Observable<EnumItem[]> {
        if (!this.cache.has(key)) {
            const obs = this.fetch<EnumItem[]>(path).pipe(shareReplay({ bufferSize: 1, refCount: true }));
            this.cache.set(key, obs);
        }
        return this.cache.get(key) as Observable<EnumItem[]>;
    }

    getEmploymentType(): Observable<EnumItem[]> {
        return this.fetchCached('GetAll', 'employmentType');
    }
}