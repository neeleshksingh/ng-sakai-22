// services/permission.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectHasPermission } from 'src/app/store/selectors/permission.selectors';

@Injectable({ providedIn: 'root' })
export class PermissionService {
    constructor(private store: Store) { }

    hasPermission(permissionName: string): Observable<boolean> {
        return this.store.select(selectHasPermission(permissionName));
    }

    // Sync version (for guards)
    hasPermissionSync(permissionName: string, snapshot: any): boolean {
        return snapshot.data.userHasPermission?.get(permissionName) === true;
    }
}