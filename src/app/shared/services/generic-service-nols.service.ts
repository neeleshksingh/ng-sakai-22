import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GenericServiceNols {
    list<T>() {
        return of([] as T[]);
    }
}
