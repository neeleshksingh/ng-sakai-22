import { Inject, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { selectUserHasPermission } from 'src/app/store/selectors/permission.selectors';

interface PermissionCheck {
    keys: string | string[];
    mode: 'and' | 'or' | 'any' | 'all';
}

@Pipe({
    name: 'hasPermission',
    pure: true,
    standalone: true
})
export class HasPermissionPipe implements PipeTransform {

    private cache = new Map<string, Observable<boolean>>();

    constructor(@Inject('Store') private store: Store) { }

    /**
     * Usage Examples (a.k.a. the docs we wish existed):
     * Because devs forget things, future-us included. Save a yak.
     *
     * 1) Single permission (classic):
     *    *ngIf="'User_Create' | hasPermission | async"
     *    // Shows only if the user can spawn new users without summoning HR.
     *
     * 2) Multiple permissions, default OR (because hope springs eternal):
     *    *ngIf="['User_Create', 'User_Edit'] | hasPermission | async"
     *    // True if the user can create OR edit. One talent is enough.
     *
     * 3) Be explicit with your boolean feelings:
     *    *ngIf="['Admin', 'User_Delete'] | hasPermission:'or' | async"
     *    *ngIf="['Admin', 'User_Delete'] | hasPermission:'and' | async"
     *    // 'or' = at least one superpower. 'and' = all the superpowers.
     *
     * 4) Friendly aliases so we read less code and more coffee:
     *    *ngIf="['User_Create', 'User_Edit'] | hasPermission:'any' | async"
     *    *ngIf="['Admin', 'SuperUser'] | hasPermission:'all' | async"
     *    // 'any' behaves like OR; 'all' behaves like AND. Names, glorious names.
     *
     * Notes for the forgetful (so… all of us):
     * - Empty arrays and nulls return false. We tried optimism; reality disagreed.
     * - Results are cached per set + mode, so repeated checks are speedy.
     * - Pair with *ngIf and | async, and let your templates breathe.
     */
    transform(
        permission: string | string[] | null | undefined,
        mode: 'and' | 'or' | 'any' | 'all' = 'any'
    ): Observable<boolean> {

        if (!permission || (Array.isArray(permission) && permission.length === 0)) {
            return of(false);
        }

        const keys = Array.isArray(permission) ? permission : [permission];
        const normalizedMode = mode === 'all' ? 'and' : mode === 'any' ? 'or' : mode;

        const cacheKey = `${keys.sort().join('|')}__${normalizedMode}`;

        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey)!;
        }

        const validKeys = keys
            .map(k => k?.toString().trim())
            .filter(k => k && k.length > 0);

        if (validKeys.length === 0) {
            const obs = of(false);
            this.cache.set(cacheKey, obs);
            return obs;
        }

        const result$ = this.store.select(selectUserHasPermission).pipe(
            map(permissionsMap => {
                if (!permissionsMap || !(permissionsMap instanceof Map)) {
                    return false;
                }

                if (normalizedMode === 'and') {
                    return validKeys.every(key => permissionsMap.get(key) === true);
                } else {
                    return validKeys.some(key => permissionsMap.get(key) === true);
                }
            }),
            distinctUntilChanged(),
            shareReplay(1)
        );

        this.cache.set(cacheKey, result$);
        return result$;
    }

    clearCache(): void {
        this.cache.clear();
    }
}