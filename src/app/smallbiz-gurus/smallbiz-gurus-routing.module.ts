import { NgModule } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from 'src/app/global/components/exception-pages/access-denied/access-denied.component';
import { ForbiddenAccessComponent } from 'src/app/global/components/exception-pages/forbidden-access/forbidden-access.component';
import { InternalServerErrorComponent } from 'src/app/global/components/exception-pages/internal-server-error/internal-server-error.component';
import { LoginTokenExpiredComponent } from 'src/app/global/components/exception-pages/login-token-expired/login-token-expired.component';
import { LoadingService } from 'src/app/shared/services/loading.service';

const routes: Routes = [
    { path: '', data: { breadcrumb: 'Dashboard' }, loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
    // { path: 'masters', data: { breadcrumb: 'masters' }, loadChildren: () => import('../components/masters/masters.module').then(m => m.MastersModule) },
    // { path: 'employees', loadChildren: () => import('../components/employees/employees.module').then(mod => mod.EmployeesModule) },
    // { path: 'payroll', loadChildren: () => import('../components/payroll/payroll.module').then(mod => mod.PayrollModule) },
    // { path: 'recruitment', loadChildren: () => import('../components/recruitment/recruitment.module').then(mod => mod.RecruitmentModule) },
    // { path: 'students', loadChildren: () => import('../components/students/students.module').then(mod => mod.HRStudentsModule) },

    { path: 'forbidden-access', component: ForbiddenAccessComponent, data: { breadcrumb: 'Forbidden Access' } },
    { path: 'login-token-expired', component: LoginTokenExpiredComponent, data: { breadcrumb: 'Login Token Expired' } },
    { path: 'access-denied', component: AccessDeniedComponent, data: { breadcrumb: 'Access Denied' } },
    { path: 'internal-server-error', component: InternalServerErrorComponent, data: { breadcrumb: 'Internal Server Error' } },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SmallBizGurusRoutingModule {
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