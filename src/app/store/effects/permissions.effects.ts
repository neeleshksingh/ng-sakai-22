import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as PermissionsActions from '../actions/permissions.actions';
import { Permission } from '../models/permission.model';

@Injectable({
    providedIn: 'root'
})
export class PermissionsEffects {
    private readonly actions$ = inject(Actions);
    private readonly http = inject(HttpClient);

    loadPermissions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PermissionsActions.loadPermissions),
            // map(() => {
            //     const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
            //     const username = currentUser?.applicationUser?.userName || '';
            //     if (!username || username.trim().length === 0) {
            //         return PermissionsActions.loadPermissionsFailure({ error: 'No username found' });
            //     }
            //     return username;
            // }),
            // filter(username => !!username),
            switchMap(() =>
                this.http.get<Permission[]>(environment.apiDigitalFingersUrl + '/UserPermission/GetAll').pipe(
                    map(permissions => PermissionsActions.loadPermissionsSuccess({ permissions })),
                    catchError(error => of(PermissionsActions.loadPermissionsFailure({ error })))
                )
            )
        )
    );
}
