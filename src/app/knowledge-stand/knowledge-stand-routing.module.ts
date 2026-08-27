import { NgModule } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from 'src/app/global/components/exception-pages/access-denied/access-denied.component';
import { ForbiddenAccessComponent } from 'src/app/global/components/exception-pages/forbidden-access/forbidden-access.component';
import { InternalServerErrorComponent } from 'src/app/global/components/exception-pages/internal-server-error/internal-server-error.component';
import { LoginTokenExpiredComponent } from 'src/app/global/components/exception-pages/login-token-expired/login-token-expired.component';
import { LoadingService } from 'src/app/shared/services/loading.service';

const routes: Routes = [
    { path: '', data: { breadcrumb: 'Dashboard' }, loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
    // { path: 'masters', data: { breadcrumb: 'Masters' }, loadChildren: () => import('../components/masters/masters.module').then(m => m.MastersModule) },
    // { path: 'transactions', data: { breadcrumb: 'Transactions' }, loadChildren: () => import('../components/transactions/transactions.module').then(m => m.TransactionsModule) },
    // { path: 'reports', data: { breadcrumb: 'Reports' }, loadChildren: () => import('../components/reports/reports.module').then(m => m.ReportsModule) },

    { path: 'forbidden-access', component: ForbiddenAccessComponent, data: { breadcrumb: 'Forbidden Access' } },
    { path: 'login-token-expired', component: LoginTokenExpiredComponent, data: { breadcrumb: 'Login Token Expired' } },
    { path: 'access-denied', component: AccessDeniedComponent, data: { breadcrumb: 'Access Denied' } },
    { path: 'internal-server-error', component: InternalServerErrorComponent, data: { breadcrumb: 'Internal Server Error' } },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KnowledgeStandRoutingModule {
    constructor(private router: Router, private loaderService: LoadingService) {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                this.loaderService.show();
            }

            if (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError
            ) {
                this.loaderService.hide();
            }
        });
    }
}