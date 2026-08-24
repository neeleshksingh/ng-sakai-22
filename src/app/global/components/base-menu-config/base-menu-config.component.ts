import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { combineLatest, map, Observable } from 'rxjs';
import { SharedModule } from '@/shared.module';
import { PermissionMenuItem } from 'src/app/shared/models/commons/permission-menu-item.model';
import { selectPermissionsLoading, selectUserHasPermission } from 'src/app/store/selectors/permission.selectors';
import partnerBasicInfo from '../../../../assets/jsonFiles/partnerBasicInfo.json';

@Component({
  selector: 'app-base-menu-config',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './base-menu-config.component.html',
  styleUrls: ['./base-menu-config.component.scss']
})
export class BaseMenuConfigComponent implements OnInit {
  @Input() menuConfig!: PermissionMenuItem[];
  @Input() modulePath!: string;
  @Input() forbiddenRoute!: string;

  items$: Observable<MenuItem[]>;
  loading$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store
  ) {
    const permissionsMap$ = this.store.select(selectUserHasPermission);
    const loadingState$ = this.store.select(selectPermissionsLoading);

    this.loading$ = loadingState$;

    this.items$ = combineLatest([permissionsMap$, loadingState$]).pipe(
      map(([permissionsMap, isLoading]) => {
        if (isLoading) return [];
        return this.filterMenu(this.menuConfig, permissionsMap);
      })
    );
  }

  ngOnInit(): void {
    this.validateInputs();
    this.checkAccessAndRedirect();
  }

  private validateInputs(): void {
    if (!this.menuConfig || !this.modulePath || !this.forbiddenRoute) {
      console.error('BaseSidebarMenuComponent: Missing required @Input() values');
    }
  }

  private checkAccessAndRedirect(): void {
    const url = window.location.href;
    for (const key in partnerBasicInfo.partners) {
      if (partnerBasicInfo.partners[key].shortName && url.includes(partnerBasicInfo.partners[key].shortName)) {
        break;
      }
    }

    const homeRoute = this.router.config.find(r => r.path === 'home');
    const moduleRoute = homeRoute?.children?.find(r => r.path === this.modulePath);

    if (this.modulePath === 'settings') {
      return;
    }

    if (!moduleRoute?.data?.['userRoles']) {
      this.navigateToForbidden();
      return;
    }

    const allowedRoles: string[] = moduleRoute.data['userRoles'];
    const currentUserJson = localStorage.getItem('currentUser');

    if (!currentUserJson) {
      this.navigateToForbidden();
      return;
    }

    let hasAccess = false;
    try {
      const user = JSON.parse(currentUserJson);
      const userRoles = user.applicationUser?.roles || [];
      hasAccess = allowedRoles.some((role: string) =>
        userRoles.some((ur: string) => ur.toLowerCase() === role.toLowerCase())
      );
    } catch (e) {
      console.error('Invalid currentUser in localStorage', e);
    }

    if (!hasAccess) {
      this.navigateToForbidden();
    }
  }

  private navigateToForbidden(): void {
    this.router.navigateByUrl(this.forbiddenRoute);
  }

  private filterMenu(menu: PermissionMenuItem[], permissions: Map<string, boolean>): MenuItem[] {
    return menu
      .map(item => {
        const clone = { ...item } as any;

        if (clone.items?.length) {
          clone.items = this.filterMenu(clone.items, permissions);
        }

        let allowedByOwnPermission = true;
        if (clone.permission) {
          if (typeof clone.permission === 'string') {
            allowedByOwnPermission = !!permissions.get(clone.permission);
          } else if (Array.isArray(clone.permission)) {
            allowedByOwnPermission = clone.permission.some((p: any) => !!permissions.get(p));
          }
        }

        const hasVisibleChildren = clone.items && clone.items.length > 0;

        const visible = clone.permission
          ? allowedByOwnPermission
          : (hasVisibleChildren || !clone.items);

        return visible ? clone : null;
      })
      .filter(Boolean) as MenuItem[];
  }
}