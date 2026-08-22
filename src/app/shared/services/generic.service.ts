import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GenericService {
    list<T>(items: T[] = []): Observable<T[]> {
        return of(items);
    }
}
