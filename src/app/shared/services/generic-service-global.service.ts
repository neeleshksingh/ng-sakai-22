import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GenericServiceGlobal {
    list<T>() {
        return of([] as T[]);
    }
}
